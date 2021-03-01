const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// Promise 构造函数
function Promise(execute) {
  const that = this;
  this.state = PENDING;
  this.onFufilledFn = [];
  this.onRejectedFn = [];
  const resolve =  function(value) {
    that.state = FULFILLED;
    that.value = value;
    that.onFufilledFn.forEach(fn => {
      fn(value)
    });
  }
  const reject = function(reason) {
    that.state = REJECTED;
    that.reason = reason;
    that.onRejectedFn.forEach(fn => {
      fn(reason)
    });
  }
  try {
    execute(resolve, reject)
  } catch(e) {
    reject(e)
  }
}

// then() 方法  就是根据状态的不同，来调用不同处理终值的函数
// 1. then 方法接受两个函数作为参数，且参数可选。
// 2. 如果可选参数不为函数时会被忽略。
// 3. 两个函数都是异步执行，会放入事件队列等待下一轮 tick。
// 4. 当调用 onFulfilled 函数时，会将当前 Promise 的 value 值作为参数传入。
// 5. 当调用 onRejected 函数时，会将当前 Promise 的 reason 失败原因作为参数传入。
// 6. then 函数的返回值为 Promise。
// 7. then 可以被同一个 Promise 多次调用。
Promise.prototype.then = function(onFufilled, onRejected) {
  const state = this.state;
  const _this = this;
  // 可选参数不为函数时，可忽略
  onFufilled = typeof onFufilled === 'function' ? onFufilled : function(x) { return x };
  onRejected = typeof onRejected === 'function' ? onRejected : function(e) { throw e };
  const promise = new Promise((resolve, reject) => {
     switch(state) {
      case FULFILLED:
        setTimeout(()=>{
          try {
            resolvePromise(promise, onFufilled(_this.value), resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
        break;  
      case REJECTED:
        setTimeout(()=>{
          try {
            resolvePromise(promise, onRejected(_this.reason), resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
        break;
      case PENDING:
        setTimeout(()=>{
          _this.onFufilledFn.push(() => {
            try {
              resolvePromise(promise, onFufilled(_this.value), resolve, reject)
              reject()
            } catch(e) {
              reject(e)
            }
          })
          _this.onRejectedFn.push(() => {
            try {
              resolvePromise(promise, onRejected(_this.reason), resolve, reject)
            } catch(e) {
              reject(e)
            }
          })
        })
        break;
      default:
        break
    }
  })
  return promise
}

//promise：新的Promise对象
//x：上一个then的返回值
//resolve：promise的resolve
//reject：promise的reject
// 1、x 与 promise 相等
// 如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise

// 2、x 为 Promise
// 如果 x 处于等待态， promise 需保持为等待态直至 x 被执行或拒绝
// 如果 x 处于执行态，用相同的值执行 promise
// 如果 x 处于拒绝态，用相同的据因拒绝 promise


// 3
//  3.1、x 为对象或函数
//  a、把 x.then 赋值给 then
//  b、如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
//  c、如果 then 是函数，将 x 作为函数的作用域 this 调用之。传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise:
//      如果 resolvePromise 以值 y 为参数被调用，则运行 [Resolve]
//      如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
//      如果 resolvePromise 和 rejectPromise 均被调用，或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
//      如果 then 不是函数，以 x 为参数执行 promise
//  3.2、如果 x 不为对象或者函数，以 x 为参数执行 promise
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('x 不能等于promise'))
  }
  // x为对象或者函数 
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    try {
      let then = x.then;
      if (typeof then === 'function') {
        then.call(x, (y) => {
          resolve(y)
        }, (r) => {
          reject(r)
        })
      }
    } catch(e) {
      reject(e)
    }
  } else {
    resolve(x)
  }
}

Promise.prototype.resolve = function(value) {
  if (value instanceof Promise) {
    return value;
  }
  return new Promise((resolve, reject) => {
    resolve(value)
  })
}

Promise.prototype.reject = function(reason) {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

// 不管最终状态如何，都会执行
Promise.prototype.finally = function(fn) {
  return this.then((value) => {
    return this.resolve(fn()).then(() => {
      return value;
    })
  }, (error) => {
    return this.resolve(fn()).then(() => {
      throw error;
    })
  })
}

module.exports = Promise;
