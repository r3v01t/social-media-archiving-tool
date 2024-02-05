chrome.runtime.onInstalled.addListener(function () {
  console.log("Webpage Screenshot Extension Installed");
});

chrome.action.onClicked.addListener(function () {
  chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
    chrome.downloads.download({
      url: dataUrl,
      filename: "screenshot.png",
      saveAs: true,
    });
  });
});
