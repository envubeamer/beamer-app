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
		xhr.setRequestHeader('Enginio-Backend-Id', '')
	  	xhr.setRequestHeader('Enginio-Backend-Secret', '')
	}
}

module.exports = Application
