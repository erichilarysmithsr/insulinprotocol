var express = require('express');
var router = express.Router();
var debug = require('debug')('nodeserver'),log=require('debug')('default');
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL);
var url=require('url');
var date = require('date-and-time');
var bodyParser = require('body-parser');
var appSettings = require('../../src/app/app-settings.js').AppSettings;
var protocolManager=new ProtocolManager();
var util = require('util');

var parseText = bodyParser.text();
var parseJSON = bodyParser.json();

var GoogleAuth = require('google-auth-library');
var auth = new GoogleAuth();
var OAuth2Client = new auth.OAuth2(process.env.OAUTH_CLIENT_ID, '', '');

var authCheck=function(req,res,next){
    var fail = function(e){
        log(e);res.send('authFail');
    },success=function(user){
        req.appUser=user;
        next();
    };
    if(!req.cookies||!req.cookies.id_token)return fail();
    var token = req.cookies.id_token;
    OAuth2Client.verifyIdToken(token,process.env.OAUTH_CLIENT_ID,
        function(e,login){if(e){log(e);return fail();}
        var payload = login.getPayload();
        var email = payload.email;
        db.one("SELECT id,name,email,role FROM users WHERE email=$1",[email]).then((user)=>{
            if(!user.role)fail();
            else success(user);
        },fail);
    }); 
};

router.get('/getUserProfile',parseText,function(req,res){
    var name = req.body;
    var fail = function(e){
        log(e);var err = new Error('authCheck failed');err.status = 401;
        res.send('fail');
    },success=function(user){
        res.json(user);
    };
    if(!req.cookies||!req.cookies.id_token)return fail();
    var token = req.cookies.id_token;
    OAuth2Client.verifyIdToken(token,process.env.OAUTH_CLIENT_ID,
        function(e,login){if(e){log(e);return fail();}
        var payload = login.getPayload();
        db.oneOrNone("SELECT id,name,email,role FROM users WHERE email=$1",[payload.email]).then(rs=>{
            if(rs)success(rs);
            else db.one("INSERT INTO users (name,email,info) VALUES ($1,$2,$3) RETURNING id,name,email,role",[payload.name,payload.email,{picture:payload.picture,sub:payload.sub}]).then(success,fail);
        },fail);
    });    
});

router.post('/getPatients',authCheck,parseText,function(req,res) {
    let uhid=req.body;
    if(typeof uhid==='string'&&uhid){
        db.any("SELECT * FROM patients WHERE uhid=$1 OR regexp_replace(uhid,'MM0*','')=$1",[uhid]).then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
    }else db.any("SELECT * FROM patients ORDER by modifieddt DESC LIMIT 10").then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/savePatient',authCheck,parseJSON,function(req,res) {
	var patient=req.body;patient.savedBy=req.appUser;if(!patient)return res.send('fail');
    protocolManager.process(patient)
    .then(patient => db.one(patient.id?"UPDATE patients SET name=${name},uhid=${uhid},bednum=${bednum},profile=${profile},savedBy=${savedBy} WHERE id=${id} RETURNING *":"INSERT INTO patients(name,uhid,bednum,profile,savedBy) VALUES (${name},${uhid},${bednum},${profile},${savedBy}) RETURNING *",patient))
    .then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/getProfile',authCheck,parseText,function(req,res){
    var id=req.body;
    db.one("SELECT * FROM patients WHERE id=$1",[id])
    .then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/saveForm',authCheck,parseJSON,function(req,res){
    var form=req.body,patient;form.dt=new Date();form.savedBy=req.appUser;
    db.one("INSERT INTO forms(type,dt,savedBy,patientId,data) VALUES (${type},${dt},${savedBy},${patientId},${data}) RETURNING id",form)
    .then(rs =>{ form.id=rs.id;return db.one("SELECT * FROM patients WHERE id=$1",[form.patientId]);})
    .then(rs => protocolManager.process(rs,form))
    .then(rs =>{ patient=rs;return db.none("UPDATE patients SET profile=${profile} WHERE id=${id}",patient);})
    .then(rs => {
        var recommedation;
        if(form.type=='subcutaneous'||form.type=='infusion')
            db.any("SELECT * FROM forms WHERE patientId=$1",[form.patientId])
        .then(rs => protocolManager.recommend(patient,rs))
        .then(rs => { recommedation = rs; recommedation.parentId = form.id; let f = {type : form.type+'Recommedation',savedBy : form.savedBy, patientId : form.patientId, data :recommedation, dt: new Date() };return db.one("INSERT INTO forms(type,dt,savedBy,patientId,data) VALUES (${type},${dt},${savedBy},${patientId},${data}) RETURNING id",f);})
        .then(rs => {recommedation.id = rs.id;res.json(recommedation);},e => {log(e);res.end('fail');});
        else res.send('success');
    }).catch(e => {log(e);res.end('fail');});
});

