define(['app'], function (app) {
    console.log(app)
    app.controller('dashboardCtrl', function ($scope) {
        $scope.message = "Message from HomeCtrl";
    });
});