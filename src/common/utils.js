/*防抖函数*/
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, ...args)
    }, delay)
  }
}

/*节流函数*/
export function throttle(fn, delay) {
  let canRun = true
  return function (...args) {
    if (!canRun) return
    canRun = false
    setTimeout(() => {
      fn.apply(fn, args)
      canRun = true
    }, delay)
  }

}
