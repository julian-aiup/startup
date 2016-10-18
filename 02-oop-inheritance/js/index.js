class EventEmitter {
  constructor() {
    this.events = [];
  }

  on(event, listener) {
    let eventFound = this.events.find(function(element) {
      if (event === element.name) return element;
    });
    let eventListenersLength;
    if (eventFound) {
      eventFound.listeners.push(listener);
    } else {
      eventListenersLength = this.events.push({ name: event, listeners: [] });
      this.events[eventListenersLength - 1].listeners.push(listener);
    }
  }

  emit(event) {
    let eventFound = this.events.find(function(element) {
      if (event === element.name) return element;
    });
    eventFound.listeners.map(function(listener) {
      listener(event);
    });
  }

  off(event, listener) {
    let eventFound = this.events.find(function(element) {
      if (event === element.name) {
        return element;
      }
    });
    let listeners;
    if (eventFound) {
      listeners = eventFound.listeners;
      listeners = eventFound.listeners.filter(function(item) {
        if (item !== listener) {
          return item;
        }
      });
      if (!listeners.length) {
        this.events = this.events.filter(function(item) {
          if (eventFound !== item) {
            return item;
          }
        });
      }
    }
  }
}

//---TESTING EVENTEMITTER CLASS---
function hello() {
  alert("Hello");
}

let eventEmitter = new EventEmitter();
eventEmitter.on("exampleEvent", hello);

setTimeout(function() {
  eventEmitter.emit("exampleEvent");
  eventEmitter.off("exampleEvent", hello);
}, 3000);
//---  ---

class Logger {
  constructor() {

  }

  log(info) {
    console.log("The '" + info + "' event has been emmited");
  }
}

class Movie extends EventEmitter {
  constructor(title, year, duration) {
    super();
    this.title = title;
    this.year = year;
    this.duration = duration;
  }

  play() {
    this.emit("play");
  }

  pause() {
    this.emit("pause");
  }

  resume() {
    this.emit("resume");
  }
}

let social = {
  share: function (friendName) {
    console.log(`${friendName} share ${this.title}`);
  },

  like: function (friendName) {
    console.log(`${friendName} likes ${this.title}`);
  }
}

//---TESTING MOVIE CLASS---
let terminator = new Movie('Terminator', 1984, 90);
let logger = new Logger();
Object.assign(terminator, social);
terminator.on("play", logger.log);
setTimeout(function() {
  terminator.play();
}, 5000);
terminator.share("Mike Blossom");
terminator.like("Robert");
//---  ---
