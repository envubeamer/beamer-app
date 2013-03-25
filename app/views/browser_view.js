var View     	= require('./view')
  , template 	= require('./templates/browser')
  , Application = require('application')

module.exports = View.extend({
    id: 'browser-view',
    template: template,
    
    events: {
		"click a.content": "shareContent",
	},
	
	shareContent: function(event) {
		console.log('Clicked share content');
    	
    	// Do not trigger the default action of the event
		event.preventDefault();
		
		Application.router.navigate('share', {trigger: true});
	},
	
})
