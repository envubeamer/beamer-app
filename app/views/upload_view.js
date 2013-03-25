var View     	= require('./view')
  , template 	= require('./templates/upload')
  , Application = require('application')

module.exports = View.extend({
    id: 'upload-view',
    template: template,
    
//    events: {
//		"click input[type=submit]": "authenticateUser",
//	},
	
})
