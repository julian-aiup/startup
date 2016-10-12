function fade() {
  setTimeout(function () {
    document.getElementById("fade-in").style.transition = "all 3s ease-out";
    document.getElementById("fade-in").style.opacity = 1;
  }, 2000);
}

document.getElementById("button-get-repositories").addEventListener("click", function() {
  var keyword = document.getElementById("keyword-repositories").value;
  if (keyword !== "") {
    clearElements();
    var config = getConfig("GET", "https://api.github.com/search/repositories", true, { q: keyword });
    // We define what to do when the promise is resolved/fulfilled with the then() call,
    // and the catch() method defines what to do if the promise is rejected.
    performAJAXCall(config).then(
      function(val) {
        val = JSON.parse(val);
        for(var key in val.items) {
          var node = document.createElement("li");
          var textNode = document.createTextNode(val.items[key].full_name);
          node.appendChild(textNode);
          document.getElementById("repositories-list").appendChild(node);
        }
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
  } else {
    document.getElementById("search-status").innerHTML = "Please enter a keyword.";
  }
});

function performAJAXCall(config) {
  return new Promise(function (resolve, reject) {
    var uri = getURI(config["url"], config["params"]);
    var xhr = new XMLHttpRequest();
    xhr.open(config["method"], uri, config["async"]);
    xhr.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response);
      } else {
        reject("Service not available: " + xhr.statusText);
      }
    };

    xhr.onerror = function () {
      reject("Network failure");
    };

    xhr.send();
  });
}

function getURI(url, args) {
  var uri = url;
  if (args) {
    uri += '?';
    var argcount = 0;
    for (var key in args) {
      if (args.hasOwnProperty(key)) {
        if (argcount++) {
          uri += '&';
        }
        uri += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
      }
    }
  }
  return uri;
}

function clearElements() {
  document.getElementById("status").innerHTML = "";
  document.getElementById("repositories-list").innerHTML = "";
  document.getElementById("search-status").innerHTML = "";
}

function getConfig(method, url, asynchronous, params) {
  return config = {
    "method": method,
    "url": url,
    "asynchronous": asynchronous,
    "params": params
  }
}
