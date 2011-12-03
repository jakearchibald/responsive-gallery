(function() {
	function hasClass(elm, className) {
		return (' ' + elm.className + ' ').indexOf( className ) != -1;
	}

	function addListener(elm, type, callback) {
		if (elm.addEventListener) {
			elm.addEventListener( type, callback, false );
		}
		else if (elm.attachEvent) {
			elm.attachEvent( 'on' + type, callback );
		}
	}

	window.iLoveCats = {
		

		fadeImgsOnLoad: function() {
			// Little trick to fade images in when they load
			var imgs = document.getElementsByTagName( 'img' );

			// Catch images that have already loaded
			for (var i = imgs.length; i--;) if (imgs[i].naturalWidth) {
				imgs[i].className += ' loaded';
			}

			if (document.addEventListener) {
				document.addEventListener('load', function(event) {
					var target = event.target;
					if ( target.nodeName.toLowerCase() == 'img' ) {
						target.className += ' loaded';
					}
				}, true);
			}
		},

		
		initGalleries: function() {
			var testDiv = document.createElement( 'div' ),
				scripts = document.getElementsByTagName( 'script' ),
				lastTinyThumbValue,
				galleries = [];

			function FlickrGallery(script) {
				this.htmlStr = script.nextSibling.nodeValue.slice( 10, -15 );
				this.container = document.createElement( 'div' );
				script.parentNode.insertBefore( this.container, script.nextSibling );
			}
			
			FlickrGallery.prototype.changeLayout = function(tinyThumbs) {
				var htmlStr = this.htmlStr;
				
				if (tinyThumbs) {
					htmlStr = htmlStr.replace( /_m\.jpg/g, '_s.jpg' );
				}

				this.container.innerHTML = htmlStr;
			};

			// Add the test div to the page
			testDiv.className = 'gallery-test';
			document.body.insertBefore( testDiv, document.body.firstChild );

			// Init galleries
			for ( var i = scripts.length; i--; ) {
				var script = scripts[i];
				
				if ( hasClass(script, 'gallery-hide') ) {
					galleries.push( new FlickrGallery(script) );
				}
			}

			function respond() {
				var tinyThumbs = (testDiv.offsetWidth == 10);

				if (tinyThumbs === lastTinyThumbValue) {
					return;
				}

				for (var i = galleries.length; i--;) {
					galleries[i].changeLayout(tinyThumbs);
				}
				lastTinyThumbValue = tinyThumbs;
			}

			respond();
			addListener(window, 'resize', respond);
		}


	};
})();