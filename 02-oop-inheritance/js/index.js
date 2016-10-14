class Movie {
  constructor(title, year, duration) {
    this.title = title;
    this.year = year;
    this.duration = duration;
  }

  play() { }

  pause() { }

  resume() { }
}

let inception = new Movie("Inception", 2010, 148);
let terminator = new Movie('Terminator', 1984, 90);
console.log(inception instanceof Movie);
console.log(inception instanceof Object);

console.log(typeof Movie);
console.log(typeof Movie.prototype.play);

console.log(inception.title);
console.log(terminator.title);

class EventEmitter {
  constructor() {
    this.events: [];
  }

  on(event, listener) {
    let eventIndex = this.events.indexOf(event);
    let eventFound;
    let eventListenersLength;
    if (eventIndex) {
      eventFound = this.events[eventIndex];
      eventFound.push(listener);
    } else {
      eventListenersLength = this.events.push(event);
      this.events[eventListenersLength - 1].push(listener);
    }
  }

  emit(event) {

  }

  off(event, listener) {

  }
}

let eventEmitter = new EventEmitter();
eventEmitter.on("click", function() {
  alert("hello");
});

// Create an EventEmitter class with the following methods: on, emit, off.
// The on method will allow to pass a callback or listener that will be executed each time a given event is triggered.
// The emit method will allow a class to trigger events to be consumed by other functions/objects.
// The off method will delete the listener.
