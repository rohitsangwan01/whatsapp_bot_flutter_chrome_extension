chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status == "complete") {
    chrome.tabs.get(tabId, function (tab) {
      if (tab.url.includes("https://web.whatsapp.com/")) {
        console.log("Tab URL: " + tab.url);
        console.log("Injecting script");
        chrome.tabs.executeScript({
          code: `
          const script = document.createElement("script");
          script.type = "text/javascript";
          script.src = 'https://cdn.jsdelivr.net/gh/rohitsangwan01/whatsapp_bot_flutter_chrome_extension@main/content.js';
          script.onload = () => {
            console.log("Script loaded successfully");
          };
          document.body.appendChild(script);
          `,
        });
      }
      // chrome.storage.sync.get(null, function (theValue) {
      //   if (theValue[tab.url] != undefined) {
      //     // chrome.tabs.executeScript(tabId, {code: theValue[tab.url]});
      //     console.log("Trying to Injecting script: " + theValue[tab.url]);
      //   }
      // });
    });
  }
});
