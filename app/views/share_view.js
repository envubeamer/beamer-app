var View     	= require('./view')
  , template 	= require('./templates/share')
  , Application = require('application')

module.exports = View.extend({
    id: 'share-view',
    template: template,
    
//    events: {
//		"click input[type=submit]": "authenticateUser",
//	},
	
})
