function eCatch(fn) {
  return async function (...args) {
    try {
      return [null, await fn.apply(this, args)]
    } catch (err) {
      return [err]
    }
  }
}

module.exports = eCatch;