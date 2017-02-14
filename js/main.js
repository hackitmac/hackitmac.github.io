var app = angular.module("PhaseOne", ["ngRoute"]);
app.config(function ($routeProvider,$locationProvider) {
	$routeProvider
		.when("/", {
			templateUrl: "views/empty.html"
		})
		.when("/home", {
			templateUrl: "views/home.html"					
		})
		.when("/about", {
			templateUrl: "views/about.html"
		})
		.when("/resources", {
			templateUrl: "views/resources.html"
		})
		.when("/events", {
			templateUrl: "views/events.html"
		});
	$locationProvider.html5Mode(true);
});
app.controller("SiteController", function ($scope, $location, $http) {
	$scope.execs = [];

	$http.get("js/execs.json").then(function (res) {
		$scope.execs = res.data.execs;
	});

	$scope.closeInfoDialog = function () {	
		$("#overlay").remove();
		$("#dialog").remove();		
	};

	$scope.openInfoDialog = function (index) {
		var exec = $scope.execs[index];
		$("body").append("<div id='overlay'>");
		$("body").append("<div id='dialog'>");
		var obj = $("#dialog");
		obj.append("<img id='side-image' src='images/" + exec.image + "'>");
		obj.append("<h3>" + exec.name + "</h3>");
		obj.append("<p>" + exec.bio + "</p>");
		obj.append("<button>Close</button>");
		obj.find("button").click(function(){
			$scope.closeInfoDialog();
		});
	};

	/**
	 * Navigate to the page by its index
	 */
	$scope.navigate = function (index) { 
		if(index == 0){
			$("nav").css({"background":"white"});
		}else{
			$("nav").css({"background":"none"});
		}
		for (var i = 0; i < 4; i++) {
			var x = $($("nav ul li a")[i]);
			if (i != index) {
				x.removeClass("selected");
			} else {				
				x.addClass("selected");
			}
		}
	};

	/**
	 * Load the ng-view for each page based on the page URL.
	 * This is used if the user directly navigates to the page rather than through
	 * the landing page.
	 */
	if ($location.url() == "/" || $location.url() == "") {
		$scope.state = "init";
		$scope.navigate(-1);
	} else {
		$scope.state = "main";
		$scope.location = $location.url().substring(1);
		switch ($scope.location) {
			case "home": $scope.navigate(0); break;
			case "about": $scope.navigate(1); break;
			case "initiatives": $scope.navigate(2); break;
			case "events": $scope.navigate(3); break;
		}
	}
});