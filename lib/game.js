const Asteroid = require('./asteroid.js');
const Ship = require('./ship.js');
const Bullet = require('./bullet.js');

function Game(){
  this.DIM_X = 500;
  this.DIM_Y = 500;
  this.NUM_ASTEROIDS = 20;
  this.asteroids = [];
  this.ship = new Ship(this.randomPosition(), this);
  this.bullets = [];
}

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.ship).concat(this.bullets);
};

Game.prototype.addAsteroids = function(){
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    let newAsteroid = new Asteroid(this.randomPosition(), this);
    this.add(newAsteroid);
  }
};

Game.prototype.add = function (obj) {
  if (obj instanceof Asteroid) {
    this.asteroids.push(obj);
  } else if (obj instanceof Bullet) {
    this.bullets.push(obj);
  }
};

Game.prototype.randomPosition = function () {
  return [Math.floor(Math.random() * this.DIM_X), Math.floor(Math.random() * this.DIM_Y) ];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach((el) => el.draw(ctx));
};

Game.prototype.moveObjects = function () {

  let allobjs = this.allObjects();

  allobjs.forEach((el) => el.move());
};

Game.prototype.wrap = function (pos) {
  let new_x = pos[0];
  let new_y = pos[1];
  if (pos[0] < 0) {
    new_x = this.DIM_X - pos[0];
  }
  else if (pos[0] > this.DIM_X) {
    new_x = 0;
  }
  if (pos[1] < 0) {
    new_y = this.DIM_Y - pos[1];
  }
  else if (pos[1] > this.DIM_Y) {
    new_y = 0;
  }


  return [new_x, new_y];
};

Game.prototype.checkCollisions = function () {
  this.allObjects().forEach((asteroid, idx) => {
    for(let j = 0; j < this.allObjects().length; j++) {
      if ( j === idx) {
        continue;
      }
      if (this.allObjects()[j].isCollidedWith(asteroid)) {
        this.allObjects()[j].collideWith(asteroid);
      }
    }

  });
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();

};

Game.prototype.isOutOfBounds = function (pos) {
  if (pos[0] <= 0 || pos[0] >= this.DIM_X){
    return true;
  }
  else if (pos[1] <= 0 || pos[1] >= this.DIM_Y) {
    return true;
  }
  return false;
};

Game.prototype.remove = function (obj) {


  if (obj instanceof Asteroid) {
    let result = this.asteroids.indexOf(obj);
    if (result !== -1) {
      this.asteroids.splice(result,1);
    }
  } else if (obj instanceof Ship) {
    this.ship.relocate();
  } else if (obj instanceof Bullet) {
    let result = this.bullets.indexOf(obj);
    if (result !== -1) {
      this.bullets.splice(result,1);
    }
  }
};



module.exports = Game;
