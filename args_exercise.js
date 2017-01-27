function sum() {
  let total = 0;
  for(let i = 0; i < arguments.length; i++){
    total += arguments[i];
  }
  return total;
}

function sum(...args){
  let total = 0;
  args.forEach((el) => total += el);
  return total;
}

Function.prototype.myBind = function (context) {
  let args = [];
  for(let i = 1; i < arguments.length; i++){
    args.push(arguments[i]);
  }
  let that = this;

  return function () {
    let extraArgs = [];
    for(let j = 0; j < arguments.length; j++){
      extraArgs.push(arguments[j]);
    }
    return that.apply(context, args.concat(extraArgs));
  };
};

Function.prototype.myBind = function (context, ...args) {
  return (...extraArgs) => this.apply(context, args.concat(extraArgs));
};

function curriedSum(numArgs){
  let numbers = [];
  function _curriedSum(num) {
    numbers.push(num);
    if (numbers.length === numArgs) {
      const sum = numbers.reduce((a, b) => a + b);
      return sum;
    } else {
      return _curriedSum;
    }
  }
  return _curriedSum;
}


Function.prototype.curry = function(numArgs){
  let newArgs = [];
  let that = this;
  function curryArgs(arg){
    newArgs.push(arg);
    if (newArgs.length === numArgs) {
      return that.apply(that, newArgs);
    }else {
      return curryArgs;
    }
  }
  return curryArgs;
};

Meagan.purr('hello','fine', 'good');
Meagan.curry(3)('hello')('fine')('good');


Function.prototype.curry = function(numArgs){
  let newArgs = [];
  let that = this;
  function curryArgs(arg){
    newArgs.push(arg);
    if (newArgs.length === numArgs) {
      return that.call(that, ...newArgs);
    }else {
      return curryArgs;
    }
  }
  return curryArgs;
};
