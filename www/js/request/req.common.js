define([
	"app",
	"util",
], function(app, util) {
	return app.service("REQCOMMON", function($http, REQUEST) {

		return {
			/**
			 * 
			 * @param {Object} param
			 * @param {Function} success
			 * @param {Function} error
			 */
			getSample: function(param, success, error) {
				var url = REQUEST + "/dummy/get";

				return $http.post(url, {
					dummy: param.dummy

				}).success(validFn(success))
				    .error(validFn(error))
			},
		};

	});
});