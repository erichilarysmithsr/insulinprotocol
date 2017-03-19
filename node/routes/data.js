var express = require('express');
var router = express.Router();
var datastore = require('@google-cloud/datastore')();
var debug = require('debug')('nodeserver'),log=require('debug')('default');
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL);
var url=require('url');
var date = require('date-and-time');
var bodyParser = require('body-parser');

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
        db.one("SELECT id,name,email,role FROM users WHERE email=$1",[email]).then(success,fail);
    }); 
};

router.post('/getUserProfile',parseText,function(req,res){
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
            else db.one("INSERT INTO users (name,email,info) VALUES ($1,$2,$3) RETURNING id,name,email",[payload.name,payload.email,{picture:payload.picture,sub:payload.sub}]).then(success,fail);
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
    .then(patient => db.one(patient.id?"UPDATE patients SET name=${name},uhid=${uhid},dob=${dob},bednum=${bednum},profile=${profile},savedBy=${savedBy} WHERE id=${id} RETURNING *":"INSERT INTO patients(name,uhid,dob,bednum,profile,savedBy) VALUES (${name},${uhid},${dob},${bednum},${profile},${savedBy}) RETURNING *",patient))
    .then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/getProfile',authCheck,parseText,function(req,res){
    var id=req.body;
    db.one("SELECT * FROM patients WHERE id=$1",[id])
    .then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/saveForm',authCheck,parseJSON,function(req,res){
    var form=req.body;form.dt=new Date();form.savedBy=req.appUser;
    db.one("INSERT INTO forms(type,dt,savedBy,patientId,data) VALUES (${type},${dt},${savedBy},${patientId},${data}) RETURNING id",form)
    .then(rs => { form.id = rs.id;
        var recommedation;
        if(form.type=='subcutaneous'||form.type=='infusion')
           Promise.all([db.one("SELECT * FROM patients WHERE id=$1",[form.patientId]),db.any("SELECT * FROM forms WHERE patientId=$1 ORDER by id DESC",[form.patientId])])
       .then(rs => protocolManager.recommend(rs[0],rs[1]))
       .then(rs => {rs.parentId = form.id; recommedation = rs; let f = {type : form.type+'Recommedation',savedBy : form.savedBy, patientId : form.patientId, data :rs, dt: new Date() };return db.one("INSERT INTO forms(type,dt,savedBy,patientId,data) VALUES (${type},${dt},${savedBy},${patientId},${data}) RETURNING id",f);})
       .then(rs => { recommedation.id = rs.id; recommedation.parentId = form.id; res.json(recommedation); },e => {log(e);res.end('fail');});
       else res.send('success');
   }).catch(e => {log(e);res.end('fail');});
});

router.post('/getForms',authCheck,parseText,function(req,res){
    var id=req.body;
    db.any("SELECT * FROM forms WHERE patientId=$1 ORDER by id",[id])
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
   Promise.all([db.one("SELECT * FROM patients WHERE id=$1",[req.params.patientId]),db.any("SELECT * FROM forms WHERE patientId=$1 ORDER by id DESC",[req.params.patientId])])
   .then(rs => protocolManager.recommend(rs[0],rs[1])).then((rs)=>res.json(rs));    
});

