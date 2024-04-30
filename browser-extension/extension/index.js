const createProvider = require("..");
const Eth = require("ethjs");
const { bmvbhash } = require("blockhash-core");
const { getImageData, imageFromBuffer } = require("@canvas/image");

const provider = createProvider();

// renderText("Loading...");

let address = undefined;

if (provider) {
  const eth = new Eth(provider);
  // renderText("MetaMask provider detected.");
  eth.accounts().then((accounts) => {
    address = accounts[0];
    renderText(`Detected MetaMask account ${accounts[0]}`);
  });

  provider.on("error", (error) => {
    if (error && error.includes("lost connection")) {
      // renderText("MetaMask extension not detected.");
    }
  });
} else {
  renderText("MetaMask not detected.");
}

async function callBackend(data) {
  const baseURL = "https://social-media-archiving-tool-nqvf.vercel.app";
  const url = `${baseURL}/archive`;
  const _data = JSON.stringify(data);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: _data,
  });

  const responseData = await response.json();
  renderText(responseData.message);
}

const takeSSBtn = document.getElementById("take-ss");
takeSSBtn.addEventListener("click", async () => {
  if (address === undefined) {
    alert("Please make sure you have MetaMask installed and are logged in!");
    return;
  }

  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const webpageUrl = tabs[0].url;

  const response = await fetch("https://hutils.loxal.net/whois");
  const _data = await response.json();
  const ipAddress = _data.ip;
  const timestamp = new Date().getTime();
  const filename = `${timestamp}#${ipAddress}#${btoa(webpageUrl)}.png`;
  const dataUrl = await chrome.tabs.captureVisibleTab(undefined, {
    format: "png",
  });

  const imageElement = document.getElementById("ss-img");
  imageElement.src = dataUrl;
  imageElement.style.display = "block";

  // calculate pHash
  // remove data URI header
  const base64Image = dataUrl.split(",")[1];
  const buffer = Buffer.from(base64Image, "base64");
  const imageData = await getImageData(await imageFromBuffer(buffer));

  const { width, height, data } = imageData;
  const hexHash = bmvbhash({ width, height, data }, 8);

  await callBackend({
    pHash: hexHash,
    ip: ipAddress,
    timestamp,
    encodedWebPageUrl: btoa(webpageUrl),
    walletAddress: address,
  });

  const saveLocalCheckbox = document.getElementById("save-local");

  if (saveLocalCheckbox.checked) {
    await chrome.downloads.download({
      url: dataUrl,
      filename,
      saveAs: true,
    });
  }
});

function renderText(text) {
  content.innerText = text;
}
