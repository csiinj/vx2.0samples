/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * @author
 * directive template
 */
(function(window, angular, undefined) {'use strict';

	var mod = angular.module("ui.libraries");
	mod.directive("*ngSubmit", function() {
		return function(scope, element, attrs) {
			element.bind('submit', function(event) {
				var form = scope[attrs.name];
				var inputCtrls = attrs.$$element[0];
				for(var i = 0; i < inputCtrls.length; i++) {
					var ctrl = inputCtrls[i];
					if(['input', 'select'].indexOf(ctrl.tagName.toLowerCase()) !== -1) {
						ctrl.blur();
					}
					var validateAttr = ctrl.getAttribute("validate") || true;
					//默认原输入域的验证属性
					if((ctrl.nodeName === "BUTTON") || (validateAttr === 'false') || ctrl.type==='checkbox') {
						continue;
					}
					var message = {
						required : ctrl.getAttribute("required-message") || "不能为空或格式不正确",
						min : ctrl.getAttribute("min-message") || "最小值:" + ctrl.getAttribute("min"),
						max : ctrl.getAttribute("max-message") || "最大值:" + ctrl.getAttribute("max"),
						minlength : ctrl.getAttribute("minlength-message") || "最小长度:" + ctrl.getAttribute("v-minlength"),
						maxlength : ctrl.getAttribute("maxlength-message") || "最大长度:" + ctrl.getAttribute("v-maxlength"),
						pattern : ctrl.getAttribute("pattern-message") || "格式不正确"
					};
					var ctrlName = ctrl['name'] || ctrl['id'];
					var ctrlComment = ctrl.parentNode.previousElementSibling ? "[" + ctrl.parentNode.previousElementSibling.innerText + "]  " : ctrl.placeholder;
					//var ctrlComment = "[" + ctrl.parentNode.previousElementSibling.innerText + "]  ";
					for(var key in form.$error) {
						for(var j = 0; j < form.$error[key].length; j++) {
							if(ctrlName == form.$error[key][j].$name) {
								scope.toast(ctrlComment + message[key]);
								return;
							}
						}
					}
				}
				scope.$apply(attrs.vSubmit);
				event.stopPropagation();
				event.preventDefault();
			});
		};
	});
})(window, window.angular);

/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * pager directive
 * @auther
 */

(function(window, angular, $) {'use strict';

	var mod = angular.module("ui.libraries");

	mod.directive('ngPager', ['$compile',function($compile) {
		var ngPagerDefinition = {
			compile : function compile(element, attr, transclude) {
				var PAGE_NAME = element.attr('PageName') || element.attr('pageName') || element.attr('pagename') || 'PAGE';
				var PAGE_SIZE = element.attr('PageSize') || element.attr('pageSize') || element.attr('pagesize') || 5;
				PAGE_SIZE = parseInt(PAGE_SIZE);
				var PAGE_ATTR = element.attr('ng-pager');
				var LIST_NAME = PAGE_ATTR.match(/in\s*(\w*)$/)[1];
				element.removeAttr('ng-pager');
				element.attr('ng-repeat', PAGE_ATTR.replace(/in\s*(\w*)$/, 'in ' + PAGE_NAME + '.' + LIST_NAME));
				return {
					post : function postLink(scope, element, attrs) {
						var NewPage = function(page, list) {
							page.$_pageInit = function() {
								page.PageIndex = 0;
								
								page.RecordNumber = list.length;
								page.CurrentPage = list.length == 0 ? 0 : 1;
								page.PageNumber = Math.ceil(list.length / PAGE_SIZE);
								page.$_pageSize = PAGE_SIZE;
								page[LIST_NAME] = list.slice(0, PAGE_SIZE);
							};
							page.moreNextPage = function() {
								var nextStart = pageNext();
								page[LIST_NAME] = page[LIST_NAME].concat(scope[LIST_NAME].slice(nextStart, nextStart + PAGE_SIZE));
								if(page[LIST_NAME].length >= scope[LIST_NAME].length) {
									$(nextButton).hide();
								}
							};
							page.nextPage = function() {
								page.PageIndex = page.PageIndex + page.$_pageSize;
								page.CurrentPage++;
								changePage();
							};
							page.prevPage = function() {
								page.PageIndex = page.PageIndex - page.$_pageSize;
								page.CurrentPage--;
								changePage();
							};
							page.topPage = function() {
								page.PageIndex = 0;
								page.CurrentPage = 1;
								changePage();
							};
							page.bottomPage = function() {
								page.PageIndex = PAGE_SIZE * (page.PageNumber - 1);
								page.CurrentPage = page.PageNumber;
								changePage();
							};
							function changePage() {
								page[LIST_NAME] = list.slice(page.PageIndex, page.PageIndex + PAGE_SIZE);
								window.scrollTo(0, 0);
							}


							page.$_pageInit();
						};
						$compile(element)(scope);
						scope.$watch(LIST_NAME, function(list) {
							scope[PAGE_NAME] = scope[PAGE_NAME] || {};
							NewPage(scope[PAGE_NAME], scope[LIST_NAME] || []);
						});
					}
				};
			}
		};
		return ngPagerDefinition;
	}]);
})(window, window.angular, window.$);



