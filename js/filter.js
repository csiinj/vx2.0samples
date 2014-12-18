/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter template
 */
(function(window, angular) {'use strict';

	//accountNo.$inject = ['$locale'];
	function accountNo() {
		return function(input) {
			if(input !== undefined)
				input=input.replace(/(.{4})/g,"$1 ");
			return input;
		};
	}

	angular.module('ui.libraries').filter('accountNo', accountNo);

})(window, window.angular);

/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter template
 * 大写金额转换
 */
(function(window, angular) {'use strict';

	function amount() {
		return function(input) {
			if (input !== undefined) {
				var strOutput = "", strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
				input += "00";
				var intPos = input.indexOf('.');
				if (intPos >= 0){
					input = input.substring(0, intPos) + input.substr(intPos + 1, 2);
				}
				strUnit = strUnit.substr(strUnit.length - input.length);
				for (var i = 0; i < input.length; i++) {
                strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(input.substr(i, 1), 1) + strUnit.substr(i, 1);
                }
                return strOutput
                                .replace(/^零角零分$/, '')
                                .replace(/零角零分$/, '整')
                                .replace(/^零元零角/, '')
                                .replace(/零[仟佰拾]/g, '零')
                                .replace(/零{2,}/g, '零')
                                .replace(/零([亿|万])/g, '$1')
                                .replace(/零+元/, '元')
                                .replace(/亿零{0,3}万/, '亿')
                                .replace(/^元/, "零元")
                                .replace(/零角/, '零')
                                .replace(/零元/, '')
                                .replace(/零分$/,"");
                }
                return input;
		};
	}
	angular.module('ui.libraries').filter('amount', amount);

})(window, window.angular);

/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author 
 * filter template
 */
(function(window, angular, undefined) {'use strict';
	
	function currencyType() {
		return function(input) {
			if(angular.isEmpty(input)) return;
			switch (input) {
				case 'CNY':
					input = '人民币';
					break;
				case 'AUD':
					input = '澳大利亚元';
					break;
				case 'CAD':
					input = '加拿大元';
					break;
				case 'CHF':
					input = '瑞士法郎';
					break;
				case 'EUR':
					input = '欧元';
					break;
				case 'GBP':
					input = '英镑';
					break;
				case 'HKD':
					input = '港币';
					break;
				case 'JPY':
					input = '日元';
					break;
				case 'NZD':
					input = '新西兰元';
					break;
				case 'SEK':
					input = '瑞典克郎';
					break;
				case 'SGD':
					input = '新加坡元';
					break;
				case 'USD':
					input = '美元';
					break;
			}
		};
	}

	angular.module('ui.libraries').filter("currencyType",currencyType);

})(window, window.angular);

/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter 基金理财币种
 */
(function(window, angular, undefined) {'use strict';

function investCurrency() {
	return function(input) {
		if(angular.isEmpty(input)) return;
		switch (input) {
			case '156':
				return '人民币';
			case '250':
				return '马克';
			case '256':
				return '法郎';
			case '954':
				return '欧元';
			case '826':
				return '英镑';
			case '344':
				return '港币';
			case '392':
				return '日元';
			case '840':
				return '美元';
		}
	};
}

angular.module('ui.libraries').filter("investCurrency",investCurrency);

})(window, window.angular);


/**
 * @author
 * filter 风险类型
 */
(function(window, angular, undefined) {'use strict';

function risklevel() {
	return function(input) {
		if(angular.isEmpty(input)) return;
		switch (input) {
			case '0':
				return '未评定';
			case '1':
				return '保守型';
			case '2':
				return '稳健型';
			case '3':
				return '平衡型';
			case '4':
				return '成长型';
			case '5':
				return '进取型';
		}
	};
}

angular.module('ui.libraries').filter("risklevel",risklevel);

})(window, window.angular);

/**
 * @author
 * filter 无卡取款状态
 */
(function(window, angular, undefined) {'use strict';

function orderstate() {
	return function(input) {
		if(angular.isEmpty(input)) return;
		switch (input) {
			case '0':
				return '待取现';
			case '1':
				return '已取现';
			case '2':
				return '已注销';
			case '3':
				return '正在处理';
		}
	};
}

angular.module('ui.libraries').filter("orderstate",orderstate);

})(window, window.angular);

