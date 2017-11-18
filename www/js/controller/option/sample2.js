define(["app"],
    function(app) {
	    console.log(app)
	    app.controller("optionSample2Ctrl", function($scope) {
		    $scope.message = "Message from HomeCtrl";
	    });
    });