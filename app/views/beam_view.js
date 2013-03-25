var View     = require('./view')
  , template = require('./templates/beam')
  , Photo	 = require('../models/photo')
  , Photos	 = require('../models/photos')
  , Application = require('application')

module.exports = View.extend({
    template: template,

    initialize: function(options) {
    	this.collection = new Photos();
    	this.collection.on("reset", this.render, this);

    	var query = {
    		token: options.photoToken
    	};
    	var fetchParams = {
    		reset: true,
    		data: {
    			q: JSON.stringify(query),
    			limit: 10,
    			include: {
    				file: {
    					objectType: "files"
    				}
    			}
    		}
    	}
    	this.collection.fetch(fetchParams);
    	var self = this;
    	this.interval = setInterval(function() {
    		self.collection.fetch(fetchParams);
    	}, 5000);

    },

    afterRender: function() {
    	var model = this.collection.at(0);
    	if(model) {
    		this.$("img").removeClass("hidden");
    		this.$("i").removeClass("icon-spinner").removeClass("icon-spin");
    	}
    },

    getRenderData: function() {
    	var data = {imageUrl: "", beamed: false}
    	var model = this.collection.at(0);
    	if(model) {
    		clearInterval(this.interval);
    		if(model.get("file").variants.large.status == "complete") {
    			data["imageUrl"] = Application.config.apiUrl + model.get("file").variants.large.url;	
    		} else {
    			data["imageUrl"] = Application.config.apiUrl + model.get("file").url;
    		}
    		data["beamed"] = true
    	}

    	return data
    }
});