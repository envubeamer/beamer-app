var application = require('application')
var HomeView = require('views/home_view')
var BeamView = require('views/beam_view')

module.exports = Support.SwappingRouter.extend({
	el: "#main-content",
    routes: {
        '': 'home',
        'beam/:id': 'beam'
    },

    initialize: function() {
    },
    
    home: function() {
    	this.swap(new HomeView());
    },

    beam: function(id) {
    	this.swap(new BeamView({photoToken: id}));
    }
})
