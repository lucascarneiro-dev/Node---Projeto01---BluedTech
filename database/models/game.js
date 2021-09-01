const mongodb = require("../index");

const GameSchema = new mongodb.Schema({
  name: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  platform:{
    type: String, 
    require: true,
  }
});

const Game = mongodb.model("Game", GameSchema);

module.exports = Game;