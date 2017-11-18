define([
    "angularAMD",
    "util",
    "angular-ui-router"
], function(angularAMD, util) {

    "use strict";
    var app = angular.module("frame", ["ui.router"]);

    var apiUrls = {
        debug: "http://localhost:8080",
        localhost: "http://localhost:8080",
        development: "http://localhost:8080"
    };

    app.constant("REQUEST", apiUrls.development);
    app.run(function($rootScope, $window, $location) {
        $rootScope.$on("$viewContentLoaded", function(scope) {
            var target = scope.targetScope;
	    /**
	     * page controller 접근시 항상 실행되게 하는 부분
	     */
            target.activate && target.activate();
        });
        $rootScope.$on("$stateChangeStart", function(event, state, param, fromState, fromParams, options) {
            var token = null;
            var dashboard = param.session === "dashboard";
            if (token !== null && dashboard) {
                event.preventDefault();
                //window.location.href = "#!/user/list";
            }
            //if (token === null && !dashboard) {
            //    event.preventDefault();
            //    //window.location.href = "#!/main/dashboard";
            //    //$location.path("/main/dashboard");
            //}
            return;
        });
    });
    /**
     * @TODO config 분리
     * @TODO resolve 데이터에 대한 처리
     * @TODO hash 타입별 처리 및 모듈화
     */
    app.config(function($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider) {


        var fnLoad = function($q, $rootScope, $stateParams) {
            var defer = $q.defer();
            var param = $stateParams;
            var session = param.session;
            var controller = param.page;
            var load = "controller/" + session + "/" + controller; //hash에 따라 session은 해당 폴더를 찾아 controller를 호출함

            this.views["content@"].controller = session + util.transCamel(controller) + "Ctrl";
            require([load], function() {
		    console.log(load)
                $rootScope.$apply(function(fn) {
                    defer.resolve(load);
                });
            });
            return defer.promise;
        };
        $stateProvider.state("layout", {
            abstract: true,
            views: {
                //"header@": {
                //    templateUrl: "view/header.html",
                //    controller: "headerCtrl"
                //}
            }
        });

        $urlRouterProvider.otherwise("dashboard/sample1");
        $stateProvider
            .state("page", {
                //parent: "layout",
                url: "/:session/:page",
                views: {
                    //"header@": {
                    //    templateUrl: function(hash) {
                    //        var header = hash.session === "d" ? "main" : "content";
                    //        return "view/header." + header + ".html";
                    //    },
                    //    controller: "headerCtrl"
                    //},
                    "content@": {
                        templateUrl: function(hash) {
                            return "view/" + hash.session + "/" + hash.page + ".html";
                        },
                        resolve: {
                            load: ["$q", "$rootScope", "$stateParams", fnLoad]
                        }
                    }
                }
            })
            //.state("loadpage", {
            //    url: "/:session/:page/:id",
            //    templateUrl: function(hash) {
            //        return "view/" + hash.session + "/" + hash.page + ".html";
            //    },
            //    resolve: {
            //        load: ["$q", "$rootScope", "$stateParams", fnLoad]
            //    }
            //});



        /**
         * @description 예외처리를 위한 부분 이후 토큰이나 request response에 대한 대처 부분
         */
        $httpProvider.interceptors.push(function($window) {
            return {
                request: function(config) {
                    var token = null;
                    if (!token || typeof token === "undefined") {
                        return config;
                    }

                    config.headers = config.headers || {};
                    config.headers["x-api-key"] = token;
                    return config;
                },
                responseError: function(response) {
                    if (response.status !== 200) {
                        console.log(response)
                    }
                    return response;
                }
            };
        });
    });
    // @TODO basic code of angularAMD
    //app.config(function ($stateProvider, $urlRouterProvider) {
    //    $urlRouterProvider.otherwise("/dashboard");
    //    $stateProvider
    //        .state("main", angularAMD.route({
    //            url: "/main",
    //            templateUrl: "view/main.html",
    //            controller: "mainCtrl",
    //            controllerUrl: "controller/main"
    //        }))
    //        .state("dashboard", angularAMD.route({
    //            url: "/dashboard",
    //            templateUrl: "view/dashboard.html",
    //            controller: "dashboardCtrl",
    //            controllerUrl: "controller/dashboard"
    //        }));
    //});

    return angularAMD.bootstrap(app);
});
