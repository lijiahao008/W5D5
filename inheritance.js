Function.prototype.inherits = function(parent) {
  function Surrogate() {}
  Surrogate.prototype = parent.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

Function.prototype.inherits = function(parent) {
  child.prototype = Object.create(parent.prototype);
  this.prototype.constructor = this;
};


class MovingObject {
  constructor() {}

  move() {
    console.log("moving");
  }
}
