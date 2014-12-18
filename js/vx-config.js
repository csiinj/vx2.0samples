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

	/************************************************
	 * config service factory function
	 ************************************************/
	//Log
	configLog.$inject = ['$logProvider'];
	function configLog($logProvider) {
		/**
		 * log level config, support 'debug', 'info', 'warn', 'error'
		 *  note: $log === window.console
		 *  if IE 6/7, include blackbird.js and blackbird.css will emulate window.console for you
		 *  default is 'debug'
		 */
		$logProvider.setLevel('debug');
	}

	//Browser
	configBrowser.$inject = ['$browserProvider'];
	function configBrowser($browserProvider) {

		/**
		 * if E2ETest (end to end test), you should disable browser.debounce function
		 * so setE2ETest(true), debounce used to combind events handle for performance
		 * default is false
		 */
		//$browserProvider.setE2ETest(false);
		
		/**
		 * config Low version of the browser returns no refresh,setting iframe history href initial value.
		 * default file name by blank.html
		 */
		//$browserProvider.setBlankPage("empty.html");
	}

	//Targets
	configTargets.$inject = ['$targetsProvider'];
	function configTargets($targetsProvider) {
		/**
		 *  lets $targets service use window.History for browser forward and backward.
		 *  default is false
		 */
		$targetsProvider.useLocation(false);

		/**
		 * register transition function to $targets service,
		 *  transition function signature is function(oldEl, newEl, remove, back)
		 */
		//$targetsProvider.transition('transition-name', function(oldEl, newEl, remove, back){});

	}

	//Compile
	configCompile.$inject = ['$compileProvider'];
	function configCompile($compileProvider) {
		/**
		 *  when angular set <a href='...' />, it will sanitize for avoid XSS attack
		 *  default is /^\s*(https?|ftp|mailto|file):/
		 */
		//$compileProvider.urlSanitizationWhitelist(/^\s*(https?|ftp|mailto|file):/);
	}

	//RootScope
	configRootScope.$inject = ['$rootScopeProvider'];
	function configRootScope($rootScopeProvider) {
		/**
		 * scope's digest is dirty loop, until now modification found, so loop count(TTL)
		 * is fatal for performance, it means loop count over TTL, the digest will exit
		 * even if has more modifications
		 *  default is 10
		 */
		//$rootScopeProvider.digestTtl(10);

		/**
		 * for scope digest analysis, $rootScope service will use log.debug tracing
		 *  digest processing,
		 *  default is false
		 */
		$rootScopeProvider.traceDigest(false);
	}
	
	//Remote
	configRemote.$inject = ['$$remoteProvider'];
	function configRemote($$remoteProvider) {
		/**
		 * $remote will use this name for scope, for example, scope.$error will get error object
		 *  default is '$error'
		 */
		//$$remoteProvider.setErrorTag('$error');

		/**
		 * $remote will use this callback analysis error, for examples
		 *  1.  status not in [200, 300), return 'http error'
		 *  2.  application data include $jsonError property will means application error
		 *
		 *  NOTE: application should provide this callback
		 */
		$$remoteProvider.setErrorCallback(function(data, status, headers, config) {
			// if error return error object, otherwise return null
			//防重复提交
			if(!angular.isEmpty(data._tokenName)){
				config.$scope.$parent._tokenName = data._tokenName;
			}
			//流水号
			if(!angular.isEmpty(data._JnlNo)){
				config.$scope.$parent.jnlNoRCB = data._JnlNo;
			}
			var $S = config.$scope, errorList = [], msg = "";
			if (!angular.isEmpty(status) && status != 200 && status !== 0) {
				switch(status) {
					case 404 :
						console.log("404.html");
						break;
					case 500 :
						console.log("500.html");
						break;
					default :
						console.log("default.html");
				}
			} else if (data && (!angular.isEmpty(data.errmsg) || !angular.isEmpty(data.jsonError))) {
				if (data.errmsg || data.jsonError) {
					if (angular.isArray(data.errmsg) || angular.isArray(data.jsonError)) {
						errorList = !angular.isEmpty(data.errmsg) ? data.errmsg : data.jsonError;
					} else {
						msg = !angular.isEmpty(data.errmsg) ? data.errmsg : data.jsonError;
					}
				}
			}
			if (errorList) {
				for (var i = 0; i < errorList.length; i++) {
					if (errorList[i]._exceptionMessage) {
						msg = msg.concat(errorList[i]._exceptionMessage);
					} else {
						msg = msg.concat(errorList[i]);
					}
				}
			}
			if (msg) {
				config.$scope.setInitFlagJN();
				var errorMsg;
				if (angular.isArray(msg)) {
					errorMsg = msg[0];
				} else {
					errorMsg = msg;
				}
				// 当session超时的时候，返回码是：uibs.both_user_and_bankid_is_null
				if ('uibs.both_user_and_bankid_is_null' == errorMsg) {
					NativeCall.toast("您已经登录超时，请重新登录");
					return;
				}
				if('uibs.validation_user_not_login' == errorMsg){
					NativeCall.toast("您还未登陆，登陆后可以操作");
					return msg;
				}
				NativeCall.toast(msg);
				config.$scope.getToken();
				return msg;
			}
		});

		/**
		 * $remote could add success callback by yourself, it will could be call later
		 *  like:   $remote.get(...).method(arg1, arg2)   ** first arg is data
		 *  you could extend $remote success callback by this
		 */
		// $$remoteProvider.addCallback('method', function(data, arg1, arg2) {
		// });
		/*
		$$remoteProvider.addCallback("doMain", function(data, $R) {
			var $S = this,
				oo = {};
			switch(data.loginType){
				case 'C':
					oo.UserType = "专业版个人网银";
					break;
				case 'O':
					oo.UserType = "普通(动态验证码)版个人网银";
					break;
				case 'B':
					oo.UserType = "商户版个人网银";
					break;
				default : 
					oo.UserType = "大众版个人网银";
			}
			$R.post('menu.do', oo, function(data) {
				$S.$root.menus = data;
			});
		});*/

	}
	

	//Http
	configHttp.$inject = ['$httpProvider'];
	function configHttp($httpProvider) {
		/**
		 * config $http service if use inner cache(not HTTP cache), if use inner cache
		 * all same url GET will just submit server only once
		 * default is false
		 */
		//$httpProvider.useCache(false);

		/**
		 * config $http if use json request type, if not, use form encoding, for examples
		 *  abc=a&aaa=23
		 *  defautl is true
		 */
		//$httpProvider.useJsonRequest(true);

		/**
		 * config $http service default callback, if return true, it will disable all success and error callback
		 *  typically, this callback could use for session control
		 *  but in application use $remote is recommend, so you could use $remoteProvider.setErrorCallback for
		 *  same situation
		 */
		$httpProvider.setDefaultCallback(function(data, status, headers, config) {
			// if return true, means no need further process, all others success(...) and error(...) will not invoke
			return false;
		});

		/**
		 * config $http service defaults, you could:
		 * 1. $httpProvicer.defautls.transformResponse(array) override default json convert or add your function
		 * 2. $httpProvicer.defautls.transformRequest(array) override default json convert or add your function
		 * 3. $httpProvicer.defautls.headers define default HTTP Headers, default is
		 * {
		 *   common : {
		 *     'Accept' : 'application/json, text/plain, *\/*'
		 *   },
		 *   post : {
		 *     'Content-Type' : 'application/json;charset=utf-8'
		 *   },
		 *   put : {
		 *     'Content-Type' : 'application/json;charset=utf-8'
		 *   },
		 *   xsrfCookieName : 'XSRF-TOKEN',
		 *   xsrfHeaderName : 'X-XSRF-TOKEN'
		 * }
		 */
		//$httpProvider.defaults

		/**
		 * config $http service response interceptors, default is empty array
		 *  you could use  $httpProvider.responseInterceptors.push(fn(promise)) for add interceptor
		 *  promise is $q.defer.promise object, use then(success(...), error(...)) for register callback
		 */
		//$httpProvider.responseInterceptors

	}

	//HttpBackend
	configHttpBackend.$inject = ['$httpBackendProvider'];
	function configHttpBackend($httpBackendProvider) {
		
		/**
		 * config $httpBackend use anti-cache policy for HTTP cache
		 * 0-none, 1-use load timestamp, 2-use request timestamp
		 *  defautl is 0
		 */
		$httpBackendProvider.useAntiCache(0);

		/**
		 * config $httpBackend use external ajax function
		 * if true will use jQuery's ajax, otherwise use angular internal ajax
		 * default is false
		 */
		$httpBackendProvider.useExternalAjax(false);

		// config ajax default port
		$httpBackendProvider.config({
			/**
			 * config $httpBackend default ajax timeout(in millisecond)
			 *  default is 30000
			 */
			ajaxTimeout : 30000,
			
			/**
			 * config $httpBackend use ajax queue mode, in queue mode
			 * all ajax request will execute one by one
			 *  ajaxQueueSize is queue max length, 0 means no queue
			 *  ajaxAborted use for ajax abort or not if duplicated request
			 * default is (5, false)
			 */
			ajaxQueueSize : 5,
			ajaxAborted : false,
			/**
			 * config $httpBackend beforSend and afterReceived callback
			 * typically use for ajax indicator
			 * NOTE: you should config it for ajax indicator
			 */
			/*beforeSend : function() {
				// beforeSend
				if(count==0){
					NativeCall.showMask();
				}
				count++;
				//$('.httpBackend-backdrop.active').fadeIn();
			},
			afterReceived : function() {
				// afterReceived
				if(NativeCall.isCloseSplashScreen){
					NativeCall.hideMask();
				}
				else{
					NativeCall.hideMask();
					NativeCall.isCloseSplashScreen=true;
					NativeCall.closeSplashScreen();
				}
			}*/
			
			beforeSend : function() {
				// beforeSend
                if(NativeCall.isiosdevice){
                    NativeCall.showMask();
                }else{
                    if(NativeCall.timer){
                        clearTimeout(NativeCall.timer);
                        NativeCall.timer = null;
                    }
                                    
                    if(!NativeCall.ShowMasking){
                        NativeCall.ShowMasking = true;
                        NativeCall.showMask();
                    }
                }
			},
			afterReceived : function() {
				// afterReceived
	            if(NativeCall.isiosdevice){
	                if(NativeCall.isCloseSplashScreen){
	                   NativeCall.hideMask();
	                    }
	                else{
	                    NativeCall.hideMask();
	                    NativeCall.isCloseSplashScreen=true;
	                    NativeCall.closeSplashScreen();
	                }
	            
	            }else{
	                if(!NativeCall.timer)
	                NativeCall.timer = setTimeout(function(){
	                NativeCall.timer = null;
	                NativeCall.ShowMasking = false;
	                NativeCall.hideMask();
	                },1000);
	                NativeCall.closeSplashScreen();
	            }
			}
		});
	}

	//Validation
	configValidation.$inject = ['$validationProvider'];
	function configValidation($validationProvider) {
		/**
		 * register validation type, validation is use in data-binding, so it is
		 * bi-direction include parse and format, so validation function could
		 * registerred in 2 modes:
		 * 1.
		 *  $validationProvider.register('validator', function(value) {
		 *	  // return converted value, or undefined for invalid value
		 *  });
		 * 2.
		 *  $validationProvider.register('validator', {
		 *	  parse : function(value) {
		 *		// return converted value, or undefined for invalid value
		 *	  },
		 *	  format : function(value) {
		 *		// return converted value, or undefined for invalid value
		 *	  }
		 *  });
		 */

	}


	mod.config(configLog);
	mod.config(configBrowser);
	mod.config(configTargets);
	mod.config(configCompile);
	mod.config(configRootScope);
	mod.config(configRemote);
	mod.config(configHttp);
	mod.config(configHttpBackend);
	mod.config(configValidation);
	
	
	
	
	
	/************************************************
	 * config service instance function
	 ************************************************/
	runTargets.$inject = ['$targets', '$rootScope','$transitions'];
	function runTargets($targets,$rootScope,$transitions) {
		
		angular.forEach($transitions.types,function(value,key){
			$targets.transition(value, (function() {
				var type = $transitions.types[value];
				return function(oldEl, newEl, remove,back) {
                                        /*if($('button')[0]!=undefined ||$('button')[0]!=null){
                                        $('button')[0].disabled=true;
                                        setTimeout(function(){
                                                   $('button')[0].disabled=false;
                                                   },1000);
                                        }*/
					$transitions.runTransition(type, oldEl, newEl, remove,back); 
				};
			})());
		});
	}
	
	runRootScope.$inject = ["$rootScope","$nativeCall","$goto","$timeout","$http","$targets"];
	function runRootScope($rootScope,$nativeCall,$goto,$timeout,$http,$targets){
		
	$rootScope.setInitFlagJN = function(){
			var scope = this;
			scope.initFlagJN = true;
	};
 
    $rootScope.getTokenJNRCB=function(id,transcode,acno,acname,amount) {
    	var scope = this;
    	$("#content").find("#"+id).attr("disabled","true");
    	$("#content").find("#"+id).attr("width","100px");
    	$rootScope.setTimer(60,id);
    	$http.post("/pweb/GenTokenName.do",{
    		"SMSTransCode":transcode,
    		"PayeeAcNo" : acno,
			"PayeeAcName" : acname,
			"Amount" : amount
    	}).success(function(data, status, headers, config) {
//    		scope.alert("该短信验证码已发送，请注意查收");
    		//scope.testNo = data.MSGToken;
		}).error(function(data, status, headers, config) {
			scope.alert(angular.toJson(data));
		});
    };
    $rootScope.getTokenJNRCBV1=function(id,transcode,acno,acname,amount,mobile) {
    	var scope = this;
    	if(mobile == null || "" == mobile) {
    		scope.alert("手机号不能为空");
    	}
    	$("#content").find("#"+id).attr("disabled","true");
    	$("#content").find("#"+id).attr("width","100px");
    	$rootScope.setTimer(60,id);
    	$http.post("/pweb/GenTokenNameV1.do",{
    		"SMSTransCode":transcode,
    		"PayeeAcNo" : acno,
    		"PayeeAcName" : acname,
    		"Amount" : amount,
    		"MobilePhone" : mobile
    	}).success(function(data, status, headers, config) {
//    		scope.alert("该短信验证码已发送，请注意查收");
    		//scope.testNo = data.MSGToken;
    	}).error(function(data, status, headers, config) {
    		scope.alert(angular.toJson(data));
    	});
    };
 
    $rootScope.setTimer=function(value,id){
    	value = value-1;
    	var showText = value+"秒后";
    	$("#content").find("#"+id).text(showText);
    	if(value >= 0){
    		$rootScope.timerFlag=true;
    		$rootScope.timer = window.setTimeout(function(){$rootScope.setTimer(value,id);},1000);
    	}else{
    		$rootScope.clearTimeouts(id);
    	}
    };
    
    $rootScope.timer=null;
    $rootScope.timerFlag=false;
    $rootScope.clearTimeouts=function(id){
    	if($rootScope.timer!=null){
    		window.clearTimeout($rootScope.timer);
    		$rootScope.timerFlag=false;
    		$("#content").find("#"+id).removeAttr("disabled");
    		$("#content").find("#"+id).text("点击获取");
    	}
    	$rootScope.timer=null;
    };
    
    $rootScope.getToken = function(){
		var scope = this;
		$http.post("/pweb/getNewTokenName.do",{})
			.success(function(data, status, headers, config){
				if(!angular.isEmpty(data._tokenName)){
					scope._tokenName = data._tokenName;
				}
			})
			.error(function(data, status, headers, config){
				$nativeCall.alert(angular.toJson(data));
			});
	};
    
		$rootScope.alert = function(message) {
			$nativeCall.alert(message);
		};

		$rootScope.confirm = function(message, okBack, cancleBack) {
			var scope = this;
			var cfmMessage = {
				"title": "确认",
				"message": message,
				"positiveText": "确定",
				"negativeText": "取消"
			};
			$nativeCall.confirm.call(this,function(confirm){
				if(confirm=="Yes"){
					if(typeof okBack === "function"){
						scope.$apply(okBack());
					}
				}
				else {
					if(typeof cancleBack === "function"){
						scope.$apply(cancleBack());
					}
				}
			},angular.toJson(cfmMessage));
		};

		$rootScope.toast = function(errMessage){
			$nativeCall.toast(errMessage);
		};
		
		$rootScope.authenticate = function(callback){
			$nativeCall.authenticate(callback);
		};
		
		$rootScope.loadPage = function(sourse,targets){
			$nativeCall.pages.push(sourse);
			$nativeCall.history = [];
			$targets("content",targets);
		}
		
		$rootScope.finishWeb = function() {
			$nativeCall.finishWeb();
		};
		
		$rootScope.gotoUrl = function(url){
			$goto(url);
		};
		
		$rootScope.openWebsite = function(url){
			$nativeCall.openWebsite(url);
		};
		
		$rootScope.showHelp = function(){
			var childdiv = document.getElementById("content").getElementsByTagName("div");
			var inLoadDivId = childdiv[1].getAttribute("v-view-setup");
			if( inLoadDivId == null || inLoadDivId == ""){
				inLoadDivId = childdiv[1].getAttribute("v-controller")
			}
			var scope = this;
			$http.post("/pweb/HelpContentQry.do",{"id":inLoadDivId})
				.success(function(data, status, headers, config){
					scope.helpContentList = data.List;
					$nativeCall.history.push(function(){
						$nativeCall.backTransition();
						$timeout(function(){
							$('#Help').hide();
							$("#HelpImg").show();
							$('#content').css("display","block");
							$nativeCall.startTransition();
						}, 50);
					});
					$nativeCall.forWardTransition();
					$timeout(function(){
						$('#content').css("display","none");
						$('#Help').show();
						$("#HelpImg").hide();
						window.scrollTo(0, 0);
						$nativeCall.startTransition();
					}, 50);
				})
				.error(function(data, status, headers, config){
					$nativeCall.alert(angular.toJson(data));
				});
			
		};	
	}
	
	runNativeCall.$inject = ['$nativeCall'];
	function runNativeCall($nativeCall) {
		window.NativeCall = $nativeCall;
	}
	
	runOS.$inject = ['$os'];
	function runOS($os){
		window.OS = $os;
	}

	mod.run(runTargets);
	mod.run(runOS);
	mod.run(runRootScope);
	mod.run(runNativeCall);

})(window, window.angular, window.jQuery);
