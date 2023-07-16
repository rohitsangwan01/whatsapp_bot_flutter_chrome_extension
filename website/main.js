var submitButton = document.getElementById("submit");
var whatsappBtn = document.getElementById("whatsapp");
var textarea = document.getElementById("jscode");
var addEvent = document.getElementById("addEvent");

textarea.value = "WPP.profile.isBusiness()";

var isConnected = false;

var config = {
  removeClosedTabs: true,
  onHandshakeCallback: function (data) {
    console.log("handshake data", data);
    isConnected = true;
  },
  onChildCommunication: onResult,
};
var parent = new AcrossTabs.default.Parent(config);

whatsappBtn.addEventListener("click", async function () {
  parent.openNewTab({
    url: "https://web.whatsapp.com/",
    windowName: "AcrossTab",
  });
});

submitButton.addEventListener("click", async function () {
  let tabs = await parent.getAllTabs();
  if (tabs.length === 0) {
    alert("No Tab Opened");
    return;
  } else if (!isConnected) {
    alert("Whatsapp is not opened");
    return;
  }
  let result = await executeCode(textarea.value);
  console.log("result", result);
});

addEvent.addEventListener("click", async function () {
  let result = await setEvent(textarea.value, (data) => {
    console.log("Event Triggered", data);
  });
  console.log("result", result);
});

let callbacks = {};

function executeCode(code) {
  const randomId = Math.random().toString(36).substring(2, 8);
  let data = {
    id: randomId,
    code: code,
    isEvent: false,
  };
  parent.broadCastAll(data);
  return new Promise((resolve, reject) => {
    callbacks[randomId] = function (result, error) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
      delete callbacks[randomId];
    };
  });
}

async function setEvent(eventName, callback) {
  const randomId = Math.random().toString(36).substring(2, 8);
  let data = {
    id: randomId,
    code: eventName,
    isEvent: true,
  };
  parent.broadCastAll(data);
  callbacks[randomId] = function (result, error) {
    callback(result);
  };
}

function onResult(data) {
  let callback = callbacks[data.id];
  if (callback) {
    callback(data.result, data.error);
  } else {
    console.log("UnHandled Message", data);
  }
}
