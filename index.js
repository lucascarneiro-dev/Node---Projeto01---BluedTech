const express = require("express");
const GameSchema = require("./database/models/game");
const mongoose = require("./database/index");

const app = express();
const port = 3000;
app.use(express.json());

// [GET] /games - Return all games from database
app.get("/games", async (req, res) => {
  const games = await GameSchema.find();
  res.send({ games });
});

// [GET] /games/:id - Return a game by id
app.get("/games/:id", async (req, res) => {
  const id = req.params.id;
  // Check if received id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Invalid ID" });
    return;
  }
  // Search for game using provided id
  const game = await GameSchema.findById(id);
  // Check if game was found
  if (!game) {
    res.status(404).send({ erro: "Game not found!" });
    return;
  }
  res.send({ game });
});

// [POST] - /games - Create new game
app.post("/games", async (req, res) => {
  const game = req.body;

  if (!game || !game.name || !game.genre || !game.platform) {
    res.status(400).send({ error: "Invalid game data" });
    return;
  }

  const newgame = await new GameSchema(game).save();

  res.status(201).send({ newgame });
});

// [PUT] - games/:id Update one game by id

app.put("/games/:id", async (req, res) => {
  const id = req.params.id;
  const newgame = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Invalid Id" });
    return;
  }

  const game = await GameSchema.findById(id);

  if (!game) {
    res.status(404).send({ erro: "Game not found" });
    return;
  }

  if (!game || !game.name || !game.platform) {
    res.status(400).send({ error: "Invalid game data" });
    return;
  }

  await GameSchema.findOneAndUpdate({ _id: id }, newgame);
  const gameUpdated = await GameSchema.findById(id);

  res.send({ gameUpdated });
});

// [DELETE] - /games/:id - Delete game by Id
app.delete("/games/:id", async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(422).send({ error: "Invalid Id" });
    return;
  }

  const game = await GameSchema.findById(id);

  if (!game) {
    res.status(404).send({ error: "Game not found!" });
    return;
  }

  await GameSchema.findByIdAndDelete(id);
  res.send({message: 'Game sucessfully deleted!'})
});

app.listen(port, () =>
  console.log(`Server online http://localhost:${port}`)
);