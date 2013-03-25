var View     		= require('./view')
  , template 		= require('./templates/browser')
  , ContentCollection = require('../models/content_collection')
  , Application 	= require('application')

module.exports = View.extend({
    id: 'browser-view',
    template: template,
    
    events: {
	},
	
	initialize: function() {
		this.collection = new ContentCollection();
    	this.collection.on('reset', this.render, this);
    	
    	var fetchParams = {
    		reset: true,
    		data: {
    			limit: 10,
    			include: {
    				file: {
    					objectType: 'files'
    				}
    			}
    		}
    	};
    	this.collection.fetch(fetchParams);
	},
	
	getRenderData: function() {
		var data = {'photos': []};
		this.collection.each(function (photo) {
			var photoData = {};
			photoData.url = Application.config.apiUrl + photo.get('file').variants.thumbnail.url;
			data.photos.push(photoData);
		});

		return data;
	},
	
	afterRender: function() {
		// Only invoke the gallery if there are any images
		if (this.$("#gallery li").length > 0) {
			var instance = this.$("#gallery a").photoSwipe({
				getToolbar: function() {
					return '<div class="ps-toolbar-close"><div class="ps-toolbar-content"></div></div><div class="ps-toolbar-play"><div class="ps-toolbar-content"></div></div><div class="ps-toolbar-previous"><div class="ps-toolbar-content"></div></div><div class="ps-toolbar-next"><div class="ps-toolbar-content"></div></div><div class="beamer-toolbar-share"><div class="ps-toolbar-content"></div></div>';
				}
			});
			
			var shareEl;
			
			// onShow - store a reference to our share button
			instance.addEventHandler(Code.PhotoSwipe.EventTypes.onShow, function(e){
				shareEl = window.document.querySelectorAll('.beamer-toolbar-share')[0];
			});
			
			// onToolbarTap - listen out for when the toolbar is tapped
			instance.addEventHandler(Code.PhotoSwipe.EventTypes.onToolbarTap, function(e){
				if (e.toolbarAction === Code.PhotoSwipe.Toolbar.ToolbarAction.none){
					if (e.tapTarget === shareEl || Code.Util.DOM.isChildOf(e.tapTarget, shareEl)){
						alert('Shared ' + instance.getCurrentImage().src);
					}
				}
			});
			
			// onBeforeHide - clean up
			instance.addEventHandler(Code.PhotoSwipe.EventTypes.onBeforeHide, function(e){
				shareEl = null;
			});
		}
	},
	
})
