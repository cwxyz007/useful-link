export const hrefParams = Object.freeze({
  title: 't',
  category: 'c'
})

export const hrefUtil = {
  /**
   *
   * @param {string} key
   * @param {string} value
   */
  setParam(key, value) {
    const url = new URL(location.href)
    url.searchParams.set(key, value)

    history.pushState({}, '', url.href)
  },
  /**
   *
   * @param {string} key
   */
  getParam(key) {
    const url = new URL(location.href)
    return url.searchParams.get(key)
  }
}

let activeEl = null
function checkSharedTitle() {
  const title = hrefUtil.getParam(hrefParams.title)

  if (!title) {
    return
  }

  const $item = document.getElementById(title)

  if ($item) {
    activeEl = $item
    activeEl.classList.add('active')
  }
}

function removeActiveState() {
  if (activeEl) {
    activeEl.classList.remove('active')
  }

  window.removeEventListener('load', checkSharedTitle)
  window.removeEventListener('click', removeActiveState)
}

export function initShare() {
  window.addEventListener('load', checkSharedTitle)
  window.addEventListener('click', removeActiveState)
}
