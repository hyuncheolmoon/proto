define(["app"],
    function(app) {
	    console.log(app)
	    app.controller("optionSample2Ctrl", function($scope, $location) {
		    var self = $scope;
		    self.title = "Sample page 2";


		    self.goToMain = function() {

			    $location.path("/dashboard/sample1");

		    }


	    });

    });