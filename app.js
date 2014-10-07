	//setting globel vars (directory pointers)
	global.rootDir = __dirname;
	global.libDir = rootDir+'/lib/';
	global.confDir = rootDir+'/config/';
	global.cacheDir = rootDir+'/tmp/';
	global.viewsDir = rootDir+'/views/';
	global.LogDir = rootDir+'/logs/';

	var logger = require(libDir+'core/Logger.js');
	//giving starting information to logger
	logger.debug(process.versions);
	logger.debug("rootDir - "+rootDir);

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
	
	//setting server basic configuration
	if(process.argv[2] == undefined && process.argv[3] == undefined) {
		logger.info('using configuration port from config.json');
		this.ipAdress = this.Server_config.stored['ip'];
		this.portNummer = this.Server_config.stored['port'];
	} else if (process.argv[3] == undefined) {	
		this.ipAdress = process.argv[2];
		this.portNummer = this.Server_config.stored['port'];
	} else {
		this.ipAdress = process.argv[2];
		this.portNummer = process.argv[3];
	}

	//logger.info("ipAdress: " + this.ipAdress);
	//logger.info("Port: " + this.portNummer);

	this.interfaces = new HttpListeners(this.ipAdress,this.portNummer);


	// Start reading from stdin so we don't exit.
	process.stdin.resume();

	process.on('SIGINT', function() {
  	  logger.warn('Got SIGINT. stopping NodeJS process.');
	  process.abort()
	});