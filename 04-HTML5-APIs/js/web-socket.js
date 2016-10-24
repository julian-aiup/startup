let wsUri = "ws://echo.websocket.org/";
let output = document.getElementById("output");
let websocket;

function defineWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    onOpen(evt);
  };
  websocket.onclose = function(evt) {
    onClose(evt);
  };
  websocket.onmessage = function(evt) {
    onMessage(evt);
  };
  websocket.onerror = function(evt) {
    onError(evt);
  };
}

function onOpen(evt) {
  writeToScreen("CONNECTED");
}

function onClose(evt) {
  writeToScreen("DISCONNECTED");
}

function onMessage(evt) {
  writeToScreen('<span style="color: blue;">RESPONSE: ' + evt.data + '</span>');
}

function onError(evt) {
  writeToScreen('<span style="color: red;">ERROR:</span> ' + evt.data);
}

function doSend(message) {
  writeToScreen("SENT: " + message);
  websocket.send(message);
}

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.style.wordWrap = "break-word";
  pre.innerHTML = message;
  output.appendChild(pre);
}

document.getElementById("send").addEventListener("click", function() {
  // 1 = WebSocket ReadyState Open
  if(!websocket || websocket.readyState !== 1) {
    console.log("Open websocket first please");
  } else {
    doSend(document.getElementById("message").value);
  }
});

document.getElementById("open").addEventListener("click", function() {
// 3 = WebSocket ReadyState Closed
  if(!websocket || websocket.readyState === 3) {
    defineWebSocket();
  }
});

document.getElementById("close").addEventListener("click", function() {
  // 1 = WebSocket ReadyState Open
  if(websocket && websocket.readyState === 1) {
    websocket.close();
  }
});
