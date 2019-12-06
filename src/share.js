import configUtils from './configs'

let activeEl = null

function checkSharedTitle () {
  const items = configUtils.items
  const categories = configUtils.categories
  const url = new URL(location.href)
  const t = url.searchParams.get('title')
  const find = items.find((i) => i.title === t)
  if (!find) {
    return
  }

  const tag = find.tags[0]

  const category = categories.find((c) => c.tags.indexOf(tag) >= 0)

  if (category) {
    document.getElementById(category.title).click()
    setTimeout(() => {
      activeEl = document.getElementById(find.title)
      activeEl.classList.add('active')
    }, 10)
  }
}

function removeActiveState () {
  if (activeEl) {
    activeEl.classList.remove('active')
  }
}

export function initShare () {
  window.addEventListener('load', checkSharedTitle)
  window.addEventListener('click', removeActiveState)
}
