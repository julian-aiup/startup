function makeTable(numRows, numCols) {
  var tableNode = document.createElement("table");
  document.getElementById("table-div").appendChild(tableNode);

  for (var r = 0; r < numRows; r++) {
    var rowNode = document.createElement("tr");
    tableNode.appendChild(rowNode);
    for (var c = 0; c < numCols; c++) {
      var columnNode = document.createElement("th");
      var textNode = document.createTextNode(r + " - " + c);
      columnNode.appendChild(textNode);
      rowNode.appendChild(columnNode);
    }
  }
}

makeTable(3,4);
