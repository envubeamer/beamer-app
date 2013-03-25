var Model		= require('./model')
  , Application = require('application')
  , User		= require('./user_model')

module.exports = Model.extend({
	urlRoot: Application.config.apiUrl + "/v1/auth/identity",
	
	parse: function(response, options) {
		var session = {}
		
		session.sessionToken = response.sessionToken;
		session.user = new User();
		session.user.set(response.user);
		
		console.log("Session model parsed")
		
		return session;
	}
});