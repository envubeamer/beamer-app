var Model		= require('./model')
  , Application = require('application')

module.exports = Model.extend({
	urlRoot: Application.config.apiUrl + "/v1/users"	
	
	
});