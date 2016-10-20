//module social.js
let social = {
  share: function (friendName) {
    console.log(`${friendName} share ${this.title}`);
  },

  like: function (friendName) {
    console.log(`${friendName} likes ${this.title}`);
  }
}

export { social };
