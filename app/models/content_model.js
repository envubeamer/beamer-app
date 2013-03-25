var Model 	= require("./model");

module.exports = Model.extend({
	urlRoot: "https://api.engin.io/v1/objects/content",

	url: function() {
		if(this.get("id")) {
			return this.urlRoot + "/" + this.id + '?include={"file":{}}';
		} else {
			return this.urlRoot;
		}
	}
});