(function(window, angular, $) {'use strict';

	var mod = angular.module("ui.libraries");

	mod.directive('ngPagerdoit', ['$compile',function($compile) {
		var ngPagerDefinition = {
			compile : function compile(element, attr, transclude) {
				var PAGE_NAME = element.attr('PageName') || element.attr('pageName') || element.attr('pagename') || 'PAGE';
				var PAGE_SIZE = element.attr('PageSize') || element.attr('pageSize') || element.attr('pagesize') || 5;
				PAGE_SIZE = parseInt(PAGE_SIZE);
				var PAGE_ATTR = element.attr('ng-pagerdoit');
				var LIST_NAME = PAGE_ATTR.match(/in\s*(\w*)$/)[1];
				element.removeAttr('ng-pagerdoit');
				element.attr('ng-repeat', PAGE_ATTR.replace(/in\s*(\w*)$/, 'in ' + PAGE_NAME + '.' + LIST_NAME));
				return {
					post : function postLink(scope, element, attrs) {
						var NewPage = function(page, list) {
							page.$_pageInit = function() {
								if(page.PageIndex==null ||scope.start==0){
									page.PageIndex = 0;
									page.CurrentPage = list.length == 0 ? 0 : 1;
									page.RecordNumber = scope.totalnumber;
								}else{
									
								}
								
								
								page.PageNumber = Math.ceil(page.RecordNumber / PAGE_SIZE);
								page.$_pageSize = PAGE_SIZE;
								page[LIST_NAME] = list.slice(0, PAGE_SIZE);
							};
							page.nextPage = function(i) {
								var nextStart = pageNext();
								if(i==0||i==null){
									scope.morepage(nextStart,page.PageIndex +page.$_pageSize,PAGE_SIZE,LIST_NAME);
								}else if(i==1){
									scope.morepage1(nextStart,page.PageIndex +page.$_pageSize,PAGE_SIZE,LIST_NAME);
								}
								
								page.CurrentPage++;
								changePage();
							};
							page.prevPage = function(i) {
								page.PageIndex = page.PageIndex - page.$_pageSize;
								if(i==0||i==null){
									scope.morepage(page.PageIndex,page.PageIndex +page.$_pageSize,PAGE_SIZE,LIST_NAME);
								}else if(i==1){
									scope.morepage1(page.PageIndex,page.PageIndex +page.$_pageSize,PAGE_SIZE,LIST_NAME);
								}	
								page.CurrentPage--;
								changePage();
							};
							page.topPage = function(i) {
								page.PageIndex = 0;
								if(i==0||i==null){
									scope.morepage(page.PageIndex,page.PageIndex +page.$_pageSize,PAGE_SIZE,LIST_NAME);
								}else if(i==1){
									scope.morepage1(page.PageIndex,page.PageIndex +page.$_pageSize,PAGE_SIZE,LIST_NAME);
								}
								page.CurrentPage = 1;
								changePage();
							};
							page.bottomPage = function(i) {
								page.PageIndex = PAGE_SIZE * (page.PageNumber - 1);
								if(i==0||i==null){
									scope.morepage(page.PageIndex,page.PageIndex +page.$_pageSize,PAGE_SIZE,LIST_NAME);
								}else if(i==1){
									scope.morepage1(page.PageIndex,page.PageIndex +page.$_pageSize,PAGE_SIZE,LIST_NAME);
								}
								page.CurrentPage = page.PageNumber;
								changePage();
							};
							function pageNext(){
								page.PageIndex = page.PageIndex + page.$_pageSize;
								return page.PageIndex;
							};
							function changePage() {
								page[LIST_NAME] = list.slice(page.PageIndex, page.PageIndex + PAGE_SIZE);
								window.scrollTo(0, 0);
							}


							page.$_pageInit();
						};
						$compile(element)(scope);
						scope.$watch(LIST_NAME, function(list) {
							scope[PAGE_NAME] = scope[PAGE_NAME] || {};
							NewPage(scope[PAGE_NAME], scope[LIST_NAME] || []);
						});
					}
				};
			}
		};
		return vPagerDefinition;
	}]);
})(window, window.angular, window.$);



