/* 
 Created on : 2016. 11. 3, PM 4:36:04
 Author     : Hyuncheol Moon 
 */
window.console = window.console || {
    log: function() {
    }
};
window.urlArgs = new Date().getTime();

var bower = "../bower/";
/* requires */
requirejs.config({
    urlArgs: "_=" + window.urlArgs,
    baseUrl: "js",
    paths: {
        "less": bower + "less/dist/less",
        "jquery": bower + "jquery/dist/jquery",
        "angular": bower + "angular/angular",
        "angularAMD": bower + "angularAMD/angularAMD",
        "angular-ui-router": bower + "angular-ui-router/release/angular-ui-router",
        "bootstrap": bower + "bootstrap/dist/js/bootstrap.min",
        "moment": bower + "moment/moment",
        "util": "common/util",
        "app": "app"
    },
    shim: {
        "bootstrap": ["jquery"],
        "angularAMD": ["angular"],
        "angular-ui-router": ["angular"]
            //"angular-route": ["angular"]
    },
    deps: [
        "app",
        "jquery",
        "util",
        "bootstrap",
        "moment"
    ]
});
requirejs.onError = function(e) {
    if (e.requireType === "scripterror") {
        window.history.back();
        return;
    }
    console.log(e.requireType);
    console.log(e.stack);
    throw e;
};