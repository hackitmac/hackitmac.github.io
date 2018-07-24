var app = angular.module("PhaseOne");
app.controller("SlideshowController",function($scope){

	var slides = []; 
	var slideshowIndex = 0; // which slide you are on
	var slideshowTimeout = -1; // timer ID : waiting to fade text back in
	var slideshowRestartTimer = -1; // timer ID : waiting to play after pausing show
	var slideshowPlayInterval = -1; // interval ID : waiting to change slides

	/**
	 * Change the slide to that of _index
	 */
	var changeSlide = function(_index){
		slideshowIndex = _index;
		if(slides.length <= _index)return; // if the index is out of scope, return
		$("#indicators div").removeClass("selected");	// deslect all the indicators
		var text = $("#slideshow #text");
		text.css({"opacity":0});
		clearTimeout(slideshowTimeout);
		slideshowTimeout = setTimeout(function(){
			var text = $("#slideshow #text");
			text.find("h1").html(slides[slideshowIndex]["title"]);
			text.find("p").html(slides[slideshowIndex]["content"]);		
			text.css({"opacity":1});
			slideshowTimeout = -1;
		},500); //animate the text transition
		
		// set the background image and set the desired indicator to selected
		$("#slideshow #image").css({"background-image":"url('./images/"+slides[slideshowIndex]["image"]+"')"});
		$("#slideshow #indicators div:nth-child("+(slideshowIndex+1)+")").addClass("selected");
	};

	/**
	 * Play the slideshow
	 */
	var play = function(){
		clearInterval(slideshowPlayInterval);
		slideshowPlayInterval = setInterval(function(){
			slideshowIndex++;
			if(slideshowIndex >= slides.length) slideshowIndex = 0;
			changeSlide(slideshowIndex);
		},5000);
	};

	/**
	 * Pause the slideshow
	 */
	var pause = function(){
		if(slideshowPlayInterval != -1){
			clearTimeout(slideshowRestartTimer);
			clearInterval(slideshowPlayInterval);						
			slideshowPlayInterval = -1;
			slideshowRestartTimer = setTimeout(function(){				
				if(slideshowPlayInterval == -1){
					play();					
				}
				slideshowRestartTimer = -1;
			},10000);
		}
	};

	/**
	 * Init the slideshow
	 */
	var init = function(_slides){								
		slides = _slides;
		slideshowIndex = 0;		
		var indicators = $("#indicators");		
		for(var i = 0; i < slides.length;i++){
			indicators.append("<div index='"+i+"'></div>"); // add indicators for each slide
		}
		$("#slideshow #indicators div").click(function(){ // if one of the indicators are selected
			pause();
			changeSlide(parseInt($(this).attr("index")));			
		});
		$("#slideshow #image, #slideshow #gradient-overlay").click(function(){ // navigate to desired url if you click on the slide
			if(slides[slideshowIndex].url != null){
				window.location = slides[slideshowIndex].url;
			}
		});
		changeSlide(0);
		play(); // start the slideshow
	};
	$.getJSON("js/slides.json",function(data){ // get the slides to display
		init(data);		
	});	

	/**
	 * Stop the timers and intervals on navigation
	 */
	$scope.$on("$routeChangeStart",function(){
		clearInterval(slideshowPlayInterval);
		clearTimeout(slideshowTimeout);
		clearTimeout(slideshowRestartTimer);
	});
});