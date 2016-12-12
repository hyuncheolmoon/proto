define(['app'], function (app) {
    console.log(app)
    app.controller('mainCtrl', function ($scope) {
        $scope.message = "Message from HomeCtrl";
    });
});