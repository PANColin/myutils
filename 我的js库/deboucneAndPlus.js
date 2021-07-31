// 防抖和节流：降低事件触发的频率
// 防抖 deboucne -- 保证事件触发间隔至少为 n秒，如果在间隔时间内又触发了事件，重新计时
// let timer = null;
function debounce(func, wait = 300) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      func.apply(this, arguments);
    }, wait);
  };
}

function debounce_now(func, wait = 300) {
  let timer = null;
  return function () {
    if (timer) {
      clearTimeout(timer);
    } else {
      func.apply(this, arguments);
    }
    timer = setTimeout(function () {
      timer = null;
    }, wait);
  };
}

// 节流 throttle：间隔事件执行一次函数，间隔事件内触发函数忽略
function throttle(func, wait = 300) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(function () {
        func.apply(this, arguments);
        timer = null;
      }, wait);
    }
  };
}

function throttle_now(func, wait = 300) {
  let timer = null;
  return function () {
    if (!timer) {
      // func.call(this);
      func.apply(this, arguments);
      timer = setTimeout(function () {
        timer = null;
      }, wait);
    }
  };
}

function throttle_time(func, wait) {
  let startTime = Date.now();
  return function () {
    if (Date.now() - startTime > wait) {
      func.apply(this, arguments);
      startTime = Date.now();
    }
  };
}
export { debounce, debounce_now, throttle, throttle_now, throttle_time };
