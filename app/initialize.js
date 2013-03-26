var application = require('application')

$(function() {
	$.ajaxSetup({
	    dataType: "json",
	    contentType: "application/json"
	});

	$.ajaxPrefilter(function(options, originalOptions, xhr) {
		application.setXhrHeaders(xhr)
	});

	
	$(document).ajaxError(function (exception, xhr, options) {
        if (xhr.status === 0) {
            console.log('No network connectivity.');
        } else if (exception === 'timeout') {
            console.log('Request timed out.');
        } else if (exception === 'abort') {
            console.log('Ajax request aborted.');
        } else {
        	var message = 'HTTP status code:' + xhr.status + '\n Error info:' + xhr.responseText;
            console.log(message.substr(0, 300));
        }
    });

    application.initialize()
    Backbone.history.start()

})