router.post('/getForms',authCheck,parseText,function(req,res){
    var id=req.body;
    db.any("SELECT * FROM forms WHERE patientId=$1",[id])
    .then(forms=>res.json(forms))
    .catch(e=>{log(e);res.send('fail');});
});

router.get('/getTransactions',authCheck,function(req,res){
    db.any("SELECT * FROM forms WHERE savedBy#>>'{id}'=$1",[req.appUser.id.toString()])
    .then(forms=>res.json(forms))
    .catch(e=>{log(e);res.send('fail');});
});

router.post('/getProtocol',parseText,function(req,res){
    var type=req.body;
    protocolManager.get(type).then(rs=>res.json(rs),e=>res.send('fail'));
});

router.post('/saveProtocol',authCheck,parseJSON,function(req,res){
    var protocol=req.body;protocol.savedBy=req.appUser;
    protocolManager.save(protocol).then(rs=>res.json(rs),e=>res.send('fail'));
});

router.post('/validateProtocol',parseJSON,function(req,res){
    // protocolManager.process({patientId:req.body.patient.id})
    // .then(protocolManager.recommend(req.body.patient,req.body.forms))
    // .then(rs=>res.json(rs),e=>log(e))
    // .catch(e=>{log(e);res.send('fail');});
    protocolManager.process(req.body.patient)
    .then((patient)=>protocolManager.recommend(patient,req.body.forms))
    .then(rs=>res.json(rs),e=>log(e));
});

router.get('/testProtocol/:patientId',function(req,res){
   Promise.all([db.one("SELECT * FROM patients WHERE id=$1",[req.params.patientId]),db.any("SELECT * FROM forms WHERE patientId=$1",[req.params.patientId])])
   .then(rs => protocolManager.recommend(rs[0],rs[1])).then((rs)=>res.json(rs));    
});

