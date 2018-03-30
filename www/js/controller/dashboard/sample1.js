define(["app"],
    function(app) {
	    console.log(app)
	    app.controller("dashboardSample1Ctrl", function($scope, $location) {
		    var self = $scope;

		    self.title = "Sample page1";
		    console.log($location)


		    self.goToOption = function() {

			    $location.path("/option/sample2");

		    }


	    });
    });