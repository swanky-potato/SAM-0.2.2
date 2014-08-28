
if (process.argv[2] == '-h' || process.argv[2] == '--help') {
	console.log("start server by: node server.js [ipAdress] [port]");
} else {
	//giving starting information to STDOut
	console.log(process.versions);

	//setting globel vars (directory pointers)
	global.rootDir = __dirname;
	global.libDir = rootDir+'/lib/';
	global.confDir = rootDir+'/config/';
	global.cacheDir = rootDir+'/tmp/';
	global.viewsDir = rootDir+'/views/';
	global.LogDir = rootDir+'/logs/';
	//global.ipAdress = null;

	var Slavelist = require(libDir+'core/Slavelist.js');
	global.InstanceList = new Slavelist();

	//loading NodeJS objects
	var fs = require('fs');
	var util = require('util');

	//require costum classes
	var Config_Loader = require(libDir+'core/Config_loader.js');
	var HttpListeners = require(libDir+'core/HttpListener.js');

	//loading basic Configuration from json
	this.Server_config = new Config_Loader('config');
	this.ipAdress = '';
	this.portNummer = null;

	// console.log(util.inspect(this.Server_config.stored['ip'], { showHidden: true, depth: null, colors: true }));
	//setting server basic configuration
	//// Check for startup param IP "node server.js [ip]"
	// console.log('param input: '+ process.argv[2] +' - '+process.argv[2]);

	if(process.argv[2] == undefined && process.argv[3] == undefined) {
		// console.log('setting config ip json');
		this.ipAdress = this.Server_config.stored['ip'];
		this.portNummer = this.Server_config.stored['port'];
	} else if (process.argv[3] == undefined) {	
		this.ipAdress = process.argv[2];
		this.portNummer = this.Server_config.stored['port'];
	} else {
		// console.log('undefined ip');
		this.ipAdress = process.argv[2];
		this.portNummer = process.argv[3];
	}

	/*if(process.argv[2] != 'undefined' && process.argv[3] != 'undefined') {
		console.log('undefined ip?1');
		this.ipAdress = process.argv[2];
		this.portNummer = process.argv[3];
	} else if (process.argv[2] != 'undefined') {
		console.log('undefined ip?');
		this.ipAdress = process.argv[2];
		this.portNummer = this.Server_config.stored['port'];
	} else {
		console.log('inspect: '+util.inspect(this.Server_config.stored['ip'], { showHidden: true, depth: null, colors: true }));
		this.ipAdress = this.Server_config.stored['ip'];
		this.portNummer = this.Server_config.stored['port'];
	}*/

	console.log("ipAdress: " + this.ipAdress);
	console.log("Port: " + this.portNummer);

	this.interfaces = new HttpListeners(this.ipAdress,this.portNummer);


//var Server_config = new Config_Loader('config');
//Server_config.load_config();

//var ApiKeys = new Config_Loader('APIKeyStore');
//ApiKeys.load_config();

//devel start Obj
//var objc = new Mounts();


//var mounts_object = new Mounts();

//var server = new Http_Interface(this.Server_config.get_config(), ApiKeys.get_config());

//Code for use by the overlord only!!! Muwhahahaaaa
//var overlord = objc.demo;

//console.log(util.inspect(server, { showHidden: true, depth: null, colors: true }));




	// Start reading from stdin so we don't exit.
	process.stdin.resume();

	process.on('SIGINT', function() {
	//UNCOMMENT IF SOCKETS ARE USED!!
	//fs.unlink('./'+ipAdress, function (err) {
 	//	if (err) throw err;
 	//	console.log('successfully deleted'+ipAdress);
	//});
  	console.log('Got SIGINT. stopping server.');
	  process.abort()
	});
}