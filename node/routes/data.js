var express = require('express');
var router = express.Router();
var datastore = require('@google-cloud/datastore')();
var debug = require('debug')('nodeserver'),log=require('debug')('default');
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL);
var url=require('url');
var date = require('date-and-time');
var protocolManager=new ProtocolManager();
var util = require('util');

router.post('/getPatients', function(req,res) {
    let uhid=req.body;
    if(typeof uhid==='string'&&uhid){
        db.any("SELECT * FROM patients WHERE uhid=$1",[uhid]).then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
    }else db.any("SELECT * FROM patients ORDER by modifieddt DESC LIMIT 10").then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/savePatient', function(req,res) {
	var p=req.body;if(!p)return res.send('fail');
    if(p.id)db.none("UPDATE patients SET name=${name},uhid=${uhid},dob=${dob},bednum=${bednum},profile=${profile} WHERE id=${id}",p)
        .then(()=>res.json(p),e=>{log(e);res.send('fail');});
    else db.one("INSERT INTO patients(name,uhid,dob,bednum,profile) VALUES (${name},${uhid},${dob},${bednum},${profile}) RETURNING *",p)
        .then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/getProfile',function(req,res){
    var id=req.body;
    db.one("SELECT * FROM patients WHERE id=$1",[id])
    .then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/saveForm',function(req,res){
    var form=req.body;form.dt=new Date();form.savedBy={id:0,name:'dummy'};
    db.none("INSERT INTO forms(type,dt,savedBy,patientId,data) VALUES (${type},${dt},${savedBy},${patientId},${data})",form)
    .then(protocolManager.process(form))
    .then(rs=>res.send('success'))
    .catch(e=>{log(e);res.end('fail');});
});

router.post('/getForms',function(req,res){
    var id=req.body,patient,forms;
    Promise.all([db.oneOrNone("SELECT * FROM patients WHERE id=$1",[id]),db.any("SELECT * FROM forms WHERE patientId=$1 ORDER by id DESC",[id])])
    .then(rs=>{patient=rs[0];forms=rs[1];protocolManager.recommend(patient,forms);})
    .then(reco=>res.json({forms:forms,reco:reco}))
    .catch(e=>{log(e);res.send('fail');});
});

router.post('/getProtocol',function(req,res){
    var type=req.body;
    protocolManager.get(type).then(rs=>res.json(rs),e=>res.send('fail'));
});

router.post('/saveProtocol',function(req,res){
    var protocol=req.body;protocol.savedBy={id:0,name:'dummy'};
    protocolManager.save(protocol).then(rs=>res.json(rs),e=>res.send('fail'));
});

router.post('/validateProtocol',function(req,res){
    // protocolManager.process({patientId:req.body.patient.id})
    // .then(protocolManager.recommend(req.body.patient,req.body.forms))
    // .then(rs=>res.json(rs),e=>log(e))
    // .catch(e=>{log(e);res.send('fail');});
    protocolManager.process(req.body.patient,{})
    .then((patient)=>protocolManager.recommend(patient,req.body.forms))
    .then(rs=>res.json(rs),e=>log(e));
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
            if(!chartRow)reject('dosageType:'+fp.dosageType+' not configured in the protocol chart.');
            if(fp.getValue('insulin','yest','same')){
                if(fp.dosageType=='Bedtime'){
                    if(fp.getValue('bg','today','Before Breakfast')){
                        dose = fp.getValue('insulin','yest','Bedtime')+(fp.getValue('bg','today','Before Breakfast') - 130) * fp.getValue('insulin','yest','Bedtime') / 200;
                        return resolve({dosageType:fp.dosageType,dose:dose,text:'Yesterday\'s Bedtime Dose: '+fp.getValue('insulin','yest','Bedtime')+'<br>Fasting BG Today: '+fp.getValue('bg','today','Before Breakfast')+'<br><br>Give '+round(dose,1)+' units of '+chartRow.ins+' subcutaneously'});
                    }
                }else{
                    if(fp.getValue('bg','yest','next')){
                        dose = fp.getValue('insulin','yest','same')+(fp.getValue('bg','yest','next') - fp.getValue('bg','yest','same')) / 500 * fp.getValue('insulin','yest','same') + (fp.getValue('bg','today','same') - 150) / 50;
                        return resolve({dosageType:fp.dosageType,dose:dose,text:'Yesterday\'s Dose: '+fp.getValue('insulin','yest','same')+'<br>Pre-Meal BG Yesterday: '+fp.getValue('bg','yest','same')+'<br>Next BG Yesterday: '+fp.getValue('bg','yest','next')+'<br><br>Give '+round(dose,1)+' units of '+chartRow.ins+' subcutaneously'});
                    }
                }
            }
        //lookup from protocol chart                                    
        if(!profile.subcutaneousColumn)reject('Subcutaneous Column not defined for patientId:'+patient.id);
        dose=chartRow['col'+profile.subcutaneousColumn];
        if(!dose){
            reject('dosageType:'+fp.dosageType+', column: '+profile.subcutaneousColumn+' not configured in protocol chart');
        }else resolve({dosageType:fp.dosageType,dose:dose,text:'Using dosage chart due to insufficient past data<br>Current Dosage Column: '+profile.subcutaneousColumn+'<br><br>Give '+round(dose,1)+' units of '+chartRow.ins+' subcutaneously'});
    });
       }else if(patient.insulinDeliveryType=='infusion'){
        reject('Protocol for insulin infusion is not yet developed');
    }else{
        resolve({text:'This patient is not currently on insulin.<br>Please edit the patient profile to initiate insulin therapy.',error:2});
    }
});
};
ProtocolManager.prototype.process=function(patient,form){
    return new Promise(function(resolve,reject){
        var profile = patient.profile;
        if(!profile.subcutaneousColumn){
            if(profile.weight<60){
                if(profile.preTransplantDose<30){
                    profile.subcutaneousColumn=2;
                }else{
                    profile.subcutaneousColumn=3;
                }
            }else if(profile.weight<80){
                if(profile.preTransplantDose<30){
                    profile.subcutaneousColumn=3;
                }else{
                    profile.subcutaneousColumn=4;
                }
            }else if(profile.weight<100){
                if(profile.preTransplantDose<40){
                    profile.subcutaneousColumn=4;
                }else{
                    profile.subcutaneousColumn=5;
                }
            }else if(profile.weight){
                if(profile.preTransplantDose<50){
                    profile.subcutaneousColumn=6;
                }else{
                    profile.subcutaneousColumn=7;
                }
            }else return reject('Patient weight is mandatory');
            resolve(patient);
        }else{
                //change of column or alerts based on the measured value and current column
                resolve(patient);
            }
        });
};

function FormProcessor(insulinDeliveryType,forms){
    this.insulinDeliveryType=insulinDeliveryType;
    this.order=['Before Breakfast','10:00 AM','Before Lunch','Before Evening Snack','Before Dinner','Bedtime'];
    var fh={};
    if(insulinDeliveryType=='subcutaneous'){
        for(var i=0;i<forms.length;i++){
            var f=forms[i],dt=date.format(new Date(f.dt),'DD MMM YYYY');
            if(!fh[f.type])fh[f.type]={};if(!fh[f.type][dt])fh[f.type][dt]={};fh[f.type][dt][f.data.dosageType]=f.data;
            if(f.type=='subcutaneous'){this.isValid=true;if(!this.dosageType)this.dosageType=f.data.dosageType;}
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
