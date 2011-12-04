(function() {
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
})();