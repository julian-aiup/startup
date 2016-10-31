class Movie {
  constructor(id, title, year, duration) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.duration = duration;
  }

  getData() {
    return "Movie " + this.title + " from " + this.year + ". Duration: " + this.duration + ".";
  }
}

export {Movie}
