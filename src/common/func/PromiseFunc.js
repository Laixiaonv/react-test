var PENDING = 'pending';
var FULFILLED = 'fulfilled';
var REJECTED = 'rejected';

var that = this;
var promise;
if (that.state === FULFILLED) {
  setTimeout(function() {
    onFulfilled(that.value);
  });
}
if (that.state === REJECTED) {
  setTimeout(function() {
    onRejected(that.reason);
  });
}
if (that.state === PENDING) {
  that.onFulfilledFn = function() {
    onFulfilled(that.value);
  }
  that.onRejectedFn = function() {
    onRejected(that.reason);
  }
}

function Promise(execute) {
  this.state = PENDING;
  function resolve(value) {
    if (this.state === PENDING) {
      this.state = FULFILLED;
      this.value = value;
    }
  }
  function reject(reason) {
    if (this.state === PENDING) {
      this.state = REJECTED;
      this.reason = reason;
    }    
  }

  try {
    execute(resolve, reject)
  } catch (e) {
    reject(e);
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(v) { return v; }
  onRejected = typeof onRejected === 'function' ? onRejected : function(e) { throw e; }
}

