var View     		  = require('./view')
  , template 		  = require('./templates/browser')
  , ContentCollection = require('../models/content_collection')
  , SharedContent	  = require('../models/sharedcontent_model')
  , Application 	  = require('application')

module.exports = View.extend({
    id: 'browser-view',
    template: template,
    
    events: {
	},
	
	initialize: function(options) {
		// Only let authenticated users access this view
    	View.prototype.isAuthenticated.apply(this);
		this.token = options.token;
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
		var data = {'content': []};
		this.collection.each(function (content) {
			var contentData = {};
			contentData.id = content.get('id');
			contentData.thumbnailUrl = Application.config.apiUrl + content.get('file').variants.thumbnail.url;
			contentData.originalUrl = Application.config.apiUrl + content.get('file').url;
			data.content.push(contentData);
		});

		return data;
	},
	
	afterRender: function() {
		// Only invoke the gallery if there are any images
		if (this.$("#gallery li").length > 0) {
			var self = this;
			var instance = this.$("#gallery a").photoSwipe({
				captionAndToolbarAutoHideDelay: 0,
				getToolbar: function() {
					return '<div class="ps-toolbar-close"><div class="ps-toolbar-content"></div></div><div class="ps-toolbar-play"><div class="ps-toolbar-content"></div></div><div class="ps-toolbar-previous"><div class="ps-toolbar-content"></div></div><div class="ps-toolbar-next"><div class="ps-toolbar-content"></div></div><div class="beamer-toolbar-share"><div class="ps-toolbar-content"></div></div>';
				},
				getImageMetaData: function(el) {
					return {id: el.getAttribute('id')};
				},
			});
			
			var shareEl;
			
			// onShow - store a reference to our share button
			instance.addEventHandler(Code.PhotoSwipe.EventTypes.onShow, function(e) {
				shareEl = window.document.querySelectorAll('.beamer-toolbar-share')[0];
			});
			
			// onToolbarTap - listen out for when the toolbar is tapped
			instance.addEventHandler(Code.PhotoSwipe.EventTypes.onToolbarTap, function(e) {
				if (e.toolbarAction === Code.PhotoSwipe.Toolbar.ToolbarAction.none) {
					if (e.tapTarget === shareEl || Code.Util.DOM.isChildOf(e.tapTarget, shareEl)) {
						var sharedContent = new SharedContent();
						sharedContent.save({
							token: self.token,
							content: {
				                objectType: "objects.content",
				                id: instance.getCurrentImage().metaData.id
				            },
						});
						alert('Shared ' + instance.getCurrentImage().src);
					}
				}
			});
			
			// onBeforeHide - clean up
			instance.addEventHandler(Code.PhotoSwipe.EventTypes.onBeforeHide, function(e) {
				shareEl = null;
			});
		}
	},
	
})
