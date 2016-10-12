// arr must be bidimensional
function makeTable(arr) {
  var tableNode = document.createElement("table");
  document.getElementById("table-div").appendChild(tableNode);

  for (var r = 0; r < arr.length; r++) {
    var rowNode = document.createElement("tr");
    tableNode.appendChild(rowNode);
    for (var c = 0; c < arr[r].length; c++) {
      var columnNode = document.createElement("th");
      var textNode = document.createTextNode(arr[r][c]);
      columnNode.appendChild(textNode);
      rowNode.appendChild(columnNode);
    }
  }
}

let arr = [];
arr[0] = ["Hi", 51, 52];
arr[1] = [60, "Bye", 62];
arr[2] = ["The", 21, 12];

makeTable(arr);
