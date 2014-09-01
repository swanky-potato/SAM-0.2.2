//devel objects
var logger = require(libDir+'core/Logger.js');
var config = require(libDir+'core/Config_loader.js');

function Mounts() {

	this.Mounts_config
	this.serial
	this.omroepen = new Array();
	this.zenders = new Array();
	this.points = new Array();
	this.points_objects = new Array();

	this.config_loader = new config('streaming-mounts');
	//this.config_loader.load_config();
	//console.log(util.inspect(this.config_loader.stored, { showHidden: true, depth: null, colors: true }));

	this.Mounts_config =  this.config_loader.stored;
	this.serial = this.Mounts_config['serial'];
	
	logger.info("creating Mounts Databank");

	for (var omroep in this.Mounts_config) {
		if(omroep != 'serial') {
			this.omroepen.push(omroep);
			for(var zender in this.Mounts_config[omroep]) {
				this.zenders.push(zender);
				for(var mounts in this.Mounts_config[omroep][zender]['mounts']) {
					this.points.push(mounts);
					this.points_objects[mounts] = this.Mounts_config[omroep][zender]['mounts'][mounts];
				}
			} 
		}
	}
}

Mounts.prototype.get_serial = function() {
	logger.debug('Function get_serial deprecated! Please use var foo = objc.bar ');
	return this.serial;
}

Mounts.prototype.get_omroepen = function() {
	logger.debug('Function get_omroepen deprecated! Please use var foo = objc.bar ');
	return this.omroepen;
}

Mounts.prototype.get_zenders = function() {
	logger.debug('Function get_zenders deprecated! Please use var foo = objc.bar ');
	return this.zenders;
}
Mounts.prototype.get_mounts = function() {
	logger.debug('Function get_mounts deprecated! Please use var foo = objc.bar ');
	return this.points;
}
Mounts.prototype.get_mount_info = function(mount) {
	return this.points_objects[mount]
}

module.exports = Mounts;
