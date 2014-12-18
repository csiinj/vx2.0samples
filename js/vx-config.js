/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/

/**
 * mobile app config
 */
angular.module('mapp.config',[]).value('mapp.config', {});
angular.module('mapp.libraries', ['mapp.config']);
angular.module('mapp', ['mapp.libraries','ui']);

/**
 * mobile ui config
 */
angular.module('ui.config', []).value('ui.config', {});
angular.module('ui.libraries', ['ui.config']);
angular.module('ui', ['ui.libraries','ui.config']);

angular.module('mapp',['ngRoute']);


/**
 *  Example Source Code Config
 */
(function(window, angular, $) {
	'use strict';

	// this block is module config, if you want do some module management, please use angular-plugins.js
	// and manage module by following methods:
	// **  module.provider(...) / module.factory(...) / module.service(...) / module.value(...) / module.constant(...)
	// **  module.filter(...)
	// **  module.directive(...)
	// **  module.controller(...)

	//### Configuration Entry
	var mod = angular.module('mapp.config');



	
	
	
	

})(window, window.angular, window.jQuery);
