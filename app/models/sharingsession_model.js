var Model 	= require("./model");

module.exports = Model.extend({
	urlRoot: "https://api.engin.io/v1/objects/sharingsession",

	url: function() {
		if(this.get("id")) {
			return this.urlRoot + "/" + this.id;
		} else {
			return this.urlRoot;
		}
	}
});