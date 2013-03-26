var Application 	 = require('application')
  , RegistrationView = require('views/registration_view')
  , LoginView 		 = require('views/login_view')
  , UserHomeView 	 = require('views/user_home_view')
  , UploadView	 	 = require('views/upload_view')
  , PairingView 	 = require('views/pairing_view')
  , BrowserView		 = require('views/browser_view')
  , ViewerView 		 = require('views/viewer_view')

module.exports = Support.SwappingRouter.extend({
	
	initialize: function() {
		this.el = $('#main-content');
    },
	
    routes: {
    	'': 'login',
        'registration': 'registration',
        'login': 'login',
        'users/:id': 'users',
        'upload': 'upload',
        'pairing': 'pairing',
        'browser/:token': 'browser',
        'beam/:id': 'beam'
    },
    
    home: function() {
    	this.swap(new HomeView());
    },
    
    registration: function() {
    	this.swap(new RegistrationView());
    },
    
    login: function() {
    	this.swap(new LoginView());
    },
    
    users: function(id) {
    	this.swap(new UserHomeView({userId: id}));
    },
    
    upload: function() {
    	this.swap(new UploadView());
    },
    
    pairing: function() {
    	this.swap(new PairingView());
    },
    
    browser: function(token) {
    	this.swap(new BrowserView({token: token}));
    },

    beam: function(id) {
    	this.swap(new ViewerView({photoToken: id}));
    }
})
