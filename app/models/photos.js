var Collection 		= require("./collection");
var Photo = require("./photo")
module.exports = Collection.extend({
	model: Photo,
	url: "https://api.engin.io/v1/objects/photos"
});