(function(window, angular, $) {'use strict';

	var mod = angular.module("ui.libraries");

	mod.directive('ngnextPager', ['$compile',function($compile) {
		var ngPagerDefinition = {
			compile : function compile(element, attr, transclude) {
				var PAGE_NAME = element.attr('PageName') || element.attr('pageName') || element.attr('pagename') || 'PAGE';
				var PAGE_SIZE = element.attr('PageSize') || element.attr('pageSize') || element.attr('pagesize') || 5;
				PAGE_SIZE = parseInt(PAGE_SIZE);
				var PAGE_ATTR = element.attr('ng-pager');
				var LIST_NAME = PAGE_ATTR.match(/in\s*(\w*)$/)[1];
				element.removeAttr('ng-pager');
				element.attr('ng-repeat', PAGE_ATTR.replace(/in\s*(\w*)$/, 'in ' + PAGE_NAME + '.' + LIST_NAME));
				return {
					post : function postLink(scope, element, attrs) {
						var NewPage = function(page, list) {
							page.$_pageInit = function() {
								page.PageIndex = 0;
								
								page.RecordNumber = list.length;
								page.CurrentPage = list.length == 0 ? 0 : 1;
								page.PageNumber = Math.ceil(list.length / PAGE_SIZE);
								page.$_pageSize = PAGE_SIZE;
								page[LIST_NAME] = list.slice(0, PAGE_SIZE);
							};
							page.moreNextPage = function() {
								var nextStart = pageNext();
								page[LIST_NAME] = page[LIST_NAME].concat(scope[LIST_NAME].slice(nextStart, nextStart + PAGE_SIZE));
								if(page[LIST_NAME].length >= scope[LIST_NAME].length) {
									$(nextButton).hide();
								}
							};
							page.nextPage = function() {
								page.PageIndex = page.PageIndex + page.$_pageSize;
								page.CurrentPage++;
								changePage();
							};
							page.prevPage = function() {
								page.PageIndex = page.PageIndex - page.$_pageSize;
								page.CurrentPage--;
								changePage();
							};
							page.topPage = function() {
								page.PageIndex = 0;
								page.CurrentPage = 1;
								changePage();
							};
							page.bottomPage = function() {
								page.PageIndex = PAGE_SIZE * (page.PageNumber - 1);
								page.CurrentPage = page.PageNumber;
								changePage();
							};
							function changePage() {
								page[LIST_NAME] = list.slice(page.PageIndex, page.PageIndex + PAGE_SIZE);
								window.scrollTo(0, 0);
							}


							page.$_pageInit();
						};
						$compile(element)(scope);
						scope.$watch(LIST_NAME, function(list) {
							scope[PAGE_NAME] = scope[PAGE_NAME] || {};
							NewPage(scope[PAGE_NAME], scope[LIST_NAME] || []);
						});
					}
				};
			}
		};
		return ngPagerDefinition;
	}]);
})(window, window.angular, window.$);


/**
 * input directive
 * Call native keyboard program
 * @auther
 */

(function(window,angular,$){
	'use strict';
	
	var mod = angular.module("ui.libraries");
	
	
})(window,window.angular,window.$);

/*jshint smarttabs:true, eqeqeq:false, eqnull:true, laxbreak:true*/
/**
 * pager directive
 * @auther
 */

