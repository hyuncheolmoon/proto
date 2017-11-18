define([
    "app",
    "util",
    "moment",
], function(app, util, moment) {
    return app.service("COMMON", function(
        $window, $rootScope,
        //cordovaHTTP,
        $cordovaLocalNotification, $cordovaNetwork,
        SESSION, PLATFORM, REQCOMMON
        ) {
        var self = this;





        var timer = {
            connect: null,
            clearConnect: function() {
                clearInterval(timer.connect);
                timer.connect = null;
                clearInterval(timer.noti);
                timer.noti = null;
            },
        };
        var flag = {
            event: false,
        };
        var count = {
            push: 0
        };
        var setRootSize = function() {

            if (!window.cordova)
                return;

            /**
             * @type Window.devicePixelRatio|window.devicePixelRatio
             * root font-size 지정
             */
            var ratio = window.devicePixelRatio;
            window.plugins.screensize.get(function(res) {
                console.log(res);
                var w = $($window).width();
                var width = res.width;
                var height = res.height;
                if (PLATFORM.isAndroid()) {
                    var dpi = res.xdpi;
                    var diameter = res.diameter;
                    var density = res.densityValue;
                    var wRatio = w / 360;

                    var size = dpi / density * diameter;
                    size = (size) / 80;
                } else if (PLATFORM.isMac()) {
                    var defaultSize = 8.3;
                    var scale = res.scale;
                    size = width / scale / 38;
                }

                if (height / width <= 1.4) {
                    size = width / scale / 44;
                    $("html, body").addClass("custom-pad");
                    $rootScope.isIpad = true;
                } else if (height / width <= 1.5) {
                    size = width / scale / 44;
                    $("html, body").addClass("custom-iphone4");
                    $rootScope.isIpad = true;
                } else if (height / width >= 1.85) {
                    $("html, body").addClass("custom-iphoneX");
                }
                $("html, body").css({"font-size": size.toFixed(2) + "pt"});

                console.log(height / width);

            }, function(err) {
                console.log(err);

            });
        };





        /**
         * 
         * @returns {undefined}
         */
        var initialize = function() {
            if (flag.event)
                return;

            flag.event = true;



        };


        //initialize();

        return {
            initialize: initialize,
            timer: timer,
        };
    });
});