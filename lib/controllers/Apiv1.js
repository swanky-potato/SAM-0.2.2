var path = require("path");
var url = require("url");
var util = require("util");

var Json_Loader = require(libDir+'core/Json_loader.js');
var Mounts = require(libDir+'core/Mounts.js');
var APIAuthentication = require(libDir+'core/APIAuthentication.js');
var ToJson = require(libDir+'core/ToJson.js');

function Apiv1() {
	this.MountPoints = new Mounts();
	this.ApiAuthenticator = new APIAuthentication();
	//this.InstanceList = new Slavelist();
}

Apiv1.prototype.call = function(request, data) {

		this.req_path = url.parse(request.url).pathname; 
		this.dirs = this.req_path.split(path.sep);
		this.result = {}

		// console.log('result: '+this.result)


		parser = new Json_Loader("","");
		parser.file = data;
		parser.parse_file();
		json = parser.json;
		console.log('PostData: '+util.inspect(json, { showHidden: true, depth: null, colors: true }));
		// console.log("this.dirs: "+this.dirs[2]);

		switch (this.dirs[2]) {

			//Create a new item in the Slavelist to be able to monitor the current active servers
			case 'register':
				if(this.ApiAuthenticator.validateKey(json['apikey']) == true) {
					//console.log(json);
					this.result.body = null;
					Listinstaces = global.InstanceList.store_instance(request, json);
					//console.log(util.inspect(this.MountPoints, { showHidden: true, depth: null, colors: true }));
					this.result.code = 200;
					this.result.type = '{"Content-Type": "text/plain}'
					this.result.body = this.MountPoints.serial;
				} else {
					this.result.code = 401;
					this.result.type = '{"Content-Type": "text/html"}'
				}
			break;

			case 'list-mounts':
				if(this.ApiAuthenticator.validateKey(json['apikey']) == true) {
					//console.log(json);
					this.result.body = null;
					// console.log(this.MountPoints.points);
					//console.log(util.inspect(this.MountPoints, { showHidden: true, depth: null, colors: true }));
					createJson = new ToJson(this.MountPoints.points);
					this.result.code = 200;
					this.result.type = '{"Content-Type": "application/json"}'
					this.result.body = createJson.stored;

				} else {
					this.result.code = 401;
					this.result.type = '{"Content-Type": "text/html"}'
				}
			break;

			case 'mount-info':
				if(this.ApiAuthenticator.validateKey(json['apikey']) == true) {
					//console.log(json);
					this.result.body = null;
					// console.log(this.MountPoints.points);
					//console.log(util.inspect(this.MountPoints, { showHidden: true, depth: null, colors: true }));
					createJson = new ToJson(this.MountPoints.get_mount_info(json['mount']));
					this.result.code = 200;
					this.result.type = '{"Content-Type": "application/json"}'
					this.result.body = createJson.stored;

				} else {
					this.result.code = 401;
					this.result.type = '{"Content-Type": "text/html"}'
				}
			break;

			default :
				this.result.code = 401;
				this.result.type = '{"Content-Type": "text/html"}'
			break;
		}
		return this.result;
};

module.exports = Apiv1;