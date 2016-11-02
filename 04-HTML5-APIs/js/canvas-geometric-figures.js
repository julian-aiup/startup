document.getElementById("draw").addEventListener("click", function() {
  let canvasTest = document.getElementById("canvasTest");
  let canvasContext = canvasTest.getContext("2d");

  // Draw a rectangle with gradient stroke
  var gradient = canvasContext.createLinearGradient(0,0,170,0);
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  canvasContext.strokeStyle=gradient;
  canvasContext.lineWidth=5;
  canvasContext.strokeRect(20,20,150,100);

  // Draw a rectangle
  canvasContext.fillRect(50, 25, 20, 30);

  // Draw a circle
  canvasContext.beginPath();
  canvasContext.arc(100, 100, 5, 0, 2 * Math.PI);
  canvasContext.fillStyle = "green";
  canvasContext.fill();
  canvasContext.lineWidth = 2;
  canvasContext.strokeStyle = "#003300";
  canvasContext.stroke();

  // Draw a triangle
  canvasContext.beginPath();
  canvasContext.moveTo(70,70);
  canvasContext.lineTo(80,70);
  canvasContext.lineTo(70,80);
  canvasContext.fillStyle = "red";
  canvasContext.fill();
});
