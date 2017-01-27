const Game = require('./game.js');

function GameView(ctx) {
  this.game = new Game();
  this.ctx = ctx;
}

GameView.prototype.start = function () {
  let speed = 1;
  key('w', () => this.game.ship.power([0,-1 * speed]));
  key('s', () => this.game.ship.power([0,speed]));
  key('a', () => this.game.ship.power([-1 * speed,0]));
  key('d', () => this.game.ship.power([speed,0]));
  key('space', () => this.game.ship.fireBullet());
  this.game.addAsteroids();
  setInterval(this.game.step.bind(this.game), 20);
  setInterval(this.game.draw.bind(this.game, this.ctx), 20);
};

module.exports = GameView;
