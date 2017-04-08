var parseSpdx = require('spdx-expression-parse');
var checker = require('license-checker');

module.exports = function check-licenses(config){
	function check(){
		checker.init({
	    	start: process.cwd()
		}, function(err, json) {
		    if (err) {
		        //Handle error 
		    } else {
		        //The sorted json data 
		    }
		});
	}

	return {
		check: check,
	}
};
	