(function(window, angular, $) {'use strict';

	var mod = angular.module("ui.libraries");

	mod.directive('ngMorepage', ['$compile', function($compile) {
		var ngPageDefinition = {
			compile : function compile(element, attr, transclude) {
				var PAGE_NAME = element.attr('PageName')|| element.attr('pageName') || element.attr('pagename')|| 'PAGE';
				var PAGE_SIZE = element.attr('PageSize')|| element.attr('pageSize') || element.attr('pagesize')|| 5;
				PAGE_SIZE = parseInt(PAGE_SIZE);
				var PAGE_ATTR = element.attr('ng-morepage');
				var LIST_NAME = PAGE_ATTR.match(/in\s*(\w*)$/)[1];
		    	element.removeAttr('ng-morepage');
				element.attr('ng-repeat', PAGE_ATTR.replace(/in\s*(\w*)$/, 'in '+ PAGE_NAME + '.' + LIST_NAME));
	    		var nextButton = $('<a class="btn btn-info" id="nextButton" style="width:100%;padding-left:0;padding-right:0;" v-click="' 
	    				+ PAGE_NAME + '.moreNextPage()">查看更多</a>');
	    		element.after(nextButton);
				return {
					post : function postLink(scope, element, attrs) {
						var NewPage = function(page, list) {
							page.$_pageInit = function(){
								page.$_pageIndex=0;
								page.$_pageSize=PAGE_SIZE;
								page[LIST_NAME] = list.slice(0, PAGE_SIZE);
								if(list.length < PAGE_SIZE+1) {
									$(nextButton).hide();
								}
								else
									$(nextButton).show();
							};
							function pageNext(){
								page.$_pageIndex = page.$_pageIndex + page.$_pageSize;
								return page.$_pageIndex;
							};
							page.moreNextPage = function() {
								var nextStart = pageNext();
								page[LIST_NAME] = page[LIST_NAME].concat(scope[LIST_NAME].slice(nextStart, nextStart+PAGE_SIZE));
								if(page[LIST_NAME].length >= scope[LIST_NAME].length){
									$(nextButton).hide();
								}
							};
							page.$_pageInit();
						};
						$compile(element)(scope);
						scope.$watch(LIST_NAME, function(list) {
							scope[PAGE_NAME] = scope[PAGE_NAME] || {};
							NewPage(scope[PAGE_NAME], scope[LIST_NAME] || []);
						});
					}
				};
			}
		};
		return ngPageDefinition;
	}]);
})(window, window.angular, window.$);

