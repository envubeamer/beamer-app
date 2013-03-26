var Collection 		= require("./collection");
var Content = require("./sharingsession_model")
module.exports = Collection.extend({
	model: Content,
	url: "https://api.engin.io/v1/objects/sharingsession"
});