/**
 * @author
 * filter 理财基金购买渠道
 */
(function(window, angular, undefined) {'use strict';

function investChannel() {
	return function(input) {
		if(angular.isEmpty(input)) return;
		switch (input) {
			case '0':
				return '柜台交易';
			case '1':
				return '网上银行';
			case '2':
				return '自助终端';
			case '3':
				return '电话银行';
			case '4':
				return 'ATM';
			case '5':
				return 'TA';
			case '6':
				return '低柜';
			case '7':
				return '手机银行';
		}
	};
}

angular.module('ui.libraries').filter("investChannel",investChannel);

})(window, window.angular);


/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter 币种
 */
(function(window, angular) {'use strict';

	function currency() {
		return function(currency) {
			switch(currency){
			case 'CNY':
				return '人民币';
			case '01':
				return '人民币';
			case 'AUD':
				return '澳大利亚元';
			case 'CAD':
				return '加拿大元';
			case 'CHF':
				return '瑞士法郎';
			case 'EUR':
				return '欧元';
			case 'GBP':
				return '英镑';
			case 'HKD':
				return '港币';
			case 'JPY':
				return '日元';
			case 'NZD':
				return '新西兰元';
			case 'SEK':
				return '瑞典克郎';
			case 'SGD':
				return '新加坡元';
			case 'USD':
				return '美元';
			case 'PTS':
				return '澳门元';
			case 'MOP':
				return '澳门元';
			default:
				return currency;
			}
		}
	}

	angular.module('ui.libraries').filter('currency', currency);

})(window, window.angular);

/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter template
 */
(function(window, angular) {'use strict';

	//accountNo.$inject = ['$locale'];
	function trsType() {
		return function(input) {
			if(input !== undefined)
				return input==='D' ? "转入" : "转出";
		};
	}

	angular.module('ui.libraries').filter('trsType', trsType);

})(window, window.angular);

/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter 加密账号    1234****5678
 */
(function(window, angular) {'use strict';

	//accountNo.$inject = ['$locale'];
	function encryptAcNo() {
		return function(input) {
			if(input !== undefined)
				return input.substring(0,4) + "****" + input.substring(input.length-4);
		}
	}

	angular.module('ui.libraries').filter('encryptAcNo', encryptAcNo);

})(window, window.angular);

/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter 卡类型
 */
(function(window, angular) {'use strict';

	function bankAcType() {
		return function(acType) {
			switch(acType){
				case "02":
					return "存折";
				case "03":
					return "借记卡";
				case "04":
					return "信用卡";
				case "05":
					return "IC卡";
				default:
					return acType;
			}
		}
	}

	angular.module('ui.libraries').filter('bankAcType', bankAcType);

})(window, window.angular);

/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter 交易名称
 */
(function(window, angular) {'use strict';

	function transCode() {
		return function(transCode) {
			switch(transCode){
				case "BankInnerTransfer":
					return "行内转账";
				case "SelfTransfer":
					return "关联账户转账";
				case "BankCrossTransfer":
					return "跨行转账";
				default:
					return transCode;
			}
		}
	}

	angular.module('ui.libraries').filter('transCode', transCode);

})(window, window.angular);


/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter 签约渠道
 */
(function(window, angular) {'use strict';

	function signChangle() {
		return function(changle) {
			switch(changle){
				case "1":
					return "网上银行";
				default:
					return changle;
			}
		}
	}

	angular.module('ui.libraries').filter('signChangle', signChangle);

})(window, window.angular);

/**
 * @author
 * filter 账户权限
 */
(function(window, angular) {'use strict';

	function acPermit() {
		return function(permit) {
			switch(permit){
				case "1":
					return "可转账";
				case "0":
					return "可查询";
				default:
					return permit;
			}
		}
	}

	angular.module('ui.libraries').filter('acPermit', acPermit);

})(window, window.angular);

/**
 * @author
 * filter 账户状态
 */
