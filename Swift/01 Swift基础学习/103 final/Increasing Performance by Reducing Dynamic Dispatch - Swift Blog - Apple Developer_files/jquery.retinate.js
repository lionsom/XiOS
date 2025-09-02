(function($) {
	if(typeof $ === "undefined") { return false; }
	
	$.extend($.fn, {
		retinate: function() {
			if($.retinate.is_retina() || $.retinate.force_retina) {
				var images = $.retinate.locate_images(this);
				var videos = $.retinate.locate_videos(this);
				var backgrounds = $.retinate.locate_css(this, 'background-image');
				var lists = $.retinate.locate_css(this, 'list-style-image');
				
				$.retinate.process_images(images);
				$.retinate.process_videos(videos);
				$.retinate.process_css(backgrounds, 'background-image');
				$.retinate.process_css(lists, 'list-style-image');
			}
			
			return this;
		}
	});
	
	$.retinate = {
		auto_retinate: true,
		data_tag: 'hires',
		exclude_value: false,
		force_retina: false,
		image_types: ['jpg', 'png', 'gif'],
		retina_tag: '_2x',
		status_pending: 'pending',
		status_replaced: 'replaced',
		
		is_retina: function() {
			var query = '(-webkit-min-device-pixel-ratio: 1.5),\
				(min--moz-device-pixel-ratio: 1.5),\
				(-o-min-device-pixel-ratio: 3/2),\
				(min-device-pixel-ratio: 1.5),\
				(min-resolution: 144dpi),\
				(min-resolution: 1.5dppx)';
			
			return (window.devicePixelRatio > 1 || (window.matchMedia && window.matchMedia(query).matches));
		},
		
		locate_images: function(root) {
			var images = root.find('img[data-' + $.retinate.data_tag + '!="' + $.retinate.exclude_value + '"]').filter(function() {
				return $(this).parents('[data-' + $.retinate.data_tag + '="' + $.retinate.exclude_value + '"]').length < 1;
			}).attr('data-' + $.retinate.data_tag + '-status', $.retinate.status_pending);
			
			return images;
		},
		
		locate_videos: function(root) {
			var images = root.find('video[poster][data-' + $.retinate.data_tag + '!="' + $.retinate.exclude_value + '"]').filter(function() {
				return $(this).parents('[data-' + $.retinate.data_tag + '="' + $.retinate.exclude_value + '"]').length < 1;
			}).attr('data-' + $.retinate.data_tag + '-status', $.retinate.status_pending);
			
			return images;
		},
		
		locate_css: function(root, property) {
			var images = root.find('*[data-' + $.retinate.data_tag + '!="' + $.retinate.exclude_value + '"]').filter(function() {
				return $(this).css(property) !== 'none';
			}).filter(function() {
				return $(this).parents('[data-' + $.retinate.data_tag + '="' + $.retinate.exclude_value + '"]').length < 1;
			}).attr('data-' + $.retinate.data_tag + '-status', $.retinate.status_pending);
			
			return images;
		},
		
		process_images: function(images) {
			$(images).each(function() {
				original = this.src;
				
				url = document.createElement('a');
				url.href = original;
				
				dot = url.pathname.lastIndexOf('.');
				filetype = url.pathname.substr((~-dot >>> 0) + 2);
				filename = url.pathname.substring(url.pathname.lastIndexOf('/') + 1, dot);
				is_retina = filename.slice($.retinate.retina_tag.length * -1) == $.retinate.retina_tag;

				if(!is_retina && $.inArray(filetype, $.retinate.image_types) > -1) {
					url.pathname = url.pathname.substr(0, dot) + $.retinate.retina_tag + '.' + filetype;
					$(this).attr('src', url).attr('data-' + $.retinate.data_tag + '-status', $.retinate.status_replaced);
				}
			});
		},
		
		process_videos: function(images) {
			$(images).each(function() {
				original = $(this).attr('poster');
				
				url = document.createElement('a');
				url.href = original;
				
				dot = url.pathname.lastIndexOf('.');
				filetype = url.pathname.substr((~-dot >>> 0) + 2);
				filename = url.pathname.substring(url.pathname.lastIndexOf('/') + 1, dot);
				is_retina = filename.slice($.retinate.retina_tag.length * -1) == $.retinate.retina_tag;
				
				if(!is_retina && $.inArray(filetype, $.retinate.image_types) > -1) {
					url.pathname = url.pathname.substr(0, dot) + $.retinate.retina_tag + '.' + filetype;
					$(this).attr('poster', url).attr('data-' + $.retinate.data_tag + '-status', $.retinate.status_replaced);
				}
			});
		},
		
		process_css: function(images, property) {
			$(images).each(function() {
				original = $(this).css(property).slice(4, -1).replace(/^"/,'').replace(/"$/,'');
				
				url = document.createElement('a');
				url.href = original;
				
				dot = url.pathname.lastIndexOf('.');
				filetype = url.pathname.substr((~-dot >>> 0) + 2);
				filename = url.pathname.substring(url.pathname.lastIndexOf('/') + 1, dot);
				is_retina = filename.slice($.retinate.retina_tag.length * -1) == $.retinate.retina_tag;
				
				if(!is_retina && $.inArray(filetype, $.retinate.image_types) > -1) {
					url.pathname = url.pathname.substr(0, dot) + $.retinate.retina_tag + '.' + filetype;
					$(this).css(property, 'url("' + url + '")').attr('data-' + $.retinate.data_tag + '-status', $.retinate.status_replaced);
				}
			});
		}
	};
	
	$(document).ready(function() {
		if($.retinate.auto_retinate) {
			$(':root').retinate();
		}
	});
	
	$(window).on('load', function () {
		if($.retinate.auto_retinate) {
			$(':root').retinate();
		}
	});
}(jQuery));
