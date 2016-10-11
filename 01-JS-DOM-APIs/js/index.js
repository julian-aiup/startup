function fade() {
  setTimeout(function () {
    document.getElementById("fade-in").style.transition = "all 4s ease-out";
    document.getElementById("fade-in").style.opacity = 1;
  }, 3000);
}

document.getElementById("button-joke").addEventListener("click", function() {
  var config = {};
  config.method = "GET";
  config.url = "http://api.icndb.com/jokes/random";
  config.async = true;
  // We define what to do when the promise is resolved/fulfilled with the then() call,
  // and the catch() method defines what to do if the promise is rejected.
  performAJAXCall(config).then(
    function(val) {
      val = JSON.parse(val);
      var node = document.createElement("p");
      var textNode = document.createTextNode(val.value.joke);
      node.appendChild(textNode);
      document.getElementById("fade-in").appendChild(node);
    })
  .catch(
    // Log the rejection reason
    function(reason) {
      document.getElementById("fade-in").style.color = "red";
      var node = document.createElement("p");
      var textNode = document.createTextNode("Error: " + reason);
      node.appendChild(textNode);
      document.getElementById("fade-in").appendChild(node);
      console.log("Error: " + reason);
    });
});

function performAJAXCall(config) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open(config["method"], config["url"], config["async"]);

    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject("Service not available");
      }
    };

    xhr.onerror = function () {
      reject("Network failure");
    };

    xhr.send();
  });
}