(function(window, angular, $) {'use strict';

	var mod = angular.module("ui.libraries");
	mod.directive('infiniteScroll', [
	  '$rootScope', '$window', '$timeout', function($rootScope, $window, $timeout) {
	    return {
	      link: function(scope, elem, attrs) {
	        var checkWhenEnabled, handler, scrollDistance, scrollEnabled;
	        $window = angular.element($window);
	        scrollDistance = 0;
	        if (attrs.infiniteScrollDistance !== null) {
	          scope.$watch(attrs.infiniteScrollDistance, function(value) {
	            return (scrollDistance = parseInt(value, 10));
	          });
	        }
	        scrollEnabled = true;
	        checkWhenEnabled = false;
	        if (attrs.infiniteScrollDisabled !== null) {
	          scope.$watch(attrs.infiniteScrollDisabled, function(value) {
	            scrollEnabled = !value;
	            if (scrollEnabled && checkWhenEnabled) {
	              checkWhenEnabled = false;
	              return handler();
	            }
	          });
	        }
	        handler = function() {
	          var elementBottom, remaining, shouldScroll, windowBottom;
	          windowBottom = $window.height() + $window.scrollTop();
	          elementBottom = elem.offset().top + elem.height();
	          remaining = elementBottom - windowBottom;
	          shouldScroll = remaining <= $window.height() * scrollDistance;
	          if (shouldScroll && scrollEnabled) {
	            if ($rootScope.$$phase) {
	              return scope.$eval(attrs.infiniteScroll);
	            } else {
	              return scope.$apply(attrs.infiniteScroll);
	            }
	          } else if (shouldScroll) {
	            return (checkWhenEnabled = true);
	          }
	        };
	        $window.on('scroll', handler);
	        scope.$on('$destroy', function() {
	          return $window.off('scroll', handler);
	        });
	        return $timeout((function() {
	          if (attrs.infiniteScrollImmediateCheck) {
	            if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
	              return handler();
	            }
	          } else {
	            return handler();
	          }
	        }), 0);
	      }
	    };
	  }
	]);
})(window, window.angular, window.$);
(function(window, angular, $) {'use strict';

	var mod = angular.module("ui.libraries");
	mod.directive('switch', [function() {
		var $switchLeft,$switchRight,$label,$div,myClasses,classes,onLabel="类别",offLabel="代码";
	    return {
	    	required: 'vModel',
	    	restrict: 'AC',
	    	//scope: false,
	    	compile: function(element,attrs,transclude){
	    		return {
	    			pre: function preLink(scope, element, attrs){
						$switchLeft = $('<span>').addClass("switch-left").attr("v-model","switchscroll")
							.addClass(myClasses).html(onLabel);
						$switchRight = $('<span>').addClass("switch-right").attr("v-model","switchscroll")
							.addClass(myClasses).html(offLabel);
						$label = $('<label>').html("&nbsp;").addClass(myClasses);
						element.wrap($('<div class="make-switch has-switch">'));
						$div = element.wrap($('<div>')).parent().data("animated",false);
						if(element.parent().data("animated") === false)
							$div.addClass('switch-animate').data('animated', true);
						$div.append($switchLeft).append($label).append($switchRight);
						if(!angular.isUndefined(scope[attrs.vModel]))
							element.attr("checked","checked");
						$div.addClass(
							element.is(':checked') ? 'switch-on' : 'switch-off'
							//scope[attrs.vModel]==true ? 'switch-on' : 'switch-off'
						);
	    			},
	    			post: function postLink(scope, element, attrs){
	    				var changeStatus = function($this){
							$this.siblings('label').trigger('mousedown').trigger('mouseup').trigger('click');
						};
						$switchLeft.on('click', function(e){
							changeStatus($(this));
						});
						$switchRight.on('click', function(e){
							changeStatus($(this));
						});
						element.on('change', function(e, skipOnChange){
							var $this = $(this), $element = $this.parent()
								,thisState = $this.is(":checked"), state = $element.is('.switch-off');
							e.preventDefault();
							$element.css('left',"");
							if(state === thisState){
								if(thisState){
									$element.removeClass('switch-off').addClass('switch-on');
									scope.$apply(function(){scope["switchscroll"] = true;});
								}
								else {
									$element.removeClass('switch-on').addClass('switch-off');
									scope.$apply(function(){scope["switchscroll"] = false;});
								}
								if($element.data('animated') !== false)
									$element.addClass('switch-animate');
								if(typeof skipOnChange === 'boolean' && skipOnChange) return;
								$element.parent().trigger('switch-change',{'el':$this, 'value':thisState});
							}
						});
						element.parent().find('label').on('mousedown touchstart', function(e){
							var $this = $(this);
							var moving = false;
							e.preventDefault();e.stopImmediatePropagation();
							$this.closest('div').removeClass('switch-animate');
							if($this.closest('.has-switch').is('.deactivate')){
								$this.unbind('click');
							} else {
								$this.on('mousemove touchmove', function(e){
									var $element = $(this).closest('.make-switch')
										, relativeX = (e.pageX || e.originalEvent.targetTouches[0].pageX) - $element.offset().left
										, percent = (relativeX / $element.width()) * 100
										, left = 25, right = 75;
									moving = true;
									if(percent < left) 
										percent = left;
									else if(percent > right)
										percent = right;
									$element.find('>div').css('left',(percent - right) + "%");
								});
								$this.on('click touchend', function(e){
									var $this = $(this), $myInputBox = $this.siblings('input');
									e.stopImmediatePropagation();
									e.preventDefault();
									$this.unbind('mouseleave');
									if(moving)
										$myInputBox.prop('checked', !(parseInt($this.parent().css('left')) < -25));
									else
										$myInputBox.prop("checked", !$myInputBox.is(":checked"));
									moving = false;
									$myInputBox.trigger('change');
									if(parseInt($this.parent().css('left')) < -25){
										$this.parent().css('left','-50px');
										scope.$apply(function(){scope["switchscroll"] = true;});
										scope.switchscroll=true;
									}else{
										$this.parent().css('left','0');
										scope.$apply(function(){scope["switchscroll"] = false;});
										scope.switchscroll=false;
									}
								});
								$this.on('mouseleave', function(e){
									var $this = $(this), $myInputBox = $this.siblings('input');
									e.stopImmediatePropagation();
									e.preventDefault();
									$this.unbind('mouseleave mousemove');
									$this.trigger('mouseup');
									$myInputBox.prop('checked', !(parseInt($this.parent().css('left')) < -25)).trigger('change');
									if(parseInt($this.parent().css('left')) < -25){
										$this.parent().css('left','-50px');
										scope.$apply(function(){scope["switchscroll"] = true;});
										scope.switchscroll=true;
									}else{
										$this.parent().css('left','0');
										scope.$apply(function(){scope["switchscroll"] = false;});
										scope.switchscroll=false;
									}
								});
								$this.on('mouseup', function(e){
									e.stopImmediatePropagation();
									e.preventDefault();
									$(this).trigger('mouseleave');
								});
							}
						});
	    			}
	    		};
	    	}
	    };
	}]);
})(window, window.angular, window.$);