(function(window, angular) {'use strict';

	function acState() {
		return function(state) {
			switch(state){
				case "0":
					return "正常";
				default:
					return state;
			}
		}
	}

	angular.module('ui.libraries').filter('acState', acState);

})(window, window.angular);


/**
 * @author
 * filter 存期
 */
(function(window, angular) {'use strict';

	function term() {
		return function(term) {
			switch(term){
				case "D0":
					return "活期";
				case "N1":
					return "一天";
				case "N7":
					return "七天";
				case "M0":
					return "定活两便";
				case "M1":
					return "一个月";
				case "M3":
					return "三个月";
				case "M6":
					return "六个月";
				case "M9":
					return "九个月";
				case "Y1":
					return "一年";
				case "Y2":
					return "二年";
				case "Y3":
					return "三年";
				case "Y5":
					return "五年";
				case "Y6":
					return "六年";
				case "Y8":
					return "八年";
				default:
					return term;
			}
		}
	}

	angular.module('ui.libraries').filter('term', term);

})(window, window.angular);


(function(window, angular) {'use strict';

/**
 * @author
 * filter 储蓄类型
 */

function timType() {
	return function(timType) {
		switch(timType){
			case "T1":
				return "整存整取";
			case "T2":
				return "零存整取";
			case "Y4":
				return "通知存款";
			case "21":
				return "定期";
			default:
				return timType;
		}
	}
}

angular.module('ui.libraries').filter('timType', timType);

})(window, window.angular);


/**
 * @author
 * filter 是否转存
 */
(function(window, angular) {'use strict';

function saveAuto() {
	return function(saveAuto) {
		switch(saveAuto){
			case "1":
				return "是";
			case "0":
				return "否";
			default:
				return saveAuto;
		}
	}
}

angular.module('ui.libraries').filter('saveAuto', saveAuto);

})(window, window.angular);

/**
 * @author
 * filter 交易状态
 */
(function(window, angular) {'use strict';

function jnlState() {
	return function(jnlState) {
		switch(jnlState){
			case "0":
				return "交易成功";
			case "1":
				return "通讯失败";
			case "2":
				return "交易失败";
			case "3":
				return "交易异常";
			case "5":
				return "正在发送主机";
			case "6":
				return "预约成功";
			case "9":
				return "状态未明";
			default:
				return jnlState;
		}
	}
}

angular.module('ui.libraries').filter('jnlState', jnlState);

})(window, window.angular);

/**
 * @author
 * filter 跨行转账交易状态
 */
(function(window, angular) {'use strict';

function transState() {
	return function(transState) {
		switch(transState){
			case "0":
				return "成功";
			case "1":
				return "失败";
			case "2":
				return "正在处理";
			case "3":
				return "已冲回";
			case "4":
				return "初始登记";
			default:
				return transState;
		}
	}
}

angular.module('ui.libraries').filter('transState', transState);

})(window, window.angular);

/**
 * @author
 * filter 
 */
(function(window, angular) {'use strict';

function timeSplit() {
	return function(input) {
		if(input !== undefined){
			var inputArr = input.split(":");
			if(inputArr.length>3){
				input=input.substring(0,8);
			}else{
				input=input
			}
			return input;
		}	
	}
}

angular.module('ui.libraries').filter('timeSplit', timeSplit);

})(window, window.angular);



/**
 * @author
 * filter 基金交易状态
 */
(function(window, angular) {'use strict';

function fundTransState() {
	return function(fundTransState) {
		switch(fundTransState){
			case "0":
				return "预受理";
			case "1":
				return "受理";
			case "2":
				return "已撤单";
			case "3":
				return "已抹账";
			case "4":
				return "失败";
			case "5":
				return "确认中";
			case "6":
				return "部分确认未全部返回";
			case "7":
				return "部分确认已全部返回";
			case "8":
				return "确认成功";
			case "9":
				return "确认失败";
			case "A":
				return "认购确认";
			case "B":
				return "份额调账";
			case "C":
				return "分红数据";
			case "D":
				return "已重发";
			case "E":
				return "重发失败";
			case "F":
				return "成功";
			case "S":
				return "预约";
			case "Y":
				return "处理中";
			case "Z":
				return "已冲回";
			default:
				return fundTransState;
		}
	}
}

angular.module('ui.libraries').filter('fundTransState', fundTransState);

})(window, window.angular);

