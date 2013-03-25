// Base class for all models
module.exports = Backbone.Model.extend({
    
    initialize: function(attributes, options) {
    	Backbone.Model.prototype.initialize.apply(this, arguments);
    },

    parseErrors: function(originalModel, response, options) {
        if(response.status == 400) {
            var error = $.parseJSON(response.responseText);
            var validationErrors = {};
            if(error && error.errors) {
                _.each(error.errors, function(error) {
                    if(error.reason == "ValidationFailed") {
                        validationErrors[error.property] = error.message;
                    }
                });
                originalModel.handleValidationErrors(validationErrors);
            }
        }
    },

    handleValidationErrors: function(validationErrors) {
        if(!_.isEmpty(validationErrors)) {
            this.trigger("validation:error", this, validationErrors);
            return validationErrors;
        } else {
            this.trigger("validation:success");
        }
    }
})