function ProtocolManager(){
    this.protocols={};
}
ProtocolManager.prototype.get=function(type){
    var s=this;
    return new Promise(function(resolve,reject){
        if(s.protocols[type])resolve(s.protocols[type]);
        else db.oneOrNone("SELECT * FROM protocols WHERE type=$1 ORDER BY id DESC LIMIT 1",[type]).then(rs=>{s.protocols[type]=rs;resolve(rs);},e=>{log(e);reject(e);});
    });
};
ProtocolManager.prototype.save=function(protocol){
    var s=this;
    return new Promise(function(resolve,reject){
        db.one("INSERT INTO protocols(type,data,savedBy) VALUES (${type},${data},${savedBy}) RETURNING *",protocol).then(rs=>{s.protocols[protocol.type]=rs;resolve(rs);},e=>{log(e);reject(e);});
    });
};
// FormProcessor.prototype.getValue=function(param,day,dosageType){//param:bg,insulin day:today,yest meal:'same','next',(any specific key)
ProtocolManager.prototype.recommend=function(patient,forms){
    return new Promise(function(resolve,reject){
        var profile=patient.profile||{},fp=new FormProcessor(profile.insulinDeliveryType,forms),dose;
        if(!fp.isValid)return resolve({text:'Please enter a glucose measurement to get recommendations',error:1});
        if(profile.insulinDeliveryType=='subcutaneous'){
            protocolManager.get('subcutaneous').then(protocol=>{
                var chart=protocol.data.chart,chartRow=chart.find(r=>r.t==fp.dosageType);
                if(!chartRow)return reject('dosageType:'+fp.dosageType+' not configured in the protocol chart.');
                if(fp.dosageType != '10:00 AM' && fp.getValue('insulin','yest','same')){
                    if(fp.dosageType=='Bedtime'){
                        if(fp.getValue('bg','today','Before Breakfast')){
                            dose = fp.getValue('insulin','yest','Bedtime')+(fp.getValue('bg','today','Before Breakfast') - 130) * fp.getValue('insulin','yest','Bedtime') / 200;
                            return resolve({dosageType:fp.dosageType,dose:round(dose,0),insulinType:chartRow.ins,text:'Yesterday\'s Bedtime Dose: '+fp.getValue('insulin','yest','Bedtime')+'<br>Fasting BG Today: '+fp.getValue('bg','today','Before Breakfast')});
                        }
                    }else{
                        if(fp.getValue('bg','yest','next')){
                            dose = fp.getValue('insulin','yest','same')+(fp.getValue('bg','yest','next') - fp.getValue('bg','yest','same')) / 500 * fp.getValue('insulin','yest','same') + (fp.getValue('bg','today','same') - 150) / 50;
                            return resolve({dosageType:fp.dosageType,dose:round(dose,0),insulinType:chartRow.ins,text:'Yesterday\'s Dose: '+fp.getValue('insulin','yest','same')+'<br>Pre-Meal BG Yesterday: '+fp.getValue('bg','yest','same')+'<br>Next BG Yesterday: '+fp.getValue('bg','yest','next')});
                        }
                    }
                }                                
                if(!profile.subcutaneousColumn)return reject('Subcutaneous Column not defined for patientId:'+patient.id);
                dose=chartRow[profile.subcutaneousColumn];
                if(dose === undefined){
                    return reject('dosageType:'+fp.dosageType+', column: '+profile.subcutaneousColumn+' not configured in protocol chart');
                }else resolve({dosageType:fp.dosageType,dose:round(dose,0),insulinType:chartRow.ins,text:'Using dosage chart due to insufficient past data<br>Current Dosage Column: '+profile.subcutaneousColumn});
            });
        }else if(profile.insulinDeliveryType === 'infusion'){
            if(!profile.infusionColumn)return reject('Infusion column is not defined for patientId:',patient.id);
            protocolManager.get('infusion').then(protocol=>{
                var chart=protocol.data.chart,chartRow=chart.find(r => r.min <= fp.getValue('bg','today','n') && r.max > fp.getValue('bg','today','n'));
                if(!chartRow||chartRow[profile.infusionColumn]===undefined)return reject('Could not find row/col for patientId',patient.id+','+fp.getValue('bg','today','n')+','+profile.infusionColumn);
                resolve({text:'Patient is currently on column : '+profile.infusionColumn,insulinType:'Infusion',dose:chartRow[profile.infusionColumn]});
            });
        }else{
            resolve({text:'This patient is not currently on insulin.<br>Please edit the patient profile to initiate insulin therapy.',error:2});
        }
    });
};
ProtocolManager.prototype.process=function(patient,form){//form is optional - if form is empty initialise else update state
    return new Promise(function(resolve,reject){
        var profile = patient.profile;
        if(!form){//initialization
            if(!profile.subcutaneousColumn){
                if(profile.weight<60){
                    if(profile.preTransplantDose<30){
                        profile.subcutaneousColumn='col2';
                    }else{
                        profile.subcutaneousColumn='col3';
                    }
                }else if(profile.weight<80){
                    if(profile.preTransplantDose<30){
                        profile.subcutaneousColumn='col3';
                    }else{
                        profile.subcutaneousColumn='col4';
                    }
                }else if(profile.weight<100){
                    if(profile.preTransplantDose<40){
                        profile.subcutaneousColumn='col4';
                    }else{
                        profile.subcutaneousColumn='col5';
                    }
                }else if(profile.weight){
                    if(profile.preTransplantDose<50){
                        profile.subcutaneousColumn='col6';
                    }else{
                        profile.subcutaneousColumn='col7';
                    }
                }else return reject('Patient weight is mandatory');
            }
            if(!profile.infusionColumn){
                if(profile.diabetes === 'Known Case'){
                    profile.infusionColumn = 'col8';     
                }else if(profile.diabetes === 'New Onset'){
                    profile.infusionColumn = 'col3';
                }
            }
            resolve(patient);
        }else{//state update
            if(form.type==='infusion'){
                var prevColumn,nextColumn;
                db.any("SELECT * FROM forms WHERE patientId=$1",[patient.id]).then(forms=>{
                    if(!profile.infusionColumn)return reject('Infusion column is not defined for patientId:',patient.id);
                    var fp=new FormProcessor(profile.insulinDeliveryType,forms);
                    if(fp.getValue('bg','today','n')>200&&fp.getValue('bg','today','n-1')>200){
                        prevColumn = profile.infusionColumn;
                        nextColumn =  appSettings.infusion[appSettings.infusion.findIndex(col=>col.k===profile.infusionColumn)+1];
                        if(nextColumn&&nextColumn.k.match(/col/)) profile.infusionColumn = nextColumn.k;
                    }else if(fp.getValue('bg','today','n')<100&&fp.getValue('bg','today','n-1')<100){
                        prevColumn = profile.infusionColumn;
                        nextColumn =  appSettings.infusion[appSettings.infusion.findIndex(col=>col.k===profile.infusionColumn)-1];
                        if(nextColumn&&nextColumn.k.match(/col/)) profile.infusionColumn = nextColumn.k;
                    }
                    resolve(patient);
                },e=>{log(e);reject();});                                
            }else resolve(patient);
        }        
    });
};

