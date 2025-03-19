"use strict";
(function () {
	// Global variables
	let
		userAgent = navigator.userAgent.toLowerCase(),
		isIE = userAgent.indexOf("msie") !== -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") !== -1 ? 11 : userAgent.indexOf("edge") !== -1 ? 12 : false;

	// Unsupported browsers
	if (isIE !== false && isIE < 12) {
		console.warn("[Core] detected IE" + isIE + ", load alert");
		var script = document.createElement("script");
		script.src = "./js/support.js";
		document.querySelector("head").appendChild(script);
	}

	let
		initialDate = new Date(),

		$document = $(document),
		$window = $(window),
		$html = $("html"),
		$body = $("body"),

		isDesktop = $html.hasClass("desktop"),
		isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
		windowReady = false,
		isNoviBuilder = false,
		livedemo = false,

		plugins = {
			bootstrapModal:          $( '.modal' ),
			bootstrapTabs:           $( '.tabs-custom' ),
			rdNavbar:                $( '.rd-navbar' ),
			materialParallax:        $( '.parallax-container' ),
			rdMailForm:              $( '.rd-mailform' ),
			rdInputLabel:            $( '.form-label' ),
			regula:                  $( '[data-constraints]' ),
			captcha:                 $('.recaptcha'),
			owl:                     $( '.owl-carousel' ),
			preloader:               $( '.preloader' ),
			swiper:                  $( '.swiper-slider' ),
			lightGallery:            $( "[data-lightgallery='group']" ),
			lightGalleryItem:        $( "[data-lightgallery='item']" ),
			lightDynamicGalleryItem: $( "[data-lightgallery='dynamic']" ),
			radio:                   $( "input[type='radio']"),
			customToggle:            $( '[data-custom-toggle]'),
			wow:                     $( '.wow' ),
			maps:                    $( '.google-map-container' ),
			rdAudioPlayer:           $( '.rd-audio'),
			slick:                   $( '.slick-slider' ),
			calendar:                $( '.rd-calendar'),
			bookingCalendar:         $( '.booking-calendar' ),
			copyrightYear:           $( '.copyright-year' ),
			counter:                 document.querySelectorAll('.counter'),
			progressLinear:          document.querySelectorAll('.progress-linear'),
			progressCircle:          document.querySelectorAll('.progress-circle'),
			countdown:               document.querySelectorAll('.countdown')
		};

	/**
	 * @desc Check the element was been scrolled into the view
	 * @param {object} elem - jQuery object
	 * @return {boolean}
	 */
	function isScrolledIntoView ( elem ) {
		if ( isNoviBuilder ) return true;
		return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
	}

	/**
	 * @desc Calls a function when element has been scrolled into the view
	 * @param {object} element - jQuery object
	 * @param {function} func - init function
	 */
	function lazyInit( element, func ) {
		var scrollHandler = function () {
			if ( ( !element.hasClass( 'lazy-loaded' ) && ( isScrolledIntoView( element ) ) ) ) {
				func.call( element );
				element.addClass( 'lazy-loaded' );
			}
		};

		scrollHandler();
		$window.on( 'scroll', scrollHandler );
	}

	// Initialize scripts that require a loaded window
	$window.on('load', function () {
		// Page loader
		if (plugins.preloader.length) {
			setTimeout(function () {
				plugins.preloader.addClass('loaded')}, 100
			)
		}
		
		// Counter
		if (plugins.counter) {
			for (let i = 0; i < plugins.counter.length; i++) {
				let
					node = plugins.counter[i],
					counter = aCounter({
						node:     node,
						duration: node.getAttribute('data-duration') || 1000
					}),
					scrollHandler = (function () {
						if (Util.inViewport(this) && !this.classList.contains('animated-first')) {
							this.counter.run();
							this.classList.add('animated-first');
						}
					}).bind(node),
					blurHandler = (function () {
						this.counter.params.to = parseInt(this.textContent, 10);
						this.counter.run();
					}).bind(node);
				
				if (isNoviBuilder) {
					node.counter.run();
					node.addEventListener('blur', blurHandler);
				} else {
					scrollHandler();
					window.addEventListener('scroll', scrollHandler);
				}
			}
		}
		
		// Progress Bar
		if (plugins.progressLinear) {
			for (let i = 0; i < plugins.progressLinear.length; i++) {
				let
					container = plugins.progressLinear[i],
					duration = container.getAttribute('data-duration') || 1000,
					bar = container.querySelector('.progress-linear-bar'),
					counter = aCounter({
						node:     container.querySelector('.progress-linear-counter'),
						duration: duration,
						onStart:  function () {
							this.custom.bar.style.width = this.params.to + '%';
						}
					});

				bar.style.transitionDuration = duration / 1000 + 's';
				counter.custom = {
					container: container,
					bar:       bar,
					onScroll:  (function () {
						if ((Util.inViewport(this.custom.container) && !this.custom.container.classList.contains('animated')) || isNoviBuilder) {
							this.run();
							this.custom.container.classList.add('animated');
						}
					}).bind(counter),
					onBlur:    (function () {
						this.params.to = parseInt(this.params.node.textContent, 10);
						this.run();
					}).bind(counter)
				};
				
				if (isNoviBuilder) {
					counter.run();
					counter.params.node.addEventListener('blur', counter.custom.onBlur);
				} else {
					counter.custom.onScroll();
					document.addEventListener('scroll', counter.custom.onScroll);
				}
			}
		}
		
		// Progress Circle
		if (plugins.progressCircle) {
			for (let i = 0; i < plugins.progressCircle.length; i++) {
				let
					container = plugins.progressCircle[i],
					counter = aCounter({
						node:     container.querySelector('.progress-circle-counter'),
						duration: 500,
						onUpdate: function (value) {
							this.custom.bar.render(value * 3.6);
						}
					});
				
				counter.params.onComplete = counter.params.onUpdate;
				
				counter.custom = {
					container: container,
					bar:       aProgressCircle({node: container.querySelector('.progress-circle-bar')}),
					onScroll:  (function () {
						if (Util.inViewport(this.custom.container) && !this.custom.container.classList.contains('animated')) {
							this.run();
							this.custom.container.classList.add('animated');
						}
					}).bind(counter),
					onBlur:    (function () {
						this.params.to = parseInt(this.params.node.textContent, 10);
						this.run();
					}).bind(counter)
				};
				
				if (isNoviBuilder) {
					counter.run();
					counter.params.node.addEventListener('blur', counter.custom.onBlur);
				} else {
					counter.custom.onScroll();
					window.addEventListener('scroll', counter.custom.onScroll);
				}
			}
		}
		

		// Material Parallax
		if ( plugins.materialParallax.length ) {
			if ( !isNoviBuilder && !isIE && !isMobile) {
				plugins.materialParallax.parallax();
			} else {
				for ( var i = 0; i < plugins.materialParallax.length; i++ ) {
					var $parallax = $(plugins.materialParallax[i]);

					$parallax.addClass( 'parallax-disabled' );
					$parallax.css({ "background-image": 'url('+ $parallax.data("parallax-img") +')' });
				}
			}
		}
	});
	
	function parseJSON ( str ) {
		try {
			if ( str )  return JSON.parse( str );
			else return {};
		} catch ( error ) {
			console.warn( error );
			return {};
		}
	}

	// Initialize scripts that require a finished document
	$(function () {
		isNoviBuilder = window.xMode;
		
		/**
		 * @desc Sets the actual previous index based on the position of the slide in the markup. Should be the most recent action.
		 * @param {object} swiper - swiper instance
		 */
		function setRealPrevious(swiper) {
			let element = swiper.$wrapperEl[0].children[swiper.activeIndex];
			swiper.realPrevious = Array.prototype.indexOf.call(element.parentNode.children, element);
		}
		
		/**
		 * @desc Sets slides background images from attribute 'data-slide-bg'
		 * @param {object} swiper - swiper instance
		 */
		function setBackgrounds(swiper) {
			let swipersBg = swiper.el.querySelectorAll('[data-slide-bg]');
			
			for (let i = 0; i < swipersBg.length; i++) {
				let swiperBg = swipersBg[i];
				swiperBg.style.backgroundImage = 'url(' + swiperBg.getAttribute('data-slide-bg') + ')';
			}
		}
		
		/**
		 * @desc Animate captions on active slides
		 * @param {object} swiper - swiper instance
		 */
		function initCaptionAnimate(swiper) {
			let
				animate = function (caption) {
					return function () {
						let duration;
						if (duration = caption.getAttribute('data-caption-duration')) caption.style.animationDuration = duration + 'ms';
						caption.classList.remove('not-animated');
						caption.classList.add(caption.getAttribute('data-caption-animate'));
						caption.classList.add('animated');
					};
				},
				initializeAnimation = function (captions) {
					for (let i = 0; i < captions.length; i++) {
						let caption = captions[i];
						caption.classList.remove('animated');
						caption.classList.remove(caption.getAttribute('data-caption-animate'));
						caption.classList.add('not-animated');
					}
				},
				finalizeAnimation = function (captions) {
					for (let i = 0; i < captions.length; i++) {
						let caption = captions[i];
						if (caption.getAttribute('data-caption-delay')) {
							setTimeout(animate(caption), Number(caption.getAttribute('data-caption-delay')));
						} else {
							animate(caption)();
						}
					}
				};
			
			// Caption parameters
			swiper.params.caption = {
				animationEvent: 'slideChangeTransitionEnd'
			};
			
			initializeAnimation(swiper.$wrapperEl[0].querySelectorAll('[data-caption-animate]'));
			finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll('[data-caption-animate]'));
			
			if (swiper.params.caption.animationEvent === 'slideChangeTransitionEnd') {
				swiper.on(swiper.params.caption.animationEvent, function () {
					initializeAnimation(swiper.$wrapperEl[0].children[swiper.previousIndex].querySelectorAll('[data-caption-animate]'));
					finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll('[data-caption-animate]'));
				});
			} else {
				swiper.on('slideChangeTransitionEnd', function () {
					initializeAnimation(swiper.$wrapperEl[0].children[swiper.previousIndex].querySelectorAll('[data-caption-animate]'));
				});
				
				swiper.on(swiper.params.caption.animationEvent, function () {
					finalizeAnimation(swiper.$wrapperEl[0].children[swiper.activeIndex].querySelectorAll('[data-caption-animate]'));
				});
			}
		}
		
		// Owl carousel
		if (plugins.owl.length) {
			for (let i = 0; i < plugins.owl.length; i++) {
				let
					node = plugins.owl[i],
					params = parseJSON( node.getAttribute( 'data-owl' ) ),
					defaults = {
						items: 1,
						margin: 30,
						loop: true,
						mouseDrag: true,
						stagePadding: 0,
						nav: false,
						navText: [],
						dots: false,
						autoplay: true,
						autoplayTimeout: 300,
						autoplayHoverPause: true
					},
					xMode = {
						autoplay: false,
						loop: false,
						mouseDrag: false
					},
					generated = {
						autoplay: node.getAttribute( 'data-autoplay' ) !== 'false',
						loop: node.getAttribute( 'data-loop' ) !== 'false',
						mouseDrag: node.getAttribute( 'data-mouse-drag' ) !== 'false',
						responsive: {}
					},
					aliases = [ '-', '-sm-', '-md-', '-lg-', '-xl-', '-xxl-' ],
					values =  [ 0, 576, 768, 992, 1200, 1600 ],
					responsive = generated.responsive;
				
				for ( let j = 0; j < values.length; j++ ) {
					responsive[ values[ j ] ] = {};
					
					for ( let k = j; k >= -1; k-- ) {
						if ( !responsive[ values[ j ] ][ 'items' ] && node.getAttribute( 'data' + aliases[ k ] + 'items' ) ) {
							responsive[ values[ j ] ][ 'items' ] = k < 0 ? 1 : parseInt( node.getAttribute( 'data' + aliases[ k ] + 'items' ), 10 );
						}
						if ( !responsive[ values[ j ] ][ 'stagePadding' ] && responsive[ values[ j ] ][ 'stagePadding' ] !== 0 && node.getAttribute( 'data' + aliases[ k ] + 'stage-padding' ) ) {
							responsive[ values[ j ] ][ 'stagePadding' ] = k < 0 ? 0 : parseInt( node.getAttribute( 'data' + aliases[ k ] + 'stage-padding' ), 10 );
						}
						if ( !responsive[ values[ j ] ][ 'margin' ] && responsive[ values[ j ] ][ 'margin' ] !== 0 && node.getAttribute( 'data' + aliases[ k ] + 'margin' ) ) {
							responsive[ values[ j ] ][ 'margin' ] = k < 0 ? 30 : parseInt( node.getAttribute( 'data' + aliases[ k ] + 'margin' ), 10 );
						}
					}
				}
				
				// Initialize lightgallery items in cloned owl items
				$(node).on('initialized.owl.carousel', function () {
					initLightGalleryItem($(node).find('[data-lightgallery="item"]'), 'lightGallery-in-carousel');
				});
				
				node.owl = $( node );
				$( node ).owlCarousel( Util.merge( isNoviBuilder ? [ defaults, params, generated, xMode ] : [ defaults, params, generated ] ) );
			}
		}

		

		/**
		 * @desc Attach form validation to elements
		 * @param {object} elements - jQuery object
		 */
		function attachFormValidator(elements) {
			// Custom validator - phone number
			regula.custom({
				name: 'PhoneNumber',
				defaultMessage: 'Invalid phone number format',
				validator: function() {
					if ( this.value === '' ) return true;
					else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( this.value );
				}
			});

			for (var i = 0; i < elements.length; i++) {
				var o = $(elements[i]), v;
				o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
				v = o.parent().find(".form-validation");
				if (v.is(":last-child")) o.addClass("form-control-last-child");
			}

			elements.on('input change propertychange blur', function (e) {
				var $this = $(this), results;

				if (e.type !== "blur") if (!$this.parent().hasClass("has-error")) return;
				if ($this.parents('.rd-mailform').hasClass('success')) return;

				if (( results = $this.regula('validate') ).length) {
					for (i = 0; i < results.length; i++) {
						$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
					}
				} else {
					$this.siblings(".form-validation").text("").parent().removeClass("has-error")
				}
			}).regula('bind');

			var regularConstraintsMessages = [
				{
					type: regula.Constraint.Required,
					newMessage: "The text field is required."
				},
				{
					type: regula.Constraint.Email,
					newMessage: "The email is not a valid email."
				},
				{
					type: regula.Constraint.Numeric,
					newMessage: "Only numbers are required"
				},
				{
					type: regula.Constraint.Selected,
					newMessage: "Please choose an option."
				}
			];


			for (var i = 0; i < regularConstraintsMessages.length; i++) {
				var regularConstraint = regularConstraintsMessages[i];

				regula.override({
					constraintType: regularConstraint.type,
					defaultMessage: regularConstraint.newMessage
				});
			}
		}

		/**
		 * @desc Check if all elements pass validation
		 * @param {object} elements - object of items for validation
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function isValidated(elements, captcha) {
			var results, errors = 0;

			if (elements.length) {
				for (var j = 0; j < elements.length; j++) {

					var $input = $(elements[j]);
					if ((results = $input.regula('validate')).length) {
						for (k = 0; k < results.length; k++) {
							errors++;
							$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
						}
					} else {
						$input.siblings(".form-validation").text("").parent().removeClass("has-error")
					}
				}

				if (captcha) {
					if (captcha.length) {
						return validateReCaptcha(captcha) && errors === 0
					}
				}

				return errors === 0;
			}
			return true;
		}

		/**
		 * @desc Validate google reCaptcha
		 * @param {object} captcha - captcha object for validation
		 * @return {boolean}
		 */
		function validateReCaptcha(captcha) {
			let captchaToken = captcha.find('.g-recaptcha-response').val();

			if (captchaToken.length === 0) {
				captcha
				.siblings('.form-validation')
				.html('Please, prove that you are not robot.')
				.addClass('active');
				captcha
				.closest('.form-wrap')
				.addClass('has-error');

				captcha.on('propertychange', function () {
					let $this = $(this),
							captchaToken = $this.find('.g-recaptcha-response').val();

					if (captchaToken.length > 0) {
						$this
						.closest('.form-wrap')
						.removeClass('has-error');
						$this
						.siblings('.form-validation')
						.removeClass('active')
						.html('');
						$this.off('propertychange');
					}
				});

				return false;
			}

			return true;
		}

		/**
		 * @desc Initialize Google reCaptcha
		 */
		window.onloadCaptchaCallback = function () {
			for (let i = 0; i < plugins.captcha.length; i++) {
				let
						$captcha = $(plugins.captcha[i]),
						resizeHandler = (function () {
							let
									frame = this.querySelector('iframe'),
									inner = this.firstElementChild,
									inner2 = inner.firstElementChild,
									containerRect = null,
									frameRect = null,
									scale = null;

							inner2.style.transform = '';
							inner.style.height = 'auto';
							inner.style.width = 'auto';

							containerRect = this.getBoundingClientRect();
							frameRect = frame.getBoundingClientRect();
							scale = containerRect.width / frameRect.width;

							if (scale < 1) {
								inner2.style.transform = 'scale(' + scale + ')';
								inner.style.height = (frameRect.height * scale) + 'px';
								inner.style.width = (frameRect.width * scale) + 'px';
							}
						}).bind(plugins.captcha[i]);

				grecaptcha.render(
						$captcha.attr('id'),
						{
							sitekey:  $captcha.attr('data-sitekey'),
							size:     $captcha.attr('data-size') ? $captcha.attr('data-size') : 'normal',
							theme:    $captcha.attr('data-theme') ? $captcha.attr('data-theme') : 'light',
							callback: function () {
								$('.recaptcha').trigger('propertychange');
							}
						}
				);

				$captcha.after("<span class='form-validation'></span>");

				if (plugins.captcha[i].hasAttribute('data-auto-size')) {
					resizeHandler();
					window.addEventListener('resize', resizeHandler);
				}
			}
		};

		/**
		 * @desc Initialize the gallery with set of images
		 * @param {object} itemsToInit - jQuery object
		 * @param {string} [addClass] - additional gallery class
		 */
		function initLightGallery ( itemsToInit, addClass ) {
			if ( !isNoviBuilder ) {
				$( itemsToInit ).lightGallery( {
					thumbnail: $( itemsToInit ).attr( "data-lg-thumbnail" ) !== "false",
					selector: "[data-lightgallery='item']",
					autoplay: $( itemsToInit ).attr( "data-lg-autoplay" ) === "true",
					pause: parseInt( $( itemsToInit ).attr( "data-lg-autoplay-delay" ) ) || 5000,
					addClass: addClass,
					mode: $( itemsToInit ).attr( "data-lg-animation" ) || "lg-slide",
					loop: $( itemsToInit ).attr( "data-lg-loop" ) !== "false"
				} );
			}
		}

		/**
		 * @desc Initialize the gallery with dynamic addition of images
		 * @param {object} itemsToInit - jQuery object
		 * @param {string} [addClass] - additional gallery class
		 */
		function initDynamicLightGallery ( itemsToInit, addClass ) {
			if ( !isNoviBuilder ) {
				$( itemsToInit ).on( "click", function () {
					$( itemsToInit ).lightGallery( {
						thumbnail: $( itemsToInit ).attr( "data-lg-thumbnail" ) !== "false",
						selector: "[data-lightgallery='item']",
						autoplay: $( itemsToInit ).attr( "data-lg-autoplay" ) === "true",
						pause: parseInt( $( itemsToInit ).attr( "data-lg-autoplay-delay" ) ) || 5000,
						addClass: addClass,
						mode: $( itemsToInit ).attr( "data-lg-animation" ) || "lg-slide",
						loop: $( itemsToInit ).attr( "data-lg-loop" ) !== "false",
						dynamic: true,
						dynamicEl: JSON.parse( $( itemsToInit ).attr( "data-lg-dynamic-elements" ) ) || []
					} );
				} );
			}
		}

		/**
		 * @desc Initialize the gallery with one image
		 * @param {object} itemToInit - jQuery object
		 * @param {string} [addClass] - additional gallery class
		 */
		function initLightGalleryItem ( itemToInit, addClass ) {
			if ( !isNoviBuilder ) {
				$( itemToInit ).lightGallery( {
					selector: "this",
					addClass: addClass,
					counter: false,
					youtubePlayerParams: {
						modestbranding: 1,
						showinfo: 0,
						rel: 0,
						controls: 0
					},
					vimeoPlayerParams: {
						byline: 0,
						portrait: 0
					}
				} );
			}
		}

		/**
		 * @desc Google map function for getting latitude and longitude
		 */
		function getLatLngObject(str, marker, map, callback) {
			var coordinates = {};
			try {
				coordinates = JSON.parse(str);
				callback(new google.maps.LatLng(
					coordinates.lat,
					coordinates.lng
				), marker, map)
			} catch (e) {
				map.geocoder.geocode({'address': str}, function (results, status) {
					if (status === google.maps.GeocoderStatus.OK) {
						var latitude = results[0].geometry.location.lat();
						var longitude = results[0].geometry.location.lng();

						callback(new google.maps.LatLng(
							parseFloat(latitude),
							parseFloat(longitude)
						), marker, map)
					}
				})
			}
		}

		/**
		 * @desc Initialize Google maps
		 */
		function initMaps() {
			var key;

			for ( var i = 0; i < plugins.maps.length; i++ ) {
				if ( plugins.maps[i].hasAttribute( "data-key" ) ) {
					key = plugins.maps[i].getAttribute( "data-key" );
					break;
				}
			}

			$.getScript('//maps.google.com/maps/api/js?'+ ( key ? 'key='+ key + '&' : '' ) +'sensor=false&libraries=geometry,places&v=quarterly', function () {
				var geocoder = new google.maps.Geocoder;
				for (var i = 0; i < plugins.maps.length; i++) {
					var zoom = parseInt(plugins.maps[i].getAttribute("data-zoom"), 10) || 11;
					var styles = plugins.maps[i].hasAttribute('data-styles') ? JSON.parse(plugins.maps[i].getAttribute("data-styles")) : [];
					var center = plugins.maps[i].getAttribute("data-center") || "New York";

					// Initialize map
					var map = new google.maps.Map(plugins.maps[i].querySelectorAll(".google-map")[0], {
						zoom: zoom,
						styles: styles,
						scrollwheel: false,
						center: {lat: 0, lng: 0}
					});

					// Add map object to map node
					plugins.maps[i].map = map;
					plugins.maps[i].geocoder = geocoder;
					plugins.maps[i].keySupported = true;
					plugins.maps[i].google = google;

					// Get Center coordinates from attribute
					getLatLngObject(center, null, plugins.maps[i], function (location, markerElement, mapElement) {
						mapElement.map.setCenter(location);
					});

					// Add markers from google-map-markers array
					var markerItems = plugins.maps[i].querySelectorAll(".google-map-markers li");

					if (markerItems.length){
						var markers = [];
						for (var j = 0; j < markerItems.length; j++){
							var markerElement = markerItems[j];
							getLatLngObject(markerElement.getAttribute("data-location"), markerElement, plugins.maps[i], function(location, markerElement, mapElement){
								var icon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
								var activeIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active");
								var info = markerElement.getAttribute("data-description") || "";
								var infoWindow = new google.maps.InfoWindow({
									content: info
								});
								markerElement.infoWindow = infoWindow;
								var markerData = {
									position: location,
									map: mapElement.map
								}
								if (icon){
									markerData.icon = icon;
								}
								var marker = new google.maps.Marker(markerData);
								markerElement.gmarker = marker;
								markers.push({markerElement: markerElement, infoWindow: infoWindow});
								marker.isActive = false;
								// Handle infoWindow close click
								google.maps.event.addListener(infoWindow,'closeclick',(function(markerElement, mapElement){
									var markerIcon = null;
									markerElement.gmarker.isActive = false;
									markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon");
									markerElement.gmarker.setIcon(markerIcon);
								}).bind(this, markerElement, mapElement));


								// Set marker active on Click and open infoWindow
								google.maps.event.addListener(marker, 'click', (function(markerElement, mapElement) {
									if (markerElement.infoWindow.getContent().length === 0) return;
									var gMarker, currentMarker = markerElement.gmarker, currentInfoWindow;
									for (var k =0; k < markers.length; k++){
										var markerIcon;
										if (markers[k].markerElement === markerElement){
											currentInfoWindow = markers[k].infoWindow;
										}
										gMarker = markers[k].markerElement.gmarker;
										if (gMarker.isActive && markers[k].markerElement !== markerElement){
											gMarker.isActive = false;
											markerIcon = markers[k].markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")
											gMarker.setIcon(markerIcon);
											markers[k].infoWindow.close();
										}
									}

									currentMarker.isActive = !currentMarker.isActive;
									if (currentMarker.isActive) {
										if (markerIcon = markerElement.getAttribute("data-icon-active") || mapElement.getAttribute("data-icon-active")){
											currentMarker.setIcon(markerIcon);
										}

										currentInfoWindow.open(map, marker);
									}else{
										if (markerIcon = markerElement.getAttribute("data-icon") || mapElement.getAttribute("data-icon")){
											currentMarker.setIcon(markerIcon);
										}
										currentInfoWindow.close();
									}
								}).bind(this, markerElement, mapElement))
							})
						}
					}
				}
			});
		}

		// Additional class on html if mac os.
		if (navigator.platform.match(/(Mac)/i)) {
			$html.addClass("mac-os");
		}

		// Adds some loosing functionality to IE browsers (IE Polyfills)
		if (isIE) {
			if (isIE === 12) $html.addClass("ie-edge");
			if (isIE === 11) $html.addClass("ie-11");
			if (isIE < 10) $html.addClass("lt-ie-10");
			if (isIE < 11) $html.addClass("ie-10");
		}

		// Bootstrap Modal
		if (plugins.bootstrapModal.length) {
			for (var i = 0; i < plugins.bootstrapModal.length; i++) {
				var modalItem = $(plugins.bootstrapModal[i]);

				modalItem.on('hidden.bs.modal', $.proxy(function () {
					var activeModal = $(this),
						rdVideoInside = activeModal.find('video'),
						youTubeVideoInside = activeModal.find('iframe');

					if (rdVideoInside.length) {
						rdVideoInside[0].pause();
					}

					if (youTubeVideoInside.length) {
						var videoUrl = youTubeVideoInside.attr('src');

						youTubeVideoInside
							.attr('src', '')
							.attr('src', videoUrl);
					}
				}, modalItem))
			}
		}

		// Bootstrap tabs
		if (plugins.bootstrapTabs.length) {
			for (var i = 0; i < plugins.bootstrapTabs.length; i++) {
				var bootstrapTab = $(plugins.bootstrapTabs[i]);

				//If have slick carousel inside tab - resize slick carousel on click
				if (bootstrapTab.find('.slick-slider').length) {
					bootstrapTab.find('.tabs-custom-list > li > a').on('click', $.proxy(function () {
						var $this = $(this);
						var setTimeOutTime = isNoviBuilder ? 1500 : 300;

						setTimeout(function () {
							$this.find('.tab-content .tab-pane.active .slick-slider').slick('setPosition');
						}, setTimeOutTime);
					}, bootstrapTab));
				}

				plugins.bootstrapTabs[i].querySelectorAll( '.nav li a' ).forEach( function( tab, index ) {
					if ( index === 0 ) {
						tab.parentElement.classList.remove( 'active' );
						$( tab ).tab( 'show' );
					}

					tab.addEventListener( 'click', function( event ) {
						event.preventDefault();
						$( this ).tab( 'show' );
					});
				});
			}
		}

		// Copyright Year (Evaluates correct copyright year)
		if (plugins.copyrightYear.length) {
			plugins.copyrightYear.text(initialDate.getFullYear());
		}

		// Google maps
		if( plugins.maps.length ) {
			lazyInit( plugins.maps, initMaps );
		}

		// Add custom styling options for input[type="radio"]
		if (plugins.radio.length) {
			for (var i = 0; i < plugins.radio.length; i++) {
				$(plugins.radio[i]).addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
			}
		}

		// UI To Top
		if (isDesktop && !isNoviBuilder) {
			$().UItoTop({
				easingType: 'easeOutQuad',
				containerClass: 'ui-to-top fa fa-angle-up'
			});
		}

		// RD Navbar
		if ( plugins.rdNavbar.length ) {
			var
				navbar = plugins.rdNavbar,
				aliases = { '-': 0, '-sm-': 576, '-md-': 768, '-lg-': 992, '-xl-': 1200, '-xxl-': 1600 },
				responsive = {};

			for ( var alias in aliases ) {
				var link = responsive[ aliases[ alias ] ] = {};
				if ( navbar.attr( 'data'+ alias +'layout' ) )          link.layout        = navbar.attr( 'data'+ alias +'layout' );
				if ( navbar.attr( 'data'+ alias +'device-layout' ) )   link.deviceLayout  = navbar.attr( 'data'+ alias +'device-layout' );
				if ( navbar.attr( 'data'+ alias +'hover-on' ) )        link.focusOnHover  = navbar.attr( 'data'+ alias +'hover-on' ) === 'true';
				if ( navbar.attr( 'data'+ alias +'auto-height' ) )     link.autoHeight    = navbar.attr( 'data'+ alias +'auto-height' ) === 'true';
				if ( navbar.attr( 'data'+ alias +'stick-up-offset' ) ) link.stickUpOffset = navbar.attr( 'data'+ alias +'stick-up-offset' );
				if ( navbar.attr( 'data'+ alias +'stick-up' ) )        link.stickUp       = navbar.attr( 'data'+ alias +'stick-up' ) === 'true';
				if ( isNoviBuilder ) link.stickUp = false;
				else if ( navbar.attr( 'data'+ alias +'stick-up' ) )   link.stickUp       = navbar.attr( 'data'+ alias +'stick-up' ) === 'true';
			}

			plugins.rdNavbar.RDNavbar({
				anchorNav: !isNoviBuilder,
				stickUpClone: (plugins.rdNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? plugins.rdNavbar.attr("data-stick-up-clone") === 'true' : false,
				responsive: responsive,
				callbacks: {
					onStuck: function () {
						var navbarSearch = this.$element.find('.rd-search input');

						if (navbarSearch) {
							navbarSearch.val('').trigger('propertychange');
						}
					},
					onDropdownOver: function () {
						return !isNoviBuilder;
					},
					onUnstuck: function () {
						if (this.$clone === null)
							return;

						var navbarSearch = this.$clone.find('.rd-search input');

						if (navbarSearch) {
							navbarSearch.val('').trigger('propertychange');
							navbarSearch.trigger('blur');
						}

					}
				}
			});

			if (plugins.rdNavbar.attr("data-body-class")) {
				document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
			}
		}

		
		
		// Swiper
		if (plugins.swiper.length) {
			
			for (let i = 0; i < plugins.swiper.length; i++) {
				
				let
					node = plugins.swiper[i],
					params = parseJSON(node.getAttribute('data-swiper')),
					defaults = {
						speed:      1000,
						loop:       true,
						pagination: {
							el:        '.swiper-pagination',
							clickable: true
						},
						navigation: {
							nextEl: '.swiper-button-next',
							prevEl: '.swiper-button-prev'
						},
						autoplay:   {
							delay: 5000
						}
					},
					xMode = {
						autoplay:      false,
						loop:          false,
						simulateTouch: false
					};
				
				params.on = {
					init: function () {
						setBackgrounds(this);
						setRealPrevious(this);
						initCaptionAnimate(this);
						
						// Real Previous Index must be set recent
						this.on('slideChangeTransitionEnd', function () {
							setRealPrevious(this);
						});
					}
				};
				
				new Swiper( node, Util.merge( isNoviBuilder ? [ defaults, params, xMode ] : [ defaults, params ] ) );
			}
		}

		// Owl carousel
		if ( plugins.owl.length ) {
			for ( var i = 0; i < plugins.owl.length; i++ ) {
				var carousel = $( plugins.owl[ i ] );
				plugins.owl[ i ].owl = carousel;
			}
		}
		
		// lightGallery item
		if (plugins.lightGalleryItem.length) {
			// Filter carousel items
			let notCarouselItems = [];
			
			for (let z = 0; z < plugins.lightGalleryItem.length; z++) {
				if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
					!$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
					!$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
					notCarouselItems.push(plugins.lightGalleryItem[z]);
				}
			}
			
			plugins.lightGalleryItem = notCarouselItems;
			
			for (let i = 0; i < plugins.lightGalleryItem.length; i++) {
				initLightGalleryItem(plugins.lightGalleryItem[i]);
			}
		}
		
		// Dynamic lightGallery
		if (plugins.lightDynamicGalleryItem.length) {
			for (let i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
				initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
			}
		}

		// WOW
		if ($html.hasClass("wow-animation") && plugins.wow.length && !isNoviBuilder && isDesktop) {
			new WOW().init();
		}

		// RD Input Label
		if (plugins.rdInputLabel.length) {
			plugins.rdInputLabel.RDInputLabel();
		}

		// Regula
		if (plugins.regula.length) {
			attachFormValidator(plugins.regula);
		}

		// RD Mailform
		if (plugins.rdMailForm.length) {
			var i, j, k,
				msg = {
					'MF000': 'Successfully sent!',
					'MF001': 'Recipients are not set!',
					'MF002': 'Form will not work locally!',
					'MF003': 'Please, define email field in your form!',
					'MF004': 'Please, define type of your form!',
					'MF254': 'Something went wrong with PHPMailer!',
					'MF255': 'Aw, snap! Something went wrong.'
				};

			for (i = 0; i < plugins.rdMailForm.length; i++) {
				var $form = $(plugins.rdMailForm[i]),
					formHasCaptcha = false;

				$form.attr('novalidate', 'novalidate').ajaxForm({
					data: {
						"form-type": $form.attr("data-form-type") || "contact",
						"counter": i
					},
					beforeSubmit: function (arr, $form, options) {
						if (isNoviBuilder)
							return;

						var form = $(plugins.rdMailForm[this.extraData.counter]),
							inputs = form.find("[data-constraints]"),
							output = $("#" + form.attr("data-form-output")),
							captcha = form.find('.recaptcha'),
							captchaFlag = true;

						output.removeClass("active error success");

						if (isValidated(inputs, captcha)) {

							// veify reCaptcha
							if (captcha.length) {
								var captchaToken = captcha.find('.g-recaptcha-response').val(),
									captchaMsg = {
										'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
										'CPT002': 'Something wrong with google reCaptcha'
									};

								formHasCaptcha = true;

								$.ajax({
									method: "POST",
									url: "bat/reCaptcha.php",
									data: {'g-recaptcha-response': captchaToken},
									async: false
								})
									.done(function (responceCode) {
										if (responceCode !== 'CPT000') {
											if (output.hasClass("snackbars")) {
												output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

												setTimeout(function () {
													output.removeClass("active");
												}, 3500);

												captchaFlag = false;
											} else {
												output.html(captchaMsg[responceCode]);
											}

											output.addClass("active");
										}
									});
							}

							if (!captchaFlag) {
								return false;
							}

							form.addClass('form-in-process');

							if (output.hasClass("snackbars")) {
								output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
								output.addClass("active");
							}
						} else {
							return false;
						}
					},
					error: function (result) {
						if (isNoviBuilder)
							return;

						var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
							form = $(plugins.rdMailForm[this.extraData.counter]);

						output.text(msg[result]);
						form.removeClass('form-in-process');

						if (formHasCaptcha) {
							grecaptcha.reset();
						}
					},
					success: function (result) {
						if (isNoviBuilder)
							return;

						var form = $(plugins.rdMailForm[this.extraData.counter]),
							output = $("#" + form.attr("data-form-output")),
							select = form.find('select');

						form
							.addClass('success')
							.removeClass('form-in-process');

						if (formHasCaptcha) {
							grecaptcha.reset();
						}

						result = result.length === 5 ? result : 'MF255';
						output.text(msg[result]);

						if (result === "MF000") {
							if (output.hasClass("snackbars")) {
								output.html('<p><span class="icon text-middle mdi mdi-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
							} else {
								output.addClass("active success");
							}
						} else {
							if (output.hasClass("snackbars")) {
								output.html(' <p class="snackbars-left"><span class="icon icon-xxs mdi mdi-alert-outline text-middle"></span><span>' + msg[result] + '</span></p>');
							} else {
								output.addClass("active error");
							}
						}

						form.clearForm();

						if (select.length) {
							select.select2("val", "");
						}

						form.find('input, textarea').trigger('blur');

						setTimeout(function () {
							output.removeClass("active error success");
							form.removeClass('success');
						}, 3500);
					}
				});
			}
		}

		// lightGallery
		if (plugins.lightGallery.length) {
			for (var i = 0; i < plugins.lightGallery.length; i++) {
				initLightGallery(plugins.lightGallery[i]);
			}
		}

		// lightGallery item
		if (plugins.lightGalleryItem.length) {
			// Filter carousel items
			var notCarouselItems = [];

			for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
				if (!$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
					!$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
					!$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
					notCarouselItems.push(plugins.lightGalleryItem[z]);
				}
			}

			plugins.lightGalleryItem = notCarouselItems;

			for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
				initLightGalleryItem(plugins.lightGalleryItem[i]);
			}
		}

		// Dynamic lightGallery
		if (plugins.lightDynamicGalleryItem.length) {
			for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
				initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
			}
		}

		// Custom Toggles
		if (plugins.customToggle.length) {
			for (var i = 0; i < plugins.customToggle.length; i++) {
				var $this = $(plugins.customToggle[i]);

				$this.on('click', $.proxy(function (event) {
					event.preventDefault();

					var $ctx = $(this);
					$($ctx.attr('data-custom-toggle')).add(this).toggleClass('active');
				}, $this));

				if ($this.attr("data-custom-toggle-hide-on-blur") === "true") {
					$body.on("click", $this, function (e) {
						if (e.target !== e.data[0]
							&& $(e.data.attr('data-custom-toggle')).find($(e.target)).length
							&& e.data.find($(e.target)).length === 0) {
							$(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
						}
					})
				}

				if ($this.attr("data-custom-toggle-disable-on-blur") === "true") {
					$body.on("click", $this, function (e) {
						if (e.target !== e.data[0] && $(e.data.attr('data-custom-toggle')).find($(e.target)).length === 0 && e.data.find($(e.target)).length === 0) {
							$(e.data.attr('data-custom-toggle')).add(e.data[0]).removeClass('active');
						}
					})
				}
			}
		}
		

		// Slick carousel
		if (plugins.slick.length) {
			for (var i = 0; i < plugins.slick.length; i++) {
				var $slickItem = $(plugins.slick[i]);

				$slickItem.on('init', function (slick) {
					initLightGallery($('[data-lightgallery="group-slick"]'), 'lightGallery-in-carousel');
					initLightGallery($('[data-lightgallery="item-slick"]'), 'lightGallery-in-carousel');
				});

				$slickItem.slick({
					slidesToScroll: parseInt($slickItem.attr('data-slide-to-scroll'), 10) || 1,
					asNavFor: $slickItem.attr('data-for') || false,
					dots: $slickItem.attr("data-dots") === "true",
					infinite:  isNoviBuilder ? false : $slickItem.attr("data-loop") === "true",
					focusOnSelect: true,
					arrows: $slickItem.attr("data-arrows") === "true",
					swipe: $slickItem.attr("data-swipe") === "true",
					autoplay: $slickItem.attr("data-autoplay") === "true",
					centerMode: $slickItem.attr("data-center-mode") === "true",
					centerPadding: $slickItem.attr("data-center-padding") ? $slickItem.attr("data-center-padding") : '0.50',
					mobileFirst: true,
					nextArrow: '<button type="button" class="slick-next"></button>',
					prevArrow: '<button type="button" class="slick-prev"></button>',
					responsive: [
						{
							breakpoint: 0,
							settings: {
								slidesToShow: parseInt($slickItem.attr('data-items'), 10) || 1,
								vertical: $slickItem.attr('data-vertical') === 'true' || false
							}
						},
						{
							breakpoint: 575,
							settings: {
								slidesToShow: parseInt($slickItem.attr('data-sm-items'), 10) || 1,
								vertical: $slickItem.attr('data-sm-vertical') === 'true' || false
							}
						},
						{
							breakpoint: 767,
							settings: {
								slidesToShow: parseInt($slickItem.attr('data-md-items'), 10) || 1,
								vertical: $slickItem.attr('data-md-vertical') === 'true' || false
							}
						},
						{
							breakpoint: 991,
							settings: {
								slidesToShow: parseInt($slickItem.attr('data-lg-items'), 10) || 1,
								vertical: $slickItem.attr('data-lg-vertical') === 'true' || false
							}
						},
						{
							breakpoint: 1199,
							settings: {
								slidesToShow: parseInt($slickItem.attr('data-xl-items'), 10) || 1,
								vertical: $slickItem.attr('data-xl-vertical') === 'true' || false
							}
						}
					]
				})
					.on('afterChange', function (event, slick, currentSlide, nextSlide) {
						var $this = $(this),
							childCarousel = $this.attr('data-child');

						if (childCarousel) {
							$(childCarousel + ' .slick-slide').removeClass('slick-current');
							$(childCarousel + ' .slick-slide').eq(currentSlide).addClass('slick-current');
						}
					});

			}
		}
		

		// RD Audio player
		if (plugins.rdAudioPlayer.length && !isNoviBuilder) {
			var i;
			for (i = 0; i < plugins.rdAudioPlayer.length; i++) {
				$(plugins.rdAudioPlayer[i]).RDAudio();
			}
		}

		// RD Calendar
		if (plugins.calendar.length) {
			var i;
			for (i = 0; i < plugins.calendar.length; i++) {
				var calendarItem = $(plugins.calendar[i]);

				calendarItem.rdCalendar({
					days: calendarItem.attr("data-days") ? calendarItem.attr("data-days").split(/\s?,\s?/i) : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					month: calendarItem.attr("data-months") ? calendarItem.attr("data-months").split(/\s?,\s?/i) : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
				});
			}
		}

		// Booking Calendar
		if (plugins.bookingCalendar.length) {
			var i;
			for (i = 0; i < plugins.bookingCalendar.length; i++) {
				var calendarItem = $(plugins.bookingCalendar[i]);

				calendarItem.rdCalendar({
					days: calendarItem.attr("data-days") ? calendarItem.attr("data-days").split(/\s?,\s?/i) : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					month: calendarItem.attr("data-months") ? calendarItem.attr("data-months").split(/\s?,\s?/i) : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
				});

				var temp = $('.rdc-table_has-events');

				for (i = 0; i < temp.length; i++) {
					var $this = $(temp[i]);

					$this.on("click", i, function (event) {
						event.preventDefault();
						event.stopPropagation();

						$(this).toggleClass("opened");

						var tableEvents = $('.rdc-table_events'),
							ch = tableEvents.outerHeight(),
							currentEvent = $(this).children('.rdc-table_events'),
							eventCell = $('#calendarEvent' + event.data),
							animationDuration = 250;

						if ($(this).hasClass("opened")) {

							$(this).parent().after("<tr id='calendarEvent" + event.data + "' style='height: 0'><td colspan='7'></td></tr>");
							currentEvent.clone().appendTo($('#calendarEvent' + event.data + ' td'));
							$('#calendarEvent' + event.data + ' .rdc-table_events').css("height", "0");
							$('#calendarEvent' + event.data + ' .rdc-table_events').animate({height: ch + "px"}, animationDuration);

						} else {
							$('#calendarEvent' + event.data + ' .rdc-table_events').animate({height: "0"}, animationDuration);

							setTimeout(function () {
								eventCell.remove();
							}, animationDuration);

						}
					});
				}
				;

				$(window).on('resize', function () {
					if ($('.rdc-table_has-events').hasClass('active')) {
						var tableEvents = $('.rdc-table_events'),
							ch = tableEvents.outerHeight(),
							tableEventCounter = $('.rdc-table_events-count');
						tableEventCounter.css({
							height: ch + 'px'
						});
					}
				});

				$('input[type="radio"]').on("click", function () {
					if ($(this).attr("value") == "register") {
						$(".register-form").hide();
						$(".login-form").fadeIn('slow');
					}
					if ($(this).attr("value") == "login") {
						$(".register-form").fadeIn('slow');
						$(".login-form").hide();
					}
				});

				$('.rdc-next, .rdc-prev').on("click", function () {
					var temp = $('.rdc-table_has-events');

					for (i = 0; i < temp.length; i++) {
						var $this = $(temp[i]);

						$this.on("click", i, function (event) {
							event.preventDefault();
							event.stopPropagation();

							$(this).toggleClass("opened");

							var tableEvents = $('.rdc-table_events'),
								ch = tableEvents.outerHeight(),
								currentEvent = $(this).children('.rdc-table_events'),
								eventCell = $('#calendarEvent' + event.data),
								animationDuration = 250;

							if ($(this).hasClass("opened")) {

								$(this).parent().after("<tr id='calendarEvent" + event.data + "' style='height: 0'><td colspan='7'></td></tr>");
								currentEvent.clone().appendTo($('#calendarEvent' + event.data + ' td'));
								$('#calendarEvent' + event.data + ' .rdc-table_events').css("height", "0");
								$('#calendarEvent' + event.data + ' .rdc-table_events').animate({height: ch + "px"}, animationDuration);

							} else {
								$('#calendarEvent' + event.data + ' .rdc-table_events').animate({height: "0"}, animationDuration);

								setTimeout(function () {
									eventCell.remove();
								}, animationDuration);

							}
						});
					}
					;

					$(window).on('resize', function () {
						if ($('.rdc-table_has-events').hasClass('active')) {
							var tableEvents = $('.rdc-table_events'),
								ch = tableEvents.outerHeight(),
								tableEventCounter = $('.rdc-table_events-count');
							tableEventCounter.css({
								height: ch + 'px'
							});
						}
					});

					$('input[type="radio"]').on("click", function () {
						if ($(this).attr("value") == "login") {
							$(".register-form").hide();
							$(".login-form").fadeIn('slow');
						}
						if ($(this).attr("value") == "register") {
							$(".register-form").fadeIn('slow');
							$(".login-form").hide();
						}
					});
				});
			}
		}

		// Google ReCaptcha
		if (plugins.captcha.length) {
			$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
		}
		
		// Countdown
		if (plugins.countdown.length) {
			for (let i = 0; i < plugins.countdown.length; i++) {
				let
					node = plugins.countdown[i],
					countdown = aCountdown({
						node:  node,
						from:  node.getAttribute('data-from'),
						to:    node.getAttribute('data-to'),
						count: node.getAttribute('data-count'),
						tick:  100,
					});
			}
		}
	});
}());
document.addEventListener("DOMContentLoaded", function() {
    const choices = document.querySelectorAll(".choice");

    choices.forEach(choice => {
      choice.addEventListener("click", function() {
        // Retirer la classe "active" de toutes les options
        choices.forEach(c => c.classList.remove("active"));

        // Ajouter la classe "active" à l'élément cliqué
        this.classList.add("active");
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    // Gérer le menu mobile
    const menuToggle = document.querySelector(".menu-toggle");
    const navbarMenu = document.querySelector(".navbar-menu");

    menuToggle.addEventListener("click", function () {
      navbarMenu.classList.toggle("show");
    });

    // Gérer les sous-menus déroulants
    const dropdowns = document.querySelectorAll(".dropdown-toggle");

    dropdowns.forEach(dropdown => {
      dropdown.addEventListener("click", function (e) {
        e.preventDefault();
        let dropdownMenu = this.nextElementSibling;
        dropdownMenu.classList.toggle("show");
      });
    });

    // Fermer les sous-menus si on clique ailleurs
    document.addEventListener("click", function (event) {
      dropdowns.forEach(dropdown => {
        let dropdownMenu = dropdown.nextElementSibling;
        if (!dropdown.contains(event.target) && !dropdownMenu.contains(event.target)) {
          dropdownMenu.classList.remove("show");
        }
      });
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("devis-form");
    const searchBtn = document.getElementById("search-btn");
    const summaryForm = document.getElementById("summary-form");
    const summaryText = document.getElementById("summary-text");
    const contactForm = document.getElementById("contact-form");

    searchBtn.addEventListener("click", function () {
        const nuisible = document.getElementById("nuisible").value;
        const codePostal = document.getElementById("code-postal").value;
        const lieu = document.querySelector("input[name='type_lieu']:checked");

        if (nuisible && codePostal && lieu) {
            // Générer le résumé
            summaryText.innerHTML = `
                <strong>Type de nuisible :</strong> ${nuisible} <br>
                <strong>Lieu :</strong> ${lieu.value} <br>
                <strong>Code Postal :</strong> ${codePostal}
            `;

            // Afficher le formulaire final
            summaryForm.style.display = "block";
        } else {
            alert("Veuillez remplir tous les champs avant de continuer.");
        }
    });

	contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;

        // Envoyer l'e-mail (requiert un backend)
        sendEmail(name, email, phone, summaryNuisible.textContent, summaryLieu.textContent, summaryCodePostal.textContent);
    });

    function sendEmail(name, email, phone, nuisible, lieu, codePostal) {
        fetch("https://your-backend.com/send-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                nuisible: nuisible,
                lieu: lieu,
                codePostal: codePostal
            })
        })
        .then(response => response.json())
        .then(data => {
            alert("Votre demande a été envoyée avec succès !");
            contactForm.reset();
        })
        .catch(error => {
            console.error("Erreur lors de l'envoi de l'e-mail", error);
            alert("Une erreur est survenue. Veuillez réessayer plus tard.");
        });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const heroForm = document.getElementById("hero-form");
    const summaryForm = document.getElementById("summary-form");
    const changeSearchBtn = document.getElementById("change-search");

    changeSearchBtn.addEventListener("click", function (e) {
        e.preventDefault();

        // Réafficher le formulaire initial
        heroForm.style.display = "block";
        summaryForm.style.opacity = "0";

        setTimeout(() => {
            summaryForm.style.display = "none";
        }, 300);
    });
});


document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    let formData = new FormData(this);

    fetch(this.action, {
        method: "POST",
        body: formData,
    })
    .then(response => response.text())
    .then(data => {
        // Ouvre une nouvelle fenêtre avec le message
        let confirmationWindow = window.open("", "_blank", "width=400,height=300");
        confirmationWindow.document.write("<p style='font-size:18px; font-family:sans-serif;'>Votre message a bien été envoyé. Merci !</p>");
        confirmationWindow.document.close();
        
        // Réinitialise le formulaire
        document.getElementById("contact-form").reset();
    })
    .catch(error => {
        alert("Erreur lors de l'envoi du message.");
    });
});
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const popup = document.getElementById("popup-confirmation");
    const closePopupBtn = document.querySelector(".close-popup");
    const okButton = document.getElementById("popup-ok");

    // S'assurer que le pop-up est caché au chargement de la page
    popup.style.display = "none";

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Empêche le rechargement de la page

        let formData = new FormData(this);

        fetch(this.action, {
            method: "POST",
            body: formData,
        })
        .then(response => response.text())
        .then(data => {
            // ✅ Afficher le pop-up uniquement après soumission réussie
            popup.style.display = "flex";
            
            // ✅ Réinitialiser le formulaire après envoi
            contactForm.reset();
        })
        .catch(error => {
            alert("Une erreur s'est produite, veuillez réessayer.");
        });
    });

    // ✅ Fermer le pop-up en cliquant sur la croix
    closePopupBtn.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // ✅ Fermer le pop-up en cliquant sur le bouton "OK"
    okButton.addEventListener("click", function () {
        popup.style.display = "none";
    });

    // ✅ Fermer le pop-up en cliquant en dehors de la boîte
    window.addEventListener("click", function (event) {
        if (event.target === popup) {
            popup.style.display = "none";
        }
    });
});
