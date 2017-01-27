const Util = require('./util.js');

function MovingObject(opts){
  this.pos = opts.pos;
  this.vel = opts.vel;
  this.radius = opts.radius;
  this.color = opts.color;
  this.game = opts.game;
}

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );
  ctx.fill();

};

MovingObject.prototype.move = function () {
  let [x, y] = this.pos;
  let [m, n] = this.vel;
  let potentialPos = [x + m, y + n];
  // this.pos = this.game.wrap([x + m, y + n]);
  if (this.isWrappable) {
    this.pos = this.game.wrap(potentialPos);
  } else {
    if (this.game.isOutOfBounds(potentialPos)) {
      this.game.remove(this);
    } else {
      this.pos = potentialPos;
    }
  }
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  let distance = Util.distance(this.pos, otherObject.pos);
  if (distance < (this.radius + otherObject.radius)) {
    return true;
  }
  else {
    return false;
  }
};

MovingObject.prototype.collideWith = function (otherObject) {
  // this.game.remove(this);
  // this.game.remove(otherObject);
};

MovingObject.prototype.isWrappable = true;


module.exports = MovingObject;