/**
 * @author
 * filter 基金交易渠道
 */
(function(window, angular) {'use strict';

function fundChannel() {
	return function(fundChannel) {
		switch(fundChannel){
			case "0":
				return "柜台交易";
			case "1":
				return "网上银行";
			case "2":
				return "自助查询终端";
			case "3":
				return "电话银行";
			case "4":
				return "ATM";
			case "5":
				return "TA 发起";
			case "6":
				return "低柜";
			case "7":
				return "手机银行";
			case "9":
				return "基金管理台";
			default:
				return fundChannel;
		}
	}
}

angular.module('ui.libraries').filter('fundChannel', fundChannel);

})(window, window.angular);

/**
 * @author
 * filter 投资周期
 */
(function(window, angular) {'use strict';

function fundInvestPeriod() {
	return function(fundInvestPeriod) {
		switch(fundInvestPeriod){
			case "0":
				return "月";
			case "1":
				return "周";
			case "2":
				return "日";
			default:
				return fundInvestPeriod;
		}
	}
}

angular.module('ui.libraries').filter('fundInvestPeriod', fundInvestPeriod);

})(window, window.angular);

/**
 * @author
 * filter 预约转账
 */
(function(window, angular) {'use strict';

function IsCross() {
	return function(IsCross) {
		switch(IsCross){
			case "0":
				return "行内转账";
			case "1":
				return "跨行转账";
			default:
				return IsCross;
		}
	}
}

angular.module('ui.libraries').filter('IsCross', IsCross);

})(window, window.angular);

/**
 * @author
 * filter 预约转账状态
 */
(function(window, angular) {'use strict';

function transStatus() {
	return function(transStatus) {
		switch(transStatus){
			case "0":
				return "预约成功";
			case "1":
				return "预约撤销";
			case "2":
			    return "预约失败";
			default:
				return transStatus;
		}
	}
}

angular.module('ui.libraries').filter('transStatus', transStatus);

})(window, window.angular);


/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * 日期yyyyMMdd转换成yyyy-MM-dd
 */
(function(window, angular) {'use strict';

	//accountNo.$inject = ['$locale'];
	function dateConvert() {
		return function(input) {
			if(input !== undefined){
				if(/^\d{8}$/g.test(input) == true){
					input=input.substring(0,4) +  '-' + input.substring(4,6) + '-' + input.substring(6,input.length);
				}
				
			}
			return input;
		};
	}

	angular.module('ui.libraries').filter('dateConvert', dateConvert);

})(window, window.angular);


/**
 * @author
 * filter 基金状态
 */
(function(window, angular) {'use strict';

function fundStatus() {
	return function(fundStatus) {
		switch(fundStatus){
			case "0":
				return "开放期";
			case "1":
				return "募集期";
			case "2":
				return "发行成功";
			case "3":
				return "发行失败";
			case "4":
				return "停止交易";
			case "5":
				return "停止申购";
			case "6":
				return "停止赎回";
			case "7":
				return "权益登记";
			case "8":
				return "红利发放";
			case "9":
				return "产品封闭期";
			case "a":
				return "产品终止";
			case "b":
				return "预约认购期";
			default:
				return fundStatus;
		}
	}
}

angular.module('ui.libraries').filter('fundStatus', fundStatus);

})(window, window.angular);

/**
 * @author
 * filter 基金类型
 */
(function(window, angular) {'use strict';

function FundPrdType() {
	return function(FundPrdType) {
		switch(FundPrdType){
			case "0":
				return "基金";
			case "1":
				return "国内理财";
			case "2":
				return "境外基金";
			default:
				return FundPrdType;
		}
	}
}

angular.module('ui.libraries').filter('FundPrdType', FundPrdType);

})(window, window.angular);




/**
 * @author
 * filter 证件类型
 */
