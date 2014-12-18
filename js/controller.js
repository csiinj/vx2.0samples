var mapp = angular.module('mapp');

mapp.config(['$routeProvider',function($routeProvider){
	$routeProvider.
	when('/SavLoanCalculator',{
		controller: 'ShowController',
		templateUrl:'htmls/SavLoanCalculator/SavLoanCalculator.html'
	}).when('/Typography',{
		templateUrl:'partials/Typography.html'
	});
}]);

mapp.controller('ShowController',['$scope',function($scope){
	console.log("!!!!!");
}]);