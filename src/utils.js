import * as jinrishici from 'jinrishici'

const cacheKey = 'jinrishici'
const expiredTime = 1000 * 60 * 60 * 12 // 12 h

async function getShici () {
  return new Promise((resolve) => {
    jinrishici.load((result) => {
      localStorage.setItem(cacheKey, JSON.stringify(result.data))
      resolve(result.data)
    })
  })
}

const shiciCache = {
  async get () {
    const text = localStorage.getItem(cacheKey)
    if (text) {
      const cachedShici = JSON.parse(text)

      const time = new Date()
      const cacheTime = new Date(cachedShici.cacheAt)

      if (time.getTime() - cacheTime.getTime() >= expiredTime) {
        return getShici()
      } else {
        return cachedShici
      }
    } else {
      return getShici()
    }
  }
}

/**
 *
 * @param {string[]} funcs
 * @param {*} context
 */
function bindAll (funcs, context) {
  funcs.forEach((func) => {
    context[func] = context[func].bind(context)
  })
}

export { shiciCache, bindAll }
