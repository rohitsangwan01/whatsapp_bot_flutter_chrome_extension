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
          script.src = 'https://f2d0-103-167-174-240.ngrok-free.app/content.js';
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
