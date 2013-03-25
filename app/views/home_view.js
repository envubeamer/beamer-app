var View     	= require('./view')
  , template 	= require('./templates/home')
  , Application = require('application')

module.exports = View.extend({
    id: 'home-view',
    template: template,
    
    events: {
    	"click a#sign-up": "signUp",
    	"click a#sign-in": "signIn",
    },
    
    signUp: function(event) {
    	console.log('Clicked sign up');
    	
    	// Do not trigger the default action of the event
		event.preventDefault();
		
		Application.router.navigate('registration', {trigger: true});
    },
    
    signIn: function(event) {
    	console.log('Clicked sign in');
    	
    	// Do not trigger the default action of the event
		event.preventDefault();
		
		Application.router.navigate('login', {trigger: true});
    }
})
