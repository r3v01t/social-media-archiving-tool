console.log("Im the content script");

console.log("[DEBUG]:", window.ethereum, ethereum);

// // Listen for messages from the background script
// chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
//   if (message.action === "getWalletAddress") {
//     console.log("Received message to get wallet address");
//     // Check if the wallet is connected
//     if (typeof ethereum !== "undefined") {
//       // Request permission to access the user's Ethereum accounts
//       ethereum
//         .request({ method: "eth_requestAccounts" })
//         .then((accounts) => {
//           const publicAddress = accounts[0];
//           console.log("adasdasdasdasda1231231", publicAddress);
//           // Send the public wallet address back to the background script
//           chrome.runtime.sendMessage({
//             action: "walletAddress",
//             walletAddress: publicAddress,
//           });
//         })
//         .catch((error) => {
//           console.error("Error requesting accounts:", error);
//           // Send undefined (wallet not connected) back to the background script
//           chrome.runtime.sendMessage({
//             action: "walletAddress",
//             walletAddress: undefined,
//           });
//         });
//     } else {
//       // Send undefined (wallet not connected) back to the background script
//       chrome.runtime.sendMessage({
//         action: "walletAddress",
//         walletAddress: undefined,
//       });
//     }
//   }
// });

// // Send message to background script to indicate that content script is ready
// document.addEventListener("DOMContentLoaded", function () {
//   console.log("TAISdADASDSADASD2");
//   chrome.runtime.sendMessage({ action: "contentScriptReady" });
// });
