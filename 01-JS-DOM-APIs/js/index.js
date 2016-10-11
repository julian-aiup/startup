function fade() {
  setTimeout(function () {
    document.getElementById("fade-in").style.transition = "all 4s ease-out";
    document.getElementById("fade-in").style.opacity = 1;
  }, 3000);
  console.log("HOLA");
}

document.getElementById("button-joke").addEventListener("click", function() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var xmlDoc = JSON.parse(this.responseText);
      var node = document.createElement("p");
      var textNode = document.createTextNode(xmlDoc.value.joke);
      node.appendChild(textNode);
      document.getElementById("fade-in").appendChild(node);
    }
  };
  xhttp.open("GET", "http://api.icndb.com/jokes/random", true);
  xhttp.send();
});
