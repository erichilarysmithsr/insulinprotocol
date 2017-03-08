var express = require('express');
var router = express.Router();
var datastore = require('@google-cloud/datastore')();
var debug = require('debug')('nodeserver'),log=require('debug')('default');
var pgp = require('pg-promise')();
var db = pgp(process.env.DATABASE_URL);
var url=require('url');
var protocolManager=new ProtocolManager();

router.post('/getPatients', function(req,res) {
    let uhid=req.body;
    if(typeof uhid==='string'&&uhid){
        db.any("SELECT * FROM patients WHERE uhid=$1",[uhid]).then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
    }else db.any("SELECT * FROM patients ORDER by modifieddt DESC LIMIT 10").then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/savePatient', function(req,res) {
	var p=req.body;if(!p)return res.send('fail');
    if(p.id)db.none("UPDATE patients SET name=${name},uhid=${uhid},dob=${dob},bednum=${bednum},profile=${profile} WHERE id=${id}",p).then(()=>res.json(p),e=>{log(e);res.send('fail');});
    else db.one("INSERT INTO patients(name,uhid,dob,bednum,profile) VALUES (${name},${uhid},${dob},${bednum},${profile}) RETURNING *",p).then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/getProfile',function(req,res){
    var id=req.body;
    db.one("SELECT * FROM patients WHERE id=$1",[id]).then(rs=>res.json(rs),e=>{log(e);res.send('fail');});
});

router.post('/saveForm',function(req,res){
    var form=req.body;form.dt=new Date();form.savedBy={id:0,name:'dummy'};
    db.none("INSERT INTO forms(type,dt,savedBy,patientId,data) VALUES (${type},${dt},${savedBy},${patientId},${data})",form).then(protocolManager.process(form)).then(rs=>res.send('success'),e=>{log(e);res.end('fail');});
});

router.post('/getForms',function(req,res){
    var id=req.body;
    Promise.all([db.oneOrNone("SELECT * FROM patients WHERE id=$1",[id]),db.any("SELECT * FROM forms WHERE patientId=$1 ORDER by id DESC",[id])]).then(rs=>protocolManager.recommend(rs[0],rs[1]));
});

router.post('/getProtocol',function(req,res){
    var type=req.body;
    protocolManager.get(type).then(rs=>res.json(rs),e=>res.send('fail'));
});

router.post('/saveProtocol',function(req,res){
    var protocol=req.body;protocol.savedBy={id:0,name:'dummy'};
    protocolManager.save(protocol).then(rs=>res.json(rs),e=>res.send('fail'));
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
ProtocolManager.prototype.recommend=function(patient,forms){
    return new Promise(function(resolve,reject){
        var profile=patient.profile||{};
        if(profile.insulinDeliveryType=='subcutaneous'){
            var forms=forms.filter(r=>r.type=='subcutaneous'),lastForm=forms[0];
            if(!lastForm)return resolve('Please enter a glucose measurement to get recommendations');
            protocolManager.get('subcutaneous').then(protocol=>{
                var chart=protocol.data.chart,row=chart.find(r=>r.t==lastForm.dosageType);
                if(!row)reject('dosageType:'+r.t+' not configured in the protocol chart.');else{

                }
            });
            resolve('');
        }else if(patient.insulinDeliveryType=='infusion'){

        }else{
            resolve('This patient is not currently on insulin.<br>Please edit the patient profile to initiate insulin therapy.');
        }
    });
};
ProtocolManager.prototype.process=function(form){
    db.one("SELECT * FROM patients WHERE id=$1",[form.patientId]).then(patient=>{
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
            }else resolve('Please enter the patient\'s weight to calculate insulin dosage.');
        }else{
            //change of column or alerts based on the measured value and current column
        }
    });
};

module.exports = router;
