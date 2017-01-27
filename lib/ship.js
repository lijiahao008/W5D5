const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Bullet = require('./bullet.js');

function Ship(pos, game) {
  this.COLOR = "#32CD32";
  this.RADIUS = 10;
  this.vel = [0, 0];
  this.game = game;

  MovingObject.call(this, {pos: pos, radius: this.RADIUS,
                    color: this.COLOR, vel: this.vel, game: this.game});
  }

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function () {
  this.game.ship.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function (impulse) {
  this.vel = [this.vel[0] + impulse[0], this.vel[1] + impulse[1]];
};

Ship.prototype.fireBullet = function () {
  let bullet = new Bullet(this.pos, this.game);
  if (this.vel.every((el) => el === 0)) {
    bullet.vel = Util.randomVec(1);
  } else {
    bullet.vel = this.vel;
  }
  this.game.add(bullet);
};

module.exports = Ship;