(function(window, angular) {'use strict';

function idType() {
	return function(idType) {
		switch(idType){
			case "00":
				return "身份证";
			case "23":
				return "外国公民护照";
			case "07":
			    return "户口簿";
			case "06":
			    return "港澳居民通行证";
			case "25":
			    return "台湾居民往大陆通知证";
			case "02":
			    return "边民出入境通行证";
			case "01":
			    return "军官证";
			case "04":
			    return "护照";
			case "16":
			    return "军事院校学员证";
			case "11":
			    return "军队离休干部荣誉证";
			case "14":
			    return "军官退休证";
			case "15":
			    return "军人文职干部退休证";
			case "18":
			    return "武警文职干部证";
			case "26":
			    return "武警身份证";
			case "19":
			    return "武警军官退休证";
			case "20":
			    return "武警文职干部退休证";
			case "28":
			    return "台湾居民往大陆通知证";
			case "10":
			    return "临时身份证";
			case "29":
			    return "武警士兵证";
			case "05":
			    return "中国公民护照";
			case "22":
			    return "其他";
			case "27":
			    return "无";
			default:
				return idType;
		}
	}
}

angular.module('ui.libraries').filter('idType', idType);

})(window, window.angular);

/**
 * @author
 * filter 智能转存签约状态
 */
(function(window, angular) {'use strict';

function dumpSignState() {
	return function(dumpSignState) {
		var state = parseInt(dumpSignState);
		switch(state){
			case 0:
				return "未签约";
			case 1:
				return "已签约";
			case 2:
			    return "已解约";
			default:
				return dumpSignState;
		}
	}
}

angular.module('ui.libraries').filter('dumpSignState', dumpSignState);

})(window, window.angular);

/**
 * @author
 * filter 智能转存签约类型
 */
(function(window, angular) {'use strict';

function dumpSignType() {
	return function(dumpSignType) {
		switch(dumpSignType){
			case "7":
				return "智能转存";
			default:
				return dumpSignType;
		}
	}
}

angular.module('ui.libraries').filter('dumpSignType', dumpSignType);

})(window, window.angular);

/**
 * @author
 * filter 智能转存签约的协议状态
 */
(function(window, angular) {'use strict';

function dumpDealState() {
	return function(dumpDealState) {
		switch(dumpDealState){
			case "0":
				return "无效";
			case "1":
				return "有效";
			default:
				return dumpDealState;
		}
	}
}

angular.module('ui.libraries').filter('dumpDealState', dumpDealState);

})(window, window.angular);

/**
 * @author
 * filter 智能转存签约的协议类型
 */
(function(window, angular) {'use strict';

function dumpDealType() {
	return function(dumpDealType) {
		switch(dumpDealType){
			case "SG016":
				return "智能转存协议";
			default:
				return dumpDealType;
		}
	}
}

angular.module('ui.libraries').filter('dumpDealType', dumpDealType);

})(window, window.angular);


/**
 * @author
 * filter 信用卡账单类型
 */
(function(window, angular) {'use strict';

function creditBillType() {
	return function(creditBillType) {
		switch(creditBillType){
			case "P":
				return "纸质账单";
			case "E":
				return "电子账单";
			case "B":
				return "纸质账单和电子账单";
			default:
				return creditBillType;
		}
	}
}

angular.module('ui.libraries').filter('creditBillType', creditBillType);

})(window, window.angular);

/**
 * @author
 * filter 信用卡自动还款类型
 */
(function(window, angular) {'use strict';

function creditAuthPayType() {
	return function(creditAuthPayType) {
		switch(creditAuthPayType){
			case "00":
				return "无自动还款";
			case "01":
				return "最小额还款";
			case "02":
				return "全额还款";
			default:
				return creditAuthPayType;
		}
	}
}

angular.module('ui.libraries').filter('creditAuthPayType', creditAuthPayType);

})(window, window.angular);

/**
 * @author
 * filter 信用卡账单地址
 */
