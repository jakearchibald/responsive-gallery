# An experiment in clientside responsive imagery

I'm trying to come up with a solution which:

* Shows content without js
* Entirely clientside
* Keeps the media queries in CSS
* Fast enough to work on resize

However, this solution is dirty as hell, but it works.

# Usage

First, surround your image, or set of images with some dirty-magic script elements:

	<script class="responsive-gallery">document.write('<' + '!--')</script><noscript>
		<a href="http://www.flickr.com/photos/major_clanger/3690964841/">
			<img src="http://farm3.staticflickr.com/2624/3690964841_3f157fa6ba_t.jpg" alt="">
		</a>
	</noscript><!---->

Dirty isn't it? Anyway, then include responsiveGallery.js, and initialise your gallery:

	responsiveGallery({
		scriptClass: 'responsive-gallery',
		testClass: 'responsive-test',
		initialSuffix: '_t.jpg',
		suffixes: {
			'1': '_t.jpg',
			'2': '_m.jpg',
			'3': '.jpg'
		}
	});

This will create a test element on the page with class "responsive-test". When that element has a width of 1px, your images will have a suffix of "_t.jpg", when it has a width of 2px, your images will have a suffix of "_m.jpg". As you can see, you can change those to whatever you want.

Then in your CSS:

	.responsive-test {
		width: 1px;
	}
	@media all and (min-width: 640px) {
		.responsive-test {
			width: 2px;
		}
	}

Ohh it's so dirty. Yum yum.