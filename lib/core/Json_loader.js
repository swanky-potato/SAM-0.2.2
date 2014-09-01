//requide NodeJS Objects
var fs = require('fs');
var util = require('util');
var logger = require(libDir+'core/Logger.js');

function Json_loader(filename, uri) {
	//settin Object Vars
	this.filename = filename;
	this.uri = uri;
	this.file = null;
	this.json = null;
}


Json_loader.prototype.load_file = function() {	
	try {
		this.file = fs.readFileSync(this.uri+this.filename+'.json');
		if(this.file) {
			try {
				this.json = JSON.parse(this.file);
				} catch (e) {
					logger.error(e);
					this.json = false;
				}
		} 
	} catch (e) {
		logger.warn(e);
		this.json = false;
	}
}

Json_loader.prototype.get_json = function() {
	logger.debug('Function get_json deprecated! Please use var foo = objc.bar ');
	return this.json;

}

Json_loader.prototype.set_json = function(data) {
	logger.debug('Function set_json deprecated! Please use objc.bar = foo ');
	this.json = data;
}

Json_loader.prototype.set_file = function(data) {
	logger.debug('Function set_file deprecated! Please use objc.bar = foo ');
	this.file = data;
}

Json_loader.prototype.parse_file = function() {
	logger.debug("parsing json");
	this.json = JSON.parse(this.file);
}


Json_loader.prototype.store_json = function(filename, uri) {
	this.outputFilename = uri+filename+'.json';
	fs.writeFile(this.outputFilename, JSON.stringify(this.json, null, 4), function(err) {
		if(err) {
			logger.error("write: "+err);
		} else {
			logger.info("JSON saved");
		}
	});
}

module.exports = Json_loader;