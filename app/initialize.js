var application = require('application')

$(function() {
	$.ajaxSetup({
	    dataType: "json",
	    contentType: "application/json"
	});
	$.ajaxPrefilter(function(options, originalOptions, xhr) {
		application.setXhrHeaders(xhr)
	});

    application.initialize()
    Backbone.history.start()

})
