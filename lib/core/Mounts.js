//devel objects
var util = require('util');
//var glob = require('./global_config.js');

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
	}//end of forloop 1*/
	
	/*console.log("mounts: "+this.Mounts_config);
	console.log("serial: "+this.serial);
	console.log("Omroepen: "+this.omroepen);
	console.log("Zenders: "+this.zenders);
	console.log("Points: "+this.points);
	console.log("Point_info: "+this.points_objects["3fm-sb-mp3"]);*/
}//end of function

Mounts.prototype.get_serial = function() {
	util.log('Function get_serial deprecated! Please use var foo = objc.bar ');
	return this.serial;
}

Mounts.prototype.get_omroepen = function() {
	util.log('Function get_omroepen deprecated! Please use var foo = objc.bar ');
	return this.omroepen;
}

Mounts.prototype.get_zenders = function() {
	util.log('Function get_zenders deprecated! Please use var foo = objc.bar ');
	return this.zenders;
}
Mounts.prototype.get_mounts = function() {
	util.log('Function get_mounts deprecated! Please use var foo = objc.bar ');
	return this.points;
}
Mounts.prototype.get_mount_info = function(mount) {
	// console.log("mountIN: "+mount);
	// console.log('mountOUT: '+util.inspect(this.points_objects[mount], { showHidden: true, depth: null, colors: true }));
	// var tmpstore = '{'
	
	// for(var setting in this.points_objects[mount]) {
		// tmpstore += '"'+setting+'" : "'+this.points_objects[mount][setting]+'",';
		// console.log('"'+setting+'" : "'+this.points_objects[mount][setting]+'",');
	// }
	// tmpstore = tmpstore.substring(0, tmpstore.length-1);
	// tmpstore += '}'
	
	//console.log("String: "+tmpstore);
	//console.log("point_data mount: "+util.inspect(this.points_objects[mount]));
	//return points_objects[mount];	
	// return tmpstore

	return this.points_objects[mount]
}

module.exports = Mounts;
