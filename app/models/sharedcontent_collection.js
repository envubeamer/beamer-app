var Collection 		= require("./collection");
var SharedContent = require("./sharedcontent_model")
module.exports = Collection.extend({
	model: SharedContent,
	url: "https://api.engin.io/v1/objects/sharedcontent"
});