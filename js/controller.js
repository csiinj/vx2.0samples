mapp.controller('SavLoanCalculatorCtrl',['$scope','$http',function($scope,$http){
	console.log("!!!!!");
	
	$scope.init = function() {
		$scope.CalculatorTypeList = [ {
				"Name" : "存款计算器"
			}, {
				"Name" : "贷款计算器"
			} ];
		$scope.CalculatorType = $scope.CalculatorTypeList[1];
		
		$scope.LoanNameList = [ {
				"LoanName" : "个人消费贷款",
				"Code" : "PL"
			}, {
				"LoanName" : "汽车消费贷款",
				"Code" : "CL"
			} ];
		$scope.LoanName = $scope.LoanNameList[0];
		$scope.LoanName2 = $scope.LoanNameList[0];
		
		loanRateQry('PL');
	};
	
			//贷款利率查询
	$scope.loanRateQry = function(type) {
		var code = "DK";
		var term = "";
		if(type=="0"){
			term = $scope.LoanName.Code;
		}else{
			term = $scope.LoanName2.Code;
		}
		var formData = {
			"Currency" : "",//$scope.Currency.Code,
			//"Type" : code,
			"Term" : term
		};
		//本地维护利率查询
		$http.post('./data/LocalMgmtRateQry.json', {}).
			success(function(data, status, headers, config) {
			    var rate = "";
				if(data==null || data.Rate == undefined || data.Rate ==null){
					rate = "";
				}else{
					rate = data.Rate;
				}
				if(type=="0"){
					$scope.YearRate1 = rate;
				}else{
					$scope.YearRate2 = rate;
				}
			}).
			error(function(data, status, headers, config) {
			  // called asynchronously if an error occurs
			  // or server returns response with an error status.
			});
		
	};
	
	//等额本息还款
	$scope.calculate1 = function() {
		//本金
		var amount = parseFloat($scope.Capital1);
		//贷款总期数
		var term = parseInt($scope.LoanYear1 * 12);
		//月利率
		var MonthRate = parseFloat($scope.YearRate1 / 1200);
		//月均还款额＝贷款本金×[月利率×(1＋月利率)^总还款期数)]/[(1＋月利率）^总还款期数－1] ；
		$scope.Money1 = amount
				* (MonthRate * Math.pow(1 + MonthRate, term))
				/ (Math.pow(1 + MonthRate, term) - 1);
	};
	
			//等额本金还款
	$scope.calculate2 = function() {
		//最大归还期数
		$scope.maxTerm = $scope.LoanYear2 * 12;
		if ($scope.Termed2 > $scope.maxTerm) {
			$scope.toast("已归还期数不能大于归还期数");
			return;
		}
		if ($scope.Termed2==$scope.maxTerm) {
			$scope.Money2=0;
			return;
		}
		//本金
		var amount = parseFloat($scope.Capital2);
		//贷款总期数
		var term = parseInt($scope.LoanYear2 * 12);
		//月利率
		var MonthRate = parseFloat($scope.YearRate2 / 1200);
		//已偿还次数
		var timed = parseInt($scope.Termed2);
		//alert(amount + "-" + term + "-" + MonthRate + "-" + timed);
		//每月(季）还本付息额 ＝贷款本金/还本付息次数＋(贷款本金 - 已偿还本金累计数）×月(季）利率
		$scope.Money2 = amount / term + (amount - (amount / term) * timed)
				* MonthRate;
	};
	
}]);

