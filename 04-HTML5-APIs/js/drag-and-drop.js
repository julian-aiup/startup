let drop = document.getElementById("drop");

drop.ondragenter = function(event) {
  drop.textContent = '';
  event.stopPropagation();
  event.preventDefault();
}

drop.ondragover = function(event) {
  event.stopPropagation();
  event.preventDefault();
}

drop.ondrop = function(event) {
  event.stopPropagation();
  event.preventDefault();
  dodrop(event);
}

function dodrop(event) {
  let dt = event.dataTransfer;
  let file = dt.files[0];

  let fileReader = new FileReader();
  fileReader.readAsText(file);

  fileReader.onloadend = function() {
    document.getElementById("output").innerHTML = fileReader.result;
    drop.innerHTML = "File " + file.name + " opened";
  };
}
