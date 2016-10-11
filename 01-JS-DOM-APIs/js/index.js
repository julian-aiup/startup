function fade() {
  setTimeout(function () {
    document.getElementById("fade-in").style.transition = "all 4s ease-out";
    document.getElementById("fade-in").style.opacity = 1;
  }, 3000);
}

document.getElementById("button-joke").addEventListener("click", function() {
  config = ["GET", "http://api.icndb.com/jokes/random", true];
  var p1 = performAJAXCall(config);
  // We define what to do when the promise is resolved/fulfilled with the then() call,
  // and the catch() method defines what to do if the promise is rejected.
  p1.then(
    function(val) {
      var node = document.createElement("p");
      var textNode = document.createTextNode(val.value.joke);
      node.appendChild(textNode);
      document.getElementById("fade-in").appendChild(node);
    })
  .catch(
    // Log the rejection reason
    function(reason) {
      console.log('Handle rejected promise ('+reason+') here.');
    });
});

function performAJAXCall(config) {
  var p1 = new Promise(
    // The resolver function is called with the ability to resolve or
    // reject the promise
    function(resolve, reject) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          resolve(JSON.parse(this.responseText));
        }
      };
      xhttp.open(config[0], config[1], config[2]);
      xhttp.send();
    }
  );
  return p1;
}
