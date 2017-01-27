const GameView = require('./game_view.js');

document.addEventListener("DOMContentLoaded", () => {
  // deb5ugger
  const canvas = document.getElementById("game-canvas");
  const ctx = canvas.getContext("2d");
  const game = new GameView(ctx);
  game.start();
});
