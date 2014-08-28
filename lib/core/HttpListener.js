/*
* HttpListener(); 
*	Creates the http interface to listen on.
*	Can bind to specifick port and ip adress.
*	Loads own config file from the config folder
*	
*/

//require NodeJS Object
var util = require('util');
var http = require('http');
var path = require("path");
var url = require("url");

//Load Costum class files
//var Config_Loader = require(libDir+'core/Config_loader.js');
var HttpErrorResponse = require(libDir+'controllers/HttpErrorResponse.js');
var Apiv1 = require(libDir+'controllers/Apiv1.js');

function HttpListener(ipAdress, portNumber) {
	//load interface Configuration
	//this.Config_loader = new Config_Loader('http-interfaces');
	//this.ports = this.Config_loader.stored['port'];
	

	//Create Interface listener
	try {
		http.createServer(function (request, response) {
			this.req_path = url.parse(request.url).pathname; 
			this.dirs = this.req_path.split(path.sep);
			//console.log(util.inspect(this.dirs, { showHidden: true, depth: null, colors: true }));
			//console.log(this.dirs[1]);
			if(this.dirs[1] == 'apiv1' && request.method == 'POST') {
				var result;
				request.on('data',function(data) {
					this.apiv1 = new Apiv1();
					this.catchresponse = this.apiv1.call(request, data);
					console.log(this.catchresponse);
				});

				request.on('end',function(){
					if(this.catchresponse.code !== 200) {
						body = new HttpErrorResponse(this.catchresponse.code);
						body = body.html;
					} else {
						body = this.catchresponse.body;
					}

					response.writeHeader(this.catchresponse.code, this.catchresponse.type);    
					response.write(body);    
					response.end();
				})

				
			} else if (this.dirs[1] == 'dashboard') {
				body = new HttpErrorResponse(404);
				body = body.html;
				response.writeHeader(404, {"Content-Type": "text/html"});    
				response.write(body);    
				response.end();
			} else {	
				body = new HttpErrorResponse(404);
				body = body.html;
				response.writeHeader(404, {"Content-Type": "text/html"});    
				response.write(body);    
				response.end();
			}
		}).listen(portNumber);
		console.log("Server "+" listening on Port:"+portNumber);
	} catch(err) {
		console.log('error: '+err);
	}
}

HttpListener.prototype.update_interfaces = function() {
	// body...
};

module.exports = HttpListener;