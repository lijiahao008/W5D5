const Util = require('./util.js');
const MovingObject = require('./moving_object.js');

function Bullet(pos, game) {
  this.COLOR = "#000000";
  this.RADIUS = 3;
  this.vel = [0,0];
  this.game = game;

  MovingObject.call(this, {pos: pos, radius: this.RADIUS,
                    color: this.COLOR, vel: this.vel, game: this.game});
  }

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;


module.exports = Bullet;
