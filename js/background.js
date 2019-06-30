var running = false;
var path_name = "";


// 当打开百度网盘页面时, 激活插件
chrome.runtime.onInstalled.addListener(function () {
	// Replace all rules ...
	chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
		// With a new rule ...
		chrome.declarativeContent.onPageChanged.addRules([
			{
				// That fires when a page's URL contains a 'g' ...
				conditions: [
					new chrome.declarativeContent.PageStateMatcher({
						pageUrl: { urlContains: "pan.baidu.com/s/" },
					})
				],
				// And shows the extension's page action.
				actions: [new chrome.declarativeContent.ShowPageAction()]
			}
		]);
	});
});

function executeScriptWithJQuery(tab_id, code, file, callback) {
	chrome.tabs.executeScript(tab_id, {
		file: "js/jquery.js",
		runAt: "document_start"
	}, function (result) {
		if (code) {
			chrome.tabs.executeScript(tab_id, {
				code: code,
				runAt: "document_start"
			}, function (result) {
				chrome.tabs.executeScript(tab_id, {
					file: file,
					runAt: "document_end"
				}, callback);
			});
		} else {
			chrome.tabs.executeScript(tab_id, {
				file: file,
				runAt: "document_end"
			}, callback);
		}
	});
}

// 点击插件时执行
chrome.pageAction.onClicked.addListener(function (tab) {
	executeScriptWithJQuery(tab.id, `var path_name = "${path_name}";`, "js/c_baidupan_download_page.js");
});
