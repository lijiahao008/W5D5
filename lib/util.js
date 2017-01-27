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