/**
 * @author	lijiangwei
 * directive currency
 */
(function(window, angular, undefined) {'use strict';

	var mod = angular.module("ui.libraries");
	mod.directive("currency", ["$filter",function($filter) {
		return function(scope, element, attrs) {
			var model = attrs.vModel;
			scope.$watch(attrs.vModel, function(value){
				if(value==undefined || value==0) return;
				value = value.toString().replace(/,/g,'');
				var position = value.indexOf(".");
				if(position && (value.length -1 - position <=2 ) ) return;
				if(value.toString().indexOf(".") > 0)
					value = $filter("number")(value,2);
				else 
					value = $filter("number")(value);
				element.val(value);
			});
		};
	}]);
})(window, window.angular);

/*
 * uiMask
 * usage
 * ui-Mask='{"Fixed":2}'  设置小数点后尾数，默认为2位小数 ui-Mask
 */
(function(window, angular, undefined) {'use strict';

var mod = angular.module("ui.libraries");
mod.directive("uiMask", [function() {
	return {
		require: 'vModel',
		restrict: 'A',
		compile: function uiMaskCompilingFunction(){
			var maskDefinitions = {};
			var options = {
				"Fixed":2
			};
			return function uiMaskLinkingFunction(scope, iElement, iAttrs, controller){
				var eventsBound = false,maskPatterns,
					value, valueMasked, isValid,
					oldValue, oldValueUnmasked, oldCaretPosition, oldSelectionLength;
				
				maskDefinitions = angular.fromJson(iAttrs.uiMask || "{}");
				maskDefinitions = angular.extend(options, maskDefinitions);
				function initialize(){
					initializeElement();
					bindEventListeners();
					return true;
				};
				
				function parser(fromViewValue){
					value = unmaskValue(fromViewValue || '');
//					controller.$viewValue = value.length ? maskValue(value) : '';
					return value;
				};
				
				controller.$parsers.push(parser);
				
				function initializeElement(){
					value = oldValueUnmasked = unmaskValue(controller.$modelValue || '');
					valueMasked = oldValue = maskValue(value);
					var viewValue = value.length ? valueMasked : '';
					iElement.val(viewValue);
					controller.$viewValue = viewValue;
				};
				
				function bindEventListeners(){
					if(eventsBound){
						return;
					}
					iElement.bind('input click focus', eventHandler);
//                    iElement.bind('blur', evenouttHandler);
					eventsBound = true;
				};
				
				function unmaskValue(value){
					return value;
				};
				
				function maskValue(unmaskedValue){
					var valueMasked = '';
					angular.forEach(unmaskedValue.split(''), function(chr, i){
                        if(i<12){
						if(chr.match(/[0-9]/)){
							var position = valueMasked.indexOf('.');
							if(position < 0 || valueMasked.length - position < (maskDefinitions.Fixed + 1) )
								valueMasked += chr;
						} else if(chr=='.' && maskDefinitions.Fixed > 0){
							if(valueMasked.indexOf('.') < 0){
								valueMasked += chr;
							}
						}
                    }
                               
					});
					return valueMasked;
				};
                /*function evenouttHandler(e){
                         var val = iElement.val();
                         
                         if(val=="" || val==undefined){
                         
                         }else{
                         var ss=parseFloat(val).toFixed(2);
                         iElement.val(ss);
                         }
                         
                         
                         }*/
				function eventHandler(e){
					e = e || {};
					var eventWhich = e.which,
						eventType = e.type;
					var val = iElement.val(),
						valOld = oldValue,
						valMasked,
						valUnmasked = unmaskValue(val),
						valUnmaskedOld = oldValueUnmasked;
					
					var caretPos = getCaretPosition(this) || 0,
						caretPosOld = oldCaretPosition || 0,
						caretPosDelta = caretPos - caretPosOld,
						
						selectionLenOld = oldSelectionLength || 0,
						isSelected = getSelectionLength(this) > 0,
						wasSelected = selectionLenOld > 0,
						
						isAddition = (val.length > valOld.length) || (selectionLenOld && val.length > valOld.length - selectionLenOld),
						isDeletion = (val.length < valOld.length) || (selectionLenOld && val.length === valOld.length - selectionLenOld),
						isSelection = (eventWhich >= 37 && eventWhich <= 40) && e.shiftKey, // Arrow key codes

						  isKeyLeftArrow = eventWhich === 37,
						// Necessary due to "input" event not providing a key code
						  isKeyBackspace = eventWhich === 8 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === -1)),
						  isKeyDelete = eventWhich === 46 || (eventType !== 'keyup' && isDeletion && (caretPosDelta === 0 ) && !wasSelected),
						
						// Handles cases where caret is moved and placed in front of invalid maskCaretMap position. Logic below
						// ensures that, on click or leftward caret placement, caret is moved leftward until directly right of
						// non-mask character. Also applied to click since users are (arguably) more likely to backspace
						// a character when clicking within a filled input.
						caretBumpBack = (isKeyLeftArrow || isKeyBackspace || eventType === 'click') && caretPos > 0;

						oldSelectionLength = getSelectionLength(this);
					//These events don`t require any action
					if (isSelection || (isSelected && (eventType === 'click' || eventType==="keyup"))) return;
					
					//Update values
					valMasked = maskValue(valUnmasked);
					oldValue = valMasked;
					oldValueUnmasked = valUnmasked;
					iElement.val(valMasked);
					if(eventType === "input"){
						scope.$apply(function (){
            				controller.$setViewValue(valUnmasked);
          				});
					}

					// Caret Repositioning
					
					if(isAddition && (caretPos <=0)){
						
					}
					if(caretBumpBack){
						caretPos--;
					}
					if((caretBumpBack && caretPos < valMasked.length)){
						caretPos++;
					}
					oldCaretPosition = caretPos;
					setCaretPosition(this, caretPos);
				};
				
				function getCaretPosition(input){
					if(input.selectionStart !== undefined){
						return input.selectionStart;
					} else if(document.selection){
						input.focus();
						var selection = document.selection.createRange();
						selection.moveStart('character', -input.value.length);
						return selection.text.length;
					}
					return 0;
				};
				
				function setCaretPosition(input, pos){
					if(input.offsetWidth ===0 || input.offsetHeight ===0){
						return;
					}
					if(input.setSelectionRange){
						input.focus();
						input.setSelectionRange(pos, pos);
					} else if(input.createTextRange){
						//Curse you IE
						var range = input.createTextRange();
						range.collapse(true);
						range.moveEnd('character', pos);
						range.moveStart('character', pos);
						range.select();
					}
				};
				
				function getSelectionLength(input){
					if(input.selectionStart !== undefined){
						return input.selectionEnd - input.selectionStart;
					}
					if(document.selection){
						return document.selection.createRange().text.length;
					}
					return 0;
				}
				
				//init
				initialize();
			};
		}
	};
}]);
})(window, window.angular);