function FormProcessor(insulinDeliveryType,forms){
    this.insulinDeliveryType=insulinDeliveryType;
    this.order=['Before Breakfast','Before Lunch','Before Evening Snack','Before Dinner','Bedtime'];
    forms.sort((f1,f2) =>{return f1.id-f2.id;});
    var fh={};
    if(insulinDeliveryType==='subcutaneous'){
        for(var i=0;i<forms.length;i++){
            var f=forms[i],dt=date.format(new Date(f.dt),'DD MMM YYYY');
            if(!fh[f.type])fh[f.type]={};if(!fh[f.type][dt])fh[f.type][dt]={};fh[f.type][dt][f.data.dosageType]=f.data;
            if(f.type=='subcutaneous'){this.isValid=true;if(f.data.dosageType)this.dosageType=f.data.dosageType;}
        }
        this.nextDosageType=this.order[this.order.findIndex(r=>r==this.dosageType)+1];
    }else if(insulinDeliveryType==='infusion'){
        forms=forms.filter(f => f.type==='infusion').reverse();
        fh={'n':forms[0],'n-1':forms[1]};
        this.isValid=true;
    }
    this.fh=fh;
}
//param:bg,insulin day:today,yest meal:'same','next',(any specific key)
FormProcessor.prototype.getValue=function(param,day,dosageType){
    var fh=this.fh;
    if(this.insulinDeliveryType==='subcutaneous'){
        var type=param=='bg'?this.insulinDeliveryType:param=='insulin'?(this.insulinDeliveryType+'Dose'):null;
        var field=param=='bg'?'plasmaGlucose':param=='insulin'?'insulinDose':null;
        var dt=day=='today'?date.format(new Date(),'DD MMM YYYY'):day=='yest'?date.format(date.addDays(new Date(),-1),'DD MMM YYYY'):null;
        var dose=dosageType=='same'?this.dosageType:dosageType=='next'?this.nextDosageType:dosageType;
        if(!fh)throw 'Form Hash is not defined';if(!type||!field)throw 'Invalid Param: '+param;if(!type)throw 'Invalid Day: '+day;
        if(!this.isValid)throw 'FormProcessor should be checked for isValid before calling getValue';
        return fh[type]&&fh[type][dt]&&fh[type][dt][dose]?fh[type][dt][dose][field]*1:undefined;    
    }else if(this.insulinDeliveryType==='infusion'){
        return fh[dosageType]&&fh[dosageType].data?fh[dosageType].data.plasmaGlucose*1:undefined;
    }else return;    
};

module.exports = router;

var round = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};
