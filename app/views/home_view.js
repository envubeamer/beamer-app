var View     = require('./view')
  , template = require('./templates/home')
  , Photo	 = require('../models/photo')
  , File 	 = require('../models/file')
  , Application = require('application')

module.exports = View.extend({
    template: template,
    token: null,
    events: {
    	"change input[type=file]": "onFileUpload"
    },

    initialize: function() {
    	this.token = (Math.random() * Math.random()).toString(36).substr(2,26)
    	this.model = new Photo()
    	this.model.on('sync', this.redirect, this)
    	this.fileModel = new File()
    },

    afterRender: function() {
    	var self = this
    	setTimeout(function() {
    		$('#qr-code').qrcode('http://' + window.location.hostname + ':3333/#beam/' + self.token)
            $('.fileupload').fileupload()
    	}, 10)
    	
    },

    redirect: function(model) {
    	Application.router.navigate('beam/' + model.get("token"), {trigger: true})
    },

    onFileUploaded: function(key, file) {
    	console.log(this.token);
    	this.model.save({
    		token: this.token,
    		file: {
    			id: file.id,
    			objectType: "files"
    		}
    	})
    },

    onFileUpload: function(e) {
        var self = this;
        var fileData = this.$("input[type=file]")[0].files[0];
        var progress = this.$(".progress");
        var progressBar = progress.find(".bar");
        var key = this.$("select[name=property]").val();

        var data = {
            object: {
                objectType: "objects.photos",
                id: ""
            },
            fileName: fileData.name
        }

        var file = this.fileModel;

        progressBar.css("width", "5px");
        progress.removeClass("hidden").addClass("active");
        file.save(data, {
            success: function() {
                file.on("upload:progress", function(percentage) {
                    progressBar.css("width", (100 * percentage) + "%");
                });
                file.on("upload:chunk", function(response) {
                    if(response.status == "complete") {
                        file.set(response);
                        self.onFileUploaded(key, file);
                        setTimeout(function() {
                            progress.removeClass("active");
                        }, 1000);
                    }
                });
                file.uploadFile(fileData);
            }
        });
    },
})
