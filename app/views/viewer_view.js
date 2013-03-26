var View     = require('./view')
  , template = require('./templates/viewer')
  , Content  = require('../models/content_model')
  , SharedContentCollection = require('../models/sharedcontent_collection')
  , SharingSessionCollection = require('../models/sharingsession_collection')  
  , Application = require('application')

module.exports = View.extend({
    template: template,
    viewData: {imageUrl: "", beamed: false, senderUserName: "" }, 

    initialize: function(options) {

        this.parseData = _.bind(this.parseData, this)
    	this.collection = new SharedContentCollection();
    	this.collection.on("reset", this.parseData, this);
        this.token = options.photoToken;

        this.sharingSessionCollection = new SharingSessionCollection();
        this.findSharingSession();

    	var query = {
    		token: options.photoToken
    	};

        var include = {
            creator: {},
            content: {
                 include: { 
                    file:{} 
                }
            }
        };

        var sort = [
            {"sortBy": "createdAt", "direction": "desc"}
        ];

    	var fetchParams = {
    		reset: true,
    		data: {
    			q: JSON.stringify(query),
    			limit: 10,
    			include: JSON.stringify(include),
                sort: JSON.stringify(sort)
    		}
    	};

    	this.collection.fetch(fetchParams);
    	var self = this;

    	this.interval = setInterval(function() {
    		self.collection.fetch(fetchParams);
    	}, 2000);
    },

    
    findSharingSession: function(){
        var sharingQuery = {
            token: this.token
        };

        var sharingInclude = {
            creator: {}
        };

        var self = this;
        var sharingFetchParams = {
            reset: true,
            data: {
                q: JSON.stringify(sharingQuery),
                limit: 10,
                include: JSON.stringify(sharingInclude)
            },

            success: function(results){
                self.updateViewCounter(results);
            }
        };

        this.sharingSessionCollection.fetch(sharingFetchParams);
    },


    updateViewCounter: function(results){
        var model = results.at(0);

        console.log( model.get("creator") );

        var data = {
            "$inc": {
                "views": 1
                }
            };

        $.ajax({
            url: model.url() + "/atomic",
            type: "PUT",
            contentType: "application/json",
            processData: false,
            data: JSON.stringify(data),
            success: function(response) { }
        });
    },


    parseData: function(){
        var model = this.collection.at(0);
        if(model) {
            var newViewData = {imageUrl: "", beamed: true, senderUserName: "TestUser" }

            if(model.get("content").file.variants.large.status == "complete") {
                newViewData["imageUrl"] = Application.config.apiUrl + model.get("content").file.variants.large.url;    
               
                if  (this.viewData["imageUrl"] != newViewData["imageUrl"]){
                    this.viewData = newViewData;
                    this.render();
                } 
            }
        }

        return this
    },


    afterRender: function() {
    	var model = this.collection.at(0);
    	if(model) {
    		this.$("img").removeClass("hidden");
    		this.$("i").removeClass("icon-spinner").removeClass("icon-spin");
    	}
    },

    getRenderData: function() {
        return this.viewData;
    }
});