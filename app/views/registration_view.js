var View     	= require('./view')
  , template 	= require('./templates/registration')
  , User	 	= require('../models/user_model')
  , Application = require('application')

module.exports = View.extend({
    id: 'registration-view',
    template: template,
    
    events: {
		"click input[type=submit]": "saveUser",
	},
	
	initialize: function() {
		this.model = new User();
	},
	
	saveUser: function(event) {
		console.log("Save user");
		
		// Do not trigger the default action of the event
		event.preventDefault();
		
		this.model.save({
			username: this.$("#username").val(),
			password: this.$("#password").val()
		},
		{
			success: function(model, response, options) {
				console.log("User saved successfully!");
				Application.router.navigate('users/' + model.get('id'), {trigger: true});
			},
			error: function(model, xhr, options) {
				console.log("User creation failed!");
			}
		});
	}
})
