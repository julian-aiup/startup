let canvasTest = document.getElementById("canvasTest");
let canvasContext = canvasTest.getContext("2d");
let x = 0;
let y = 0;
let value = 2;

document.getElementById("draw").addEventListener("click", function() {
  // Draw a rectangle
  canvasContext.fillRect(0, 0, 20, 20);
});

document.getElementById("start").addEventListener("click", function() {
  requestAnimationFrame(animateFunction);
});

function animateFunction() {
  canvasContext.clearRect(0, 0, canvasTest.width, canvasTest.height);
  canvasContext.fillRect(x, y, 20, 20);

  if( x >= 0 ){
    x += value * 2;
    y += value;
    if( x > 280 || y > 130 ) { x = 0; y = 0; }
  }

  requestAnimationFrame(animateFunction);
}
