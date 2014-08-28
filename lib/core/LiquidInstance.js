

		/*var host_adress = null;
		var user_agent = null;
		var instance_name = null;
		var set_name = null;
		var api_key = null;		
		var callTime = new Date();*/

function LiquidInstance(headers, data) {

		console.log("req: "+headers+" Data: "+data);
		
		this.host_adress = headers['host'];
		this.user_agent = headers['userAgent'];
		this.instance_name = data['instance'];
		this.set_name = data['set'];
		this.api_key = data['apikey'];
		this.post_ip = data['ip'];
		this.callTime = new Date();
}


LiquidInstance.prototype.get_instance_name = function() {
	return instance_name;
}

module.exports = LiquidInstance;