var Model = require("./model");
var Application = require('application')

module.exports = Model.extend({
	urlRoot: Application.config.apiUrl + "/v1/files",

	url: function() {
        if(this.id) {
            return this.urlRoot + "/" + this.id;
        } else {
            return this.urlRoot;
        }
    },

    uploadFile: function(file) {

        var blobs = [];
        var bytes_per_chunk = 1024 * 1024;
        var start = 0;
        var end = bytes_per_chunk;
        var size = file.size
        while (start < size) {
            //push the fragments to an array
            blobs.push({
                chunk: file.slice(start, end),
                start: start,
                end: end
            });
            start = end;
            end = start + bytes_per_chunk;
            if(end > size) {
                end = size;
            }
        }
        this.blobs = blobs;
        this.totalBlobs = blobs.length;
        this.uploadedBlobs = 0;
        this.blobSize = size;

        this.on("upload:chunk", this.uploadNextChunk, this);
        this.uploadNextChunk();
    },

    uploadNextChunk: function() {
        blob = this.blobs.shift();
        if(blob) {
            this.uploadedBlobs++;
            this.uploadChunk(blob, (this.uploadedBlobs / this.totalBlobs));
        }
    },

    uploadChunk: function(chunk, progress) {
        var self = this;
        var xhr = new XMLHttpRequest();
        xhr.open('PUT', Application.config.apiUrl + '/v1/files/' + this.id + '/chunk', true);
        Application.setXhrHeaders(xhr);
        xhr.setRequestHeader("Content-Range", chunk.start + "-" + chunk.end + "/" + this.blobSize);
        xhr.onload = function() {
            self.trigger("upload:progress", progress);
            self.trigger("upload:chunk", JSON.parse(this.response));
        };

        xhr.send(chunk.chunk);
    }
});