// Base class for all collections
module.exports = Backbone.Collection.extend({
    parse: function(response) {
    	return response.results;
    }
})
