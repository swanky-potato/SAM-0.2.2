var Config_Loader = require(libDir+'core/Config_loader.js');
var logger = require(libDir+'core/Logger.js');

var util = require('util');

function APIAuthentication() {
	this.APIKeyDB = new Config_Loader('APIKeyStore');
}

APIAuthentication.prototype.validateKey = function(inputKey) {
	this.resp = false;
	console.log('inputKey: '+util.inspect(inputKey, { showHidden: true, depth: null, colors: true }));
	console.log(this.APIKeyDB.stored);
	for (var i in this.APIKeyDB.stored) {
		if(inputKey == this.APIKeyDB.stored[i]) {
			this.resp = true;
			break;
		} else {
			this.resp = false;
		}
	}
	logger.debug('Check result APIAuthentication: '+util.inspect(this.resp, { showHidden: true, depth: null, colors: true }));
	return this.resp;
};

module.exports = APIAuthentication;