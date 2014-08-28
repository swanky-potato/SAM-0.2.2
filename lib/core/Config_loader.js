var util = require('util');
var Json_loader = require(libDir+'core/Json_loader.js');

function Config_Loader(filename) {
	this.config = new Json_loader(filename, confDir);
	this.cache = new Json_loader(filename, cacheDir);
	this.stored = null;	
	this.filename = filename;

	this.cache.load_file();
	this.config.load_file();

	config_store = this.config.json;
	cache_store = this.cache.json;
	
	if(cache_store == false || cache_store['serial'] <= config_store['serial']) {
		this.config.store_json(this.filename, cacheDir);
		this.stored = config_store;
	} else if(cache_store['serial'] > config_store['serial']) {
		//this.cache.store_json(this.filename, confDir);
		this.stored = cache_store;
	}

}	


Config_Loader.prototype.load_config = function() {
	util.log('Function load_config deprecated! Config_Loader loads file on construct');
	this.cache.load_file();
	this.config.load_file();

	config_store = this.config.get_json();
	cache_store = this.cache.get_json();
	
	if(cache_store == false || cache_store['serial'] <= config_store['serial']) {
		this.config.store_json(this.filename, cacheDir);
		this.stored = config_store;
	} else if(cache_store['serial'] > config_store['serial']) {
		//this.cache.store_json(this.filename, confDir);
		this.stored = cache_store;
	}

}

Config_Loader.prototype.get_config = function() {
	return this.stored;
}
	
module.exports = Config_Loader;	