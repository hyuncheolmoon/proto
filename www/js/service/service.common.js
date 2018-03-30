define([
	"app",
	"util",
	"moment",
], function(app, util, moment) {
	return app.service("COMMON", function(
	    $window, $rootScope,
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





		/**
		 * 
		 * @description 최초 실행
		 */
		(function() {
			if (flag.event)
				return;

			flag.event = true;

		})();



		return {
			initialize: initialize,
			timer: timer,
		};
	});
});