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
var logger = require(libDir+'core/Logger.js');

//Load Costum class files
var HttpErrorResponse = require(libDir+'controllers/HttpErrorResponse.js');
var Apiv1 = require(libDir+'controllers/Apiv1.js');

function HttpListener(ipAdress, portNumber) {
	//Create Interface listener
	try {
		http.createServer(function (request, response) {

			logger.info(request.url + " - " + request);
			this.req_path = url.parse(request.url).pathname; 
			this.dirs = this.req_path.split(path.sep);

			if(this.dirs[1] == 'apiv1' && request.method == 'POST') {
				var result;
				request.on('data',function(data) {
					this.apiv1 = new Apiv1();
					this.catchresponse = this.apiv1.call(request, data);
					//console.log(this.catchresponse);
				});

				request.on('end',function(){
					if(this.catchresponse.code !== 200) {
						body = new HttpErrorResponse(this.catchresponse.code);
						body = body.html;
					} else {
						body = this.catchresponse.body;
					}

					logger.info("response - "+ this.catchresponse.code +" - "+ this.catchresponse.type);
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
		logger.info("Server "+" listening on Port:"+portNumber);
	} catch(err) {
		logger.debug('error: '+err);
	}
}

HttpListener.prototype.update_interfaces = function() {
	// body...
};

module.exports = HttpListener;