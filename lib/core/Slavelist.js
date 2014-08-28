var Liquidinstance = require(libDir+'core/LiquidInstance.js');
var fs = require('fs');

function Slavelist() {
	this.instances = new Object();
	this.updatetime = new Date();
}

Slavelist.prototype.store_instance = function(req, data){
	
	item = new Liquidinstance(req.headers, data);
	name = item.instance_name;
	
	//console.log("req: "+req.headers+" Data: "+data);
	
	this.instances[name] = item;
	//this.save_current_active_instances()
	//console.log(this.instances);
	setInterval(this.save_current_active_instances, 1000000, this.instances);
}

Slavelist.prototype.save_current_active_instances = function(vars) {

	fs.writeFile(cacheDir+'Registert_instances.json', JSON.stringify(vars, null, 4), function(err) {
		if(err) {
			console.log("write: "+err);
		} else {
			console.log("JSON saved");
		}
	});
}

module.exports = Slavelist;