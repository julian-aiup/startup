class Movie {
  constructor(title, year, duration) {
    this.title = title;
    this.year = year;
    this.duration = duration;
  }
  play() {

  }
  pause() {

  }
  resume() {

  }
}

let inception = new Movie("Inception", 2010, 148);
let terminator = new Movie('Terminator', 1984, 90);
console.log(inception instanceof Movie);
console.log(inception instanceof Object);

console.log(typeof Movie);
console.log(typeof Movie.prototype.play);

console.log(inception.title);
console.log(terminator.title);
