(function() {
	function escapeRegex(text) {
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	}

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

	function Gallery(script) {
		this.htmlStr = script.nextSibling.nodeValue.slice( 10, -11 );
		this.container = document.createElement( 'div' );
		script.parentNode.insertBefore( this.container, script.nextSibling );
	}
	
	Gallery.prototype.changeLayout = function(escapedInitialSuffix, newSuffix) {
		this.container.innerHTML = this.htmlStr.replace(
			new RegExp('(src="[^"]*)' + escapedInitialSuffix + '"', 'g'),
			'$1' + newSuffix + '"'
		);
	};

	window.responsiveGallery = function(args) {
		var testDiv = document.createElement( 'div' ),
			scripts = document.getElementsByTagName( 'script' ),
			lastSuffix,
			escapedInitialSuffix = escapeRegex( args.initialSuffix || '' ),
			galleries = [];

		// Add the test div to the page
		testDiv.className = args.testClass || 'gallery-test';
		testDiv.style.cssText = 'position:absolute;top:-100em';
		document.body.insertBefore( testDiv, document.body.firstChild );

		// Init galleries
		for ( var i = scripts.length; i--; ) {
			var script = scripts[i];
			
			if ( hasClass(script, args.scriptClass) ) {
				galleries.push( new Gallery(script) );
			}
		}

		function respond() {
			var newSuffix = args.suffixes[testDiv.offsetWidth] || args.initialSuffix;
			
			if (newSuffix === lastSuffix) {
				return;
			}

			for (var i = galleries.length; i--;) {
				galleries[i].changeLayout(escapedInitialSuffix, newSuffix);
			}
			lastSuffix = newSuffix;
		}

		respond();
		addListener(window, 'resize', respond);
	};
})();