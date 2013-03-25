// Application bootstrapper.
Application = {
	config: {
		apiUrl: "https://api.engin.io"
	},

    initialize: function() {
        
        var Router = require('lib/router')

        this.router = new Router()

        if (typeof Object.freeze === 'function') Object.freeze(this)
    },

	setXhrHeaders: function(xhr) {
		xhr.setRequestHeader('Enginio-Backend-Id', '515001c5698b3c2447005430');
	  	xhr.setRequestHeader('Enginio-Backend-Secret', '64c9d169ac7dbffa7e40ac0859a57105');
	  	
	  	var sessionToken = localStorage.getItem('sessionToken');
	  	if (sessionToken != null) {
	  		xhr.setRequestHeader('Enginio-Backend-Session', sessionToken);
	  	}
	}
}

module.exports = Application
