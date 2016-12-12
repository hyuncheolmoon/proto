
define(['angularAMD', 'angular-ui-router'], function (angularAMD) {
    'use strict';

    var app = angular.module("webapp", ['ui.router']);

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/dashboard");
        $stateProvider
            .state('main', angularAMD.route({
                url: '/main',
                templateUrl: 'view/main.html',
                controller: 'mainCtrl',
                controllerUrl: 'controller/main'
            }))
            .state("dashboard", angularAMD.route({
                url: "/dashboard",
                templateUrl: 'view/dashboard.html',
                controller: 'dashboardCtrl',
                controllerUrl: 'controller/dashboard'
            }));
        //.otherwise({redirectTo: "/main"});
    });
    return angularAMD.bootstrap(app);
});
