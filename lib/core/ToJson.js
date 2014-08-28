function ToJson(arr) {
	
	jsonString = '{';

	for(var item in arr) {
		// console.log("arr: " + arr);
		// console.log("item: " + arr[item]);
		// console.log("itemnr: " + item);
		
		jsonString += '"'+item + '" : "' + arr[item]+'",';
		console.log('1: '+jsonString);						
	}
	jsonString = jsonString.substring(0, jsonString.length-1);
	console.log('2: '+jsonString+'    ---    ');
	jsonString += '}'
	// console.log('3: '+jsonString);
	this.stored = jsonString;
	// console.log('stored: '+this.stored);
}

ToJson.prototype.get_jsonString = function() {
	return jsonString;
}

module.exports = ToJson;