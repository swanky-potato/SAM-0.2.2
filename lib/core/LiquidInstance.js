function LiquidInstance(headers, data) {

		var logger = require(libDir+'core/Logger.js');
		
		logger.info("Register Liquidsoap instance: "+ data['instance']);
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