function ProtocolManager(){
    this.protocols={infusion:{
        id:2,
        data:{chart:[{"min":0,"max":80,"col1":0,"col2":0,"col3":0,"col4":0,"col5":0,"col6":0,"col7":0,"col8":0,"col9":0},
        {"min":80,"max":100,"col1":4,"col2":0,"col3":0,"col4":0.2,"col5":0.3,"col6":0.4,"col7":0.5,"col8":0.8,"col9":1},
        {"min":100,"max":120,"col1":0,"col2":0,"col3":0.1,"col4":0.4,"col5":0.6,"col6":0.8,"col7":1,"col8":1.8,"col9":2},
        {"min":120,"max":140,"col1":0,"col2":0,"col3":0.3,"col4":0.7,"col5":1,"col6":1.4,"col7":2,"col8":2.5,"col9":3},
        {"min":140,"max":160,"col1":0,"col2":0.2,"col3":0.5,"col4":1,"col5":1.5,"col6":2,"col7":2.5,"col8":3,"col9":4},
        {"min":160,"max":180,"col1":0,"col2":0.5,"col3":0.8,"col4":1.4,"col5":2,"col6":2.6,"col7":3,"col8":4,"col9":5},
        {"min":180,"max":200,"col1":0.2,"col2":0.8,"col3":1,"col4":1.8,"col5":2.5,"col6":3.4,"col7":4,"col8":5,"col9":6},
        {"min":200,"max":220,"col1":0.5,"col2":1,"col3":1.5,"col4":2.2,"col5":3,"col6":4,"col7":5,"col8":6,"col9":7.5},
        {"min":220,"max":240,"col1":0.8,"col2":1.5,"col3":2,"col4":2.7,"col5":4,"col6":5,"col7":6,"col8":7,"col9":9},
        {"min":240,"max":260,"col1":1,"col2":2,"col3":2.5,"col4":3.3,"col5":4.5,"col6":6,"col7":7,"col8":8.5,"col9":10},
        {"min":260,"max":280,"col1":1.2,"col2":2.5,"col3":3,"col4":3.9,"col5":5.5,"col6":7,"col7":8,"col8":10,"col9":12},
        {"min":280,"max":300,"col1":1.5,"col2":3,"col3":3.5,"col4":4.6,"col5":6,"col6":8,"col7":9,"col8":11,"col9":13},
        {"min":300,"max":320,"col1":2,"col2":3.5,"col3":4,"col4":5.3,"col5":7,"col6":9,"col7":10.5,"col8":12.5,"col9":14.5},
        {"min":320,"max":340,"col1":2.5,"col2":4,"col3":5,"col4":6,"col5":8,"col6":10,"col7":12,"col8":14,"col9":16},
        {"min":340,"max":360,"col1":3,"col2":5,"col3":6,"col4":7,"col5":9,"col6":11,"col7":14,"col8":16,"col9":18},
        {"min":360,"max":380,"col1":4,"col2":6,"col3":7,"col4":8,"col5":10,"col6":12.5,"col7":16,"col8":17,"col9":19}]}
    }};
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
            if(!chartRow)reject('dosageType:'+fp.dosageType+' not configured in the protocol chart.');
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
            if(!profile.subcutaneousColumn)reject('Subcutaneous Column not defined for patientId:'+patient.id);
            dose=chartRow[profile.subcutaneousColumn];
            if(dose === undefined){
                reject('dosageType:'+fp.dosageType+', column: '+profile.subcutaneousColumn+' not configured in protocol chart');
            }else resolve({dosageType:fp.dosageType,dose:round(dose,0),insulinType:chartRow.ins,text:'Using dosage chart due to insufficient past data<br>Current Dosage Column: '+profile.subcutaneousColumn});
        });
     }else if(patient.insulinDeliveryType=='infusion'){
        reject('Protocol for insulin infusion is not yet developed');
    }else{
        resolve({text:'This patient is not currently on insulin.<br>Please edit the patient profile to initiate insulin therapy.',error:2});
    }
});
};
ProtocolManager.prototype.process=function(patient,form){//form is optional
    return new Promise(function(resolve,reject){
        var profile = patient.profile;
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
        if(!profile.infusionColumn)profile.infusionColumn = 'col4';   
        resolve(patient);
    });
};

function FormProcessor(insulinDeliveryType,forms){
    this.insulinDeliveryType=insulinDeliveryType;
    this.order=['Before Breakfast','Before Lunch','Before Evening Snack','Before Dinner','Bedtime'];
    forms.sort((f1,f2) =>{return f1.id-f2.id;});
    var fh={};
    if(insulinDeliveryType=='subcutaneous'){
        for(var i=0;i<forms.length;i++){
            var f=forms[i],dt=date.format(new Date(f.dt),'DD MMM YYYY');
            if(!fh[f.type])fh[f.type]={};if(!fh[f.type][dt])fh[f.type][dt]={};fh[f.type][dt][f.data.dosageType]=f.data;
            if(f.type=='subcutaneous'){this.isValid=true;if(f.data.dosageType)this.dosageType=f.data.dosageType;}
        }
        this.nextDosageType=this.order[this.order.findIndex(r=>r==this.dosageType)+1];
    }else if(insulinDeliveryType=='infusion'){

    }
    this.fh=fh;
}
//param:bg,insulin day:today,yest meal:'same','next',(any specific key)
FormProcessor.prototype.getValue=function(param,day,dosageType){
    var fh=this.fh;
    var type=param=='bg'?this.insulinDeliveryType:param=='insulin'?(this.insulinDeliveryType+'Dose'):null;
    var field=param=='bg'?'plasmaGlucose':param=='insulin'?'insulinDose':null;
    var dt=day=='today'?date.format(new Date(),'DD MMM YYYY'):day=='yest'?date.format(date.addDays(new Date(),-1),'DD MMM YYYY'):null;
    var dose=dosageType=='same'?this.dosageType:dosageType=='next'?this.nextDosageType:dosageType;
    if(!fh)throw 'Form Hash is not defined';if(!type||!field)throw 'Invalid Param: '+param;if(!type)throw 'Invalid Day: '+day;
    if(!this.isValid)throw 'FormProcessor should be checked for isValid before calling getValue';
    return fh[type]&&fh[type][dt]&&fh[type][dt][dose]?fh[type][dt][dose][field]*1:undefined;
};

module.exports = router;

var round = function(number, precision) {
    var factor = Math.pow(10, precision);
    var tempNumber = number * factor;
    var roundedTempNumber = Math.round(tempNumber);
    return roundedTempNumber / factor;
};
