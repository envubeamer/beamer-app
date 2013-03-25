var View     	= require('./view')
  , template 	= require('./templates/upload')
  , Photo	 	= require('../models/photo')
  , File 	 	= require('../models/file')
  , Application = require('application')

module.exports = View.extend({
    id: 'upload-view',
    template: template,
    
    events: {
    	"change input[type=file]": "onFileUpload",
	},
	
	initialize: function() {
		this.model = new Photo();
    	this.fileModel = new File();
	},
	
	afterRender: function() {
        $('.fileupload').fileupload();
	},
	
	onFileUpload: function(e) {
        var self = this;
        var fileData = this.$("input[type=file]")[0].files[0];
        var progress = this.$(".progress");
        var progressBar = progress.find(".bar");
        var key = this.$("select[name=property]").val();

        var data = {
            object: {
                objectType: "objects.content",
                id: ""
            },
            fileName: fileData.name
        };

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
    
    onFileUploaded: function(key, file) {
    	this.model.save({
    		//token: this.token,
    		file: {
    			id: file.id,
    			objectType: "files"
    		}
    	});
    },
	
})
