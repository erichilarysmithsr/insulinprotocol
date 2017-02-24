var express = require('express');
var router = express.Router();
var datastore = require('@google-cloud/datastore')();
var debug = require('debug')('nodeserver');


/* GET home page. */
router.get('/check', function(req, res, next) {
	let key = datastore.key(['Company', 'Google']);
	let data = {
		name: 'Google',
		location: 'CA'
	};
	datastore.save({
		key: key,
		data: data
	}, function(err) {
			if (!err) {
			res.send('success');			    
		}else{
			debug(err);
			res.send('fail');
		}
	});
	datastore.get(key,function(err,entity){
		debug(entity);
	});
});

module.exports = router;
