chrome.runtime.onInstalled.addListener(function () {
  // console.log("Webpage Screenshot Extension Installed");
});

chrome.action.onClicked.addListener(async function () {
  try {
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const webpageUrl = tabs[0].url;

    const response = await fetch("https://hutils.loxal.net/whois");
    const data = await response.json();
    const ipAddress = data.ip;

    const timestamp = new Date().getTime();
    const filename = `${timestamp}#${ipAddress}#${btoa(webpageUrl)}.png`;

    const dataUrl = await chrome.tabs.captureVisibleTab(null, {
      format: "png",
    });

    await chrome.downloads.download({
      url: dataUrl,
      filename: filename,
      saveAs: true,
    });
  } catch (error) {
    console.error("Error:", error);
  }
});