/**
 * 服务端分页方式
 * @author ljw
 */
(function(window, angular, undefined) {
	'use strict';
	angular.module('mapp.libraries').factory('Paginator', 
		[function() {
			return function(callFunction) {
				var paginator = {
					// init
					_load : function() {
						var self = this;
						window.scrollTo(0, 0);
						// 回调函数callFunction(recordNumber,currenIndex, pageSize, data)
						callFunction(
							this.recordNumber,
							this.currentIndex,
							this.pageSize,
							function(data) {
								self.currentPageItems = data.List; //集合
								self.recordNumber = data.recordNumber; //总数
								self.pageSize = parseInt(data.pageSize || self.pageSize); //页数
								self.totalPage = Math.ceil(self.recordNumber / self.pageSize); //总页数
							}
						);
					},
					// prev Page
					prevPage : function() {
						this.currentIndex -= this.pageSize;
						this.currentPage--;
						this._load();
					},
					// next Page
					nextPage : function() {
						this.currentIndex += this.pageSize;
						this.currentPage++;
						this._load();
					},
					// top Page
					topPage : function() {
						this.currentIndex = 0;
						this.currentPage = 1;
						this._load();
					},
					// bottom Page
					bottomPage : function() {
						this.currentIndex = (this.totalPage - 1) * this.pageSize;
						this.currentPage = this.totalPage;
						this._load();
					},
					currentPageItems : [],
					currentIndex : 0,
					totalPage : 0,
					currentPage : 1,
					recordNumber : 0,
					pageSize : 5
				};
				paginator._load();
				return paginator;
			};
		}]
	);
})(window, window.angular);
/**
 * @author	Yolen
 * directive vInputrange
 */
