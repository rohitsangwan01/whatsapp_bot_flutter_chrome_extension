// Storage Documentation: https://developer.chrome.com/extensions/storage
document.addEventListener("DOMContentLoaded", function () {
  var whatsappBtn = document.getElementById("whatsappBtn");

  chrome.tabs.query({ active: true }, function (tab) {
    whatsappBtn.addEventListener("click", async function () {
      try {
        // await chrome.tabs.executeScript({
        //   file: "content.js",
        // });
        await chrome.tabs.executeScript({
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
        window.close();
      } catch (e) {
        console.log(e);
      }
    });
  });
});
