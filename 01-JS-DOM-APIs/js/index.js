function fade() {
  setTimeout(function () {
    document.getElementById("fade-in").style.transition = "all 4s ease-out";
    document.getElementById("fade-in").style.opacity = 1;
  }, 3000);
}
