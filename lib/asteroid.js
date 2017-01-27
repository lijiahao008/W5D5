const Util = require('./util.js');
const MovingObject = require('./moving_object.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');


function Asteroid(pos, game) {
  const COLOR = "#666666";
  const RADIUS = 30;
  this.game = game;

  MovingObject.call(this, {pos: pos, radius: RADIUS,
                    color: COLOR, vel: Util.randomVec(2), game: this.game});
  }


Util.inherits(Asteroid, MovingObject);


Asteroid.prototype.collideWith = function (otherObject) {
  if (otherObject instanceof Ship ) {
    this.game.ship.relocate();
  }
  else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};
//
// let  a = new Asteroid([0,0]);
// let  b = new Asteroid([1,0]);
// console.log(a);
// console.log(b);

module.exports = Asteroid;
