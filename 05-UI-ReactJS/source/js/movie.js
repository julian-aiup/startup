class Movie {
  constructor(title, year, duration) {
    this.title = title;
    this.year = year;
    this.duration = duration;
  }

  getData() {
    return "Movie " + this.title + " from " + this.year + ". Duration: " + this.duration + ".";
  }
}

export {Movie}
