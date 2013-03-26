var View     = require('./view')
  , template = require('./templates/pairing')
  , Application = require('application')

module.exports = View.extend({
    template: template,
    token: null,
    shareUrl: null,
    
    events: {
    	"click a#browse-content": "browseContent"
    },

    initialize: function() {
		// Only let authenticated users access this view
    	View.prototype.isAuthenticated.apply(this);
    	this.token = (Math.random() * Math.random()).toString(36).substr(2,26);
		shareUrl = 'http://envu-beamer-app.herokuapp.com/' + '#beam/' + this.token;
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
        var data = {shareurl: shareUrl};
        return data
    },
})