(function(window, angular) {'use strict';

function creditBillAddr() {
	return function(creditBillAddr) {
		switch(creditBillAddr){
			case "H":
				return "家庭地址";
			case "C":
				return "公司地址";
			case "O":
				return "其他地址";
			default:
				return creditBillAddr;
		}
	}
}

angular.module('ui.libraries').filter('creditBillAddr', creditBillAddr);

})(window, window.angular);

/**
 * @author
 * filter 信用卡消费类型
 */
(function(window, angular) {'use strict';

function creditConsumeType() {
	return function(creditConsumeType) {
		switch(creditConsumeType){
			case "3":
				return "取现";
			case "1":
				return "消费";
			default:
				return creditConsumeType;
		}
	}
}

angular.module('ui.libraries').filter('creditConsumeType', creditConsumeType);

})(window, window.angular);

/**
 * @author
 * filter 信用卡可分期标志
 */
(function(window, angular) {'use strict';

function creditIpmFlag() {
	return function(creditIpmFlag) {
		switch(creditIpmFlag){
			case "Y":
				return "可分期";
			case "N":
				return "不可分期";
			default:
				return creditIpmFlag;
		}
	}
}

angular.module('ui.libraries').filter('creditIpmFlag', creditIpmFlag);

})(window, window.angular);

/**
 * @author
 * filter 信用卡币种
 */
(function(window, angular) {'use strict';

function creditcurrency() {
	return function(transStatus) {
		switch(transStatus){
			case "CNY":
				return "人民币";
			case "FNC":
				return "外币";
			case "ALL":
			    return "双币";
			default:
				return creditcurrency;
		}
	}
}

angular.module('ui.libraries').filter('creditcurrency', creditcurrency);

})(window, window.angular);


/**
 * @author
 * 卡号后四位
 */
(function(window, angular) {'use strict';

	//accountNo.$inject = ['$locale'];
	function lastCardNoConvert() {
		return function(input) {
			if(input !== undefined){
				input=input.substring(input.length-4,input.length);
				
			}
			return input;
		};
	}

	angular.module('ui.libraries').filter('lastCardNoConvert', lastCardNoConvert);

})(window, window.angular);

/**
 * @author
 * filter 大额预约状态
 */
(function(window, angular, undefined) {'use strict';

function bigOrderstate() {
	return function(input) {
		if(angular.isEmpty(input)) return;
		switch (input) {
			case '1':
				return '处理中';
			case '2':
				return '预约成功';
			case '3':
				return '预约结束';				
		}
	};
}

angular.module('ui.libraries').filter("bigOrderstate",bigOrderstate);

})(window, window.angular);

/**
 * @author
 * filter 信用卡进度查询
 */
(function(window, angular) {'use strict';

function applySchedule() {
	return function(input) {
		if(angular.isEmpty(input)) return;
		switch (input) {
			case '10':
				return '已录入';
			case '20':
				return '已拒绝';
			case '30':
				return '已产生卡片';				
		}
	};
}

angular.module('ui.libraries').filter('applySchedule', applySchedule);

})(window, window.angular);
/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter 大额预约状态
 */
(function(window, angular) {'use strict';

	function bigTransState() {
		return function(state) {
			switch(state){
				case "1":
					return "待处理";
				case "2":
					return "以受理";
				case "3":
					return "已处理";
				default:
					return state;
			}
		}
	}

	angular.module('ui.libraries').filter('bigTransState', bigTransState);

})(window, window.angular);
/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * filter 大额预约状态
 */
(function(window, angular) {'use strict';

	function sugType() {
		return function(state) {
			switch(state){
				case "1":
					return "表扬";
				case "2":
					return "建议";
				case "3":
					return "投诉";
				default:
					return state;
			}
		}
	}

	angular.module('ui.libraries').filter('sugType', sugType);

})(window, window.angular);

/**
 * @author
 * filter 加密手机号码    123****5678
 */
(function(window, angular) {'use strict';

	//accountNo.$inject = ['$locale'];
	function encryptPhoneNum() {
		return function(input) {
			if(input !== undefined)
				return input.substring(0,3) + "****" + input.substring(input.length-4);
		}
	}

	angular.module('ui.libraries').filter('encryptPhoneNum', encryptPhoneNum);

})(window, window.angular);
