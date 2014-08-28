
//loading NodeJS objects
var fs = require('fs');
var jade = require('jade');


function HttpError(errorNumber, request) {

	this.template = jade.compileFile(viewsDir+'errorPage.jade');
	this.html = '';

	switch(errorNumber) {
		case 401:
			this.html = this.template({error: {message : "Check your API key. THIS ONE IS WRONG!!!", code : 401}});
		break;

		case 404:
			this.html = this.template({error: {message : 'Oeps! You are looking for something that may or may not exist</br>Now removing the internet (rm -rf /internet/) well done', code : 404}});
		break;

		case 405:
			this.html = this.template({error: {message : "Oeps! Dont GET it here! Post it by POST! then we will talk", code : 405}});
		break;

		case 200:
			this.html = this.template({error: {message : "It Worked! i dont know what but it did! Great job", code : 200}});
		break;
	}
}

module.exports = HttpError;