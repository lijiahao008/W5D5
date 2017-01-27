/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(1);

	document.addEventListener("DOMContentLoaded", () => {
	  // deb5ugger
	  const canvas = document.getElementById("game-canvas");
	  const ctx = canvas.getContext("2d");
	  const game = new GameView(ctx);
	  game.start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Ship = __webpack_require__(6);
	const Bullet = __webpack_require__(7);

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Ship = __webpack_require__(6);
	const Bullet = __webpack_require__(7);


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


/***/ },
/* 4 */
/***/ function(module, exports) {

	const Util = {
	  inherits (childClass, parentClass) {
	    function Surrogate() {}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },

	  scale(vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  },

	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },

	  distance(pos1, pos2){
	    return Math.sqrt(Math.pow(pos1[0]- pos2[0], 2) + Math.pow(pos1[1]- pos2[1], 2));
	  }

	};

	module.exports = Util;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);

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


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);
	const Bullet = __webpack_require__(7);

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


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Util = __webpack_require__(4);
	const MovingObject = __webpack_require__(5);

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


/***/ }
/******/ ]);