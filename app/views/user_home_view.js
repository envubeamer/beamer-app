var View     	= require('./view')
  , template 	= require('./templates/user_home')
  , Application = require('application')

module.exports = View.extend({
    id: 'user-home-view',
    template: template,
    
    initialize: function() {
		// Only let authenticated users access this view
    	View.prototype.isAuthenticated.apply(this);
    },
    
    getRenderData: function() {
    	var data = {'username': Application.session.get('user').get('username')};
    	
    	return data;
    },
    
    events: {
    	"click a#upload-content": "uploadContent",
    	//"click a#browse-photos": "browsePhotos",
    	"click a#share-content": "shareContent",
    	"click a#logout": "logout",
    },
    
    uploadContent: function(event) {
    	console.log('Clicked upload content');
    	
    	// Do not trigger the default action of the event
		event.preventDefault();
		
		Application.router.navigate('upload', {trigger: true});
    },
    
//    browsePhotos: function(event) {
//    	console.log('Clicked browse photos');
//    	
//    	// Do not trigger the default action of the event
//		event.preventDefault();
//		
//		Application.router.navigate('login', {trigger: true});
//    },
    
    shareContent: function(event) {
    	console.log('Clicked share content');
    	
    	// Do not trigger the default action of the event
		event.preventDefault();
		
		Application.router.navigate('pairing', {trigger: true});
    },


    logout: function(event) {
        console.log('Clicked logout');
        
        // Do not trigger the default action of the event
        event.preventDefault();
        
        // Log the user out
    	View.prototype.logout.apply(this);
        
        //Application.router.navigate('home', {trigger: true});
    }
})
