var ViewHelper  = require('lib/view_helper')
  , Session  	= require('../models/session_model')
  , Application = require('application')

// Base class for all views
module.exports = Support.CompositeView.extend({
    
    initialize: function(){
        this.render = _.bind(this.render, this);
    },
    
    template: function(){},
    getRenderData: function(){},
    
    render: function(){
        this.$el.html(this.template(this.getRenderData()))
        this.afterRender();
        return this;
    },
    
    afterRender: function(){},
    
    isAuthenticated: function() {
    	var sessionToken = localStorage.getItem('sessionToken');
    	if (Application.session != null && sessionToken != null && 
    			Application.session.get('sessionToken') == localStorage.getItem('sessionToken')) {
    		console.log('User is authenticated');
    	} else {
			console.log('User is not authenticated');
  			Application.router.navigate('login', {trigger: true});
    	}
    },
    
    logout: function() {
    	var sessionToken = localStorage.getItem('sessionToken');
	  	if (sessionToken != null && Application.session) {
	  		var url = Application.config.apiUrl + "/v1/session";
	  		Application.session.destroy({
	  			url: url,
	  			success: function(model, response, options) {
	  				console.log('User successfully logged out');
	  				Application.router.navigate('', {trigger: true});
	  				localStorage.removeItem('sessionToken');
	  				localStorage.removeItem('username');
	  			},
	  			error: function(model, xhr, options) {
	  				console.log('User logout was unsuccessful');
	  			}
	  		});
	  	}
    }
    
})
