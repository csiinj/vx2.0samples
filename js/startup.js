/**
 * Manually start the angular and open trasfer.
 */
var init = function() {
	angular.bootstrap(document.body, ["mapp"]);

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return unescape(r[2]);
		return null;
	};

	var actionId = getQueryString("Page");
	window.NoticeSeq = getQueryString("NoticeSeq");
	var url = "htmls/" + actionId + "/" + actionId + ".html";
	if (window.NativeCall) {
		window.NativeCall.loadTrasfer('content', url);
	}
};
if (document.addEventListener) {
	document.addEventListener("DOMContentLoaded", init, false);
} else if (document.attachEvent) {
	document.attachEvent("onreadystatechange", init);
}

