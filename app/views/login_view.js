var View     	= require('./view')
  , template 	= require('./templates/login')
  , Session  	= require('../models/session_model')
  , Application = require('application')

module.exports = View.extend({
    id: 'login-view',
    template: template,
    
    events: {
		"click input[type=submit]": "authenticateUser",
	},
	
	initialize: function() {
		//this.model = new Session();
	},
	
	authenticateUser: function(event) {
		console.log("Authenticate user");
		
		// Do not trigger the default action of the event
		event.preventDefault();
		
		Application.session = new Session();
		Application.session.save({
			username: this.$("#username").val(),
			password: this.$("#password").val()
		},
		{
			success: function(model, response, options) {
				console.log("User authenticated successfully!");
				// Store session token in local storage
				localStorage.setItem('sessionToken', model.get('sessionToken'));
				Application.router.navigate('users/' + model.get('user').get('id'), {trigger: true});
			},
			error: function(model, xhr, options) {
				console.log("User authentication failed!");
			}
		});
	}
})
