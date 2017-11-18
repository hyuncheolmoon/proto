define(["app"],
    function(app) {
	    console.log(app)
	    app.controller("dashboardSample1Ctrl", function($scope) {
		    $scope.message = "Message from HomeCtrl";
	    });
    });