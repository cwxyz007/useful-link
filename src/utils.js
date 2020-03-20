import * as jinrishici from 'jinrishici'

const cacheKey = 'jinrishici'
const expiredTime = 1000 * 60 * 60 * 12 // 12 h

async function getShici() {
  return new Promise(resolve => {
    jinrishici.load(result => {
      localStorage.setItem(cacheKey, JSON.stringify(result.data))
      resolve(result.data)
    })
  })
}

export const shiciCache = {
  async get() {
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
export function bindAll(funcs, context) {
  funcs.forEach(func => {
    context[func] = context[func].bind(context)
  })
}

/**
 *
 * @param {any[]} arr1
 * @param {any[]} arr2
 */
export function contain(arr1, arr2) {
  for (const item of arr1) {
    if (arr2.includes(item)) {
      return true
    }
  }

  return false
}
