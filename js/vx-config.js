/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/

/**
 * mobile app config
 */
angular.module('mapp.config',[]).value('mapp.config', {});
angular.module('mapp.libraries', ['mapp.config']);
angular.module('mapp', ['mapp.libraries','ui','ngRoute']);

/**
 * mobile ui config
 */
angular.module('ui.config', []).value('ui.config', {});
angular.module('ui.libraries', ['ui.config']);
angular.module('ui', ['ui.libraries','ui.config']);


var mapp = angular.module('mapp');

/**
 * app config 
 */
mapp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/SavLoanCalculator',{
		controller:'SavLoanCalculatorCtrl',
		templateUrl:'htmls/SavLoanCalculator/SavLoanCalculator.html'
	}).when('/Typography',{
		templateUrl:'partials/Typography.html'
	});
}]);