(function(window, angular, undefined) {'use strict';

	var mod = angular.module("ui.libraries");
	mod.directive("vInputrange", function() {
	var directive = {};
	directive.restrict = 'E',
	directive.replace = true;
    directive.template = '<div class="well">'+
					'<div class="row-fluid">'+
						'<div class="span4 text-center" style="padding-left: 0px;">'+
							'<img src="css/images/onegreen.png" style="width:22px;height:22px;margin-bottom: 4px;">'+
							'<span style="color: #66cc00">&nbsp;录入信息</span>'+
						'</div>'+
						'<div class="span4 text-center" style="padding-left: 0px;">'+
							'<img src="css/images/twogray.png" style="width:22px;height:22px;margin-bottom: 4px;">'+
							'&nbsp;确认信息'+
						'</div>'+
						'<div class="span4 text-center" style="padding-left: 0px;">'+
							'<img src="css/images/threegray.png" style="width:22px;height:22px;margin-bottom: 4px;">'+
							'&nbsp;交易成功'+
						'</div>'+
					'</div>'+
				'</div>';
    return directive;
	});
})(window, window.angular);

/**
 * @author	Yolen
 * directive vConfirmrange
 */
(function(window, angular, undefined) {'use strict';

	var mod = angular.module("ui.libraries");
	mod.directive("ngConfirmrange", function() {
	var directive = {};
	directive.restrict = 'E',
	directive.replace = true;
    directive.template = '<div class="well">'+
					'<div class="row-fluid">'+
						'<div class="span4 text-center" style="padding-left: 0px;">'+
							'<img src="css/images/onegreen.png" style="width:22px;height:22px;margin-bottom: 4px;">'+
							'<span style="color: #66cc00">&nbsp;录入信息</span>'+
						'</div>'+
						'<div class="span4 text-center" style="padding-left: 0px;">'+
							'<img src="css/images/twogreen.png" style="width:22px;height:22px;margin-bottom: 4px;">'+
							'<span style="color: #66cc00">&nbsp;确认信息</span>'+
						'</div>'+
						'<div class="span4 text-center" style="padding-left: 0px;">'+
							'<img src="css/images/threegray.png" style="width:22px;height:22px;margin-bottom: 4px;">'+
							'&nbsp;交易成功'+
						'</div>'+
					'</div>'+
				'</div>';
    return directive;
	});
})(window, window.angular);

/**
 * @author	Yolen
 * directive vResultrange
 */
(function(window, angular, undefined) {'use strict';

	var mod = angular.module("ui.libraries");
	mod.directive("ngResultrange", function() {
	var directive = {};
	directive.restrict = 'E',
	directive.replace = true;
    directive.template = '<div class="well" >'+
					'<div class="row-fluid">'+
						'<div class="span4 text-center" style="padding-left: 0px;">'+
							'<img src="css/images/onegreen.png" style="width:22px;height:22px;margin-bottom: 4px;">'+
							'<span style="color: #66cc00">&nbsp;录入信息</span>'+
						'</div>'+
						'<div class="span4 text-center" style="padding-left: 0px;">'+
							'<img src="css/images/twogreen.png" style="width:22px;height:22px;margin-bottom: 4px;">'+
							'<span style="color: #66cc00">&nbsp;确认信息</span>'+
						'</div>'+
						'<div class="span4 text-center" style="padding-left: 0px;">'+
							'<img src="css/images/threegreen.png" style="width:22px;height:22px;margin-bottom: 4px;">'+
							'<span style="color: #66cc00">&nbsp;交易成功</span>'+
						'</div>'+
					'</div>'+
				'</div>';
    return directive;
	});
})(window, window.angular);

/**
 * @author	Yolen
 * directive vResultpage
 */
(function(window, angular, undefined) {'use strict';

	var mod = angular.module("ui.libraries");
	mod.directive("ngResultpage", function() {
	var directive = {};
	directive.restrict = 'E',
	directive.replace = true;
    directive.template = 
					'<div class="well">'+
					'<div class="row-fluid text-center" style="padding-top: 10px;border:none;">'+
					'<img src="css/images/success.png" style="width: 50px;height: 50px;"/>'+
					'</div>'+
					'<div class="row-fluid">'+
					'<div class="span12 text-center" style="font-weight: bold;color:#4e9908;">'+
					'交易成功！'+
					'</div>'+
					'</div>'+
					'</div>';
    return directive;
	});
})(window, window.angular);
