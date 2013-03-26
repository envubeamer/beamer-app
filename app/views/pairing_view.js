var View            = require('./view')
  , template        = require('./templates/pairing')
  , Application     = require('application')
  , SharingSession  = require('../models/sharingsession_model')
  , SharingSessionCollection = require('../models/sharingsession_collection') 

module.exports = View.extend({
    template: template,
    token: null,
    shareUrl: null,
    viewCount: 0,
    
    events: {
    	"click a#browse-content": "browseContent"
    },

    initialize: function() {
    	this.token = (Math.random() * Math.random()).toString(36).substr(2,26);
		shareUrl = 'http://envu-beamer-app.herokuapp.com/' + '#beam/' + this.token;
        viewCount = 0;
        this.sharingSessionModel = new SharingSession();
        this.sharingSessionCollection = new SharingSessionCollection();
        
        this.sharingSessionModel.save({
            token: this.token,
            views: 0
        })


        var self = this;
        var sharingFetchParams = {
            success: function(results){
                var newViewCount = results.get("views");

                if (newViewCount != self.viewCount){
                    self.viewCount = newViewCount;
                    self.render();
                }
            }
        };

        this.interval = setInterval(function() {
            self.sharingSessionModel.fetch(sharingFetchParams);
        }, 4000);
    },


    afterRender: function() {
    	setTimeout(function() {

			$('#qr-code').qrcode(shareUrl);
	        $('#share-url').val(shareUrl);
    	}, 10);
    },

    
    browseContent: function(event) {
    	console.log('Clicked browse content');
    	
    	// Do not trigger the default action of the event
		event.preventDefault();
		
		Application.router.navigate('browser/' + this.token, {trigger: true});
    },

    getRenderData: function() {
        var data = {shareurl: this.shareUrl, 
                    viewcount: this.viewCount};
        return data
    },
})
