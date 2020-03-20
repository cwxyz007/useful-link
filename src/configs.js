import stripJsonComments from 'strip-json-comments'
import Color from 'color'
import NProgress from 'nprogress'

/**
 *
 * @param {string} data
 */
function parseJsonWithComment(data) {
  if (typeof data !== 'string') {
    return data
  }

  return JSON.parse(stripJsonComments(data))
}

async function get(url) {
  const data = await fetch(url)
  return data.text()
}

class ConfigUtils {
  constructor() {
    /**
     * @type {import('./define').SiteConfig}
     */
    this.site = {}
    /**
     * @type {import('./define').Category[]}
     */
    this.categories = []
    /**
     * @type {import('./define').ShareItem[]}
     */
    this.items = []

    /**
     * @type {string[]}
     */
    this.tags = []
  }

  async _getSiteConfigs() {
    const data = await get('./configs/site.json')
    return parseJsonWithComment(data)
  }

  async _getNavigationData() {
    const data = await get('./configs/navigation.json')
    return parseJsonWithComment(data)
  }

  async _getCategoriesData() {
    let data = await get('./configs/categories.json')
    data = await parseJsonWithComment(data)

    const len = data.length
    for (const idx in data) {
      data[idx].bgColor = Color.hsv((360 / len) * idx, 40, 100).toString()
    }

    return data
  }

  async fetchData() {
    this.site = await this._getSiteConfigs()
    NProgress.set(0.3)
    this.categories = await this._getCategoriesData()
    NProgress.set(0.6)
    this.items = await this._getNavigationData()
    NProgress.set(0.9)

    this._cacheTags()
  }

  _cacheTags() {
    this.items.forEach(item => {
      item.tags.forEach(t => {
        if (!this.tags.includes(t)) {
          this.tags.push(t)
        }
      })
    })
  }

  /**
   *
   * @param {string[]} tags
   */
  getItemsByTags(tags) {
    const items = []
    this.items.forEach(item => {
      item.tags.forEach(t => {
        if (tags.includes(t) || tags.includes('*')) {
          !items.includes(item) && items.push(item)
        }
      })
    })

    return items
  }

  /**
   *
   * @param {string} name
   */
  getIconClass(name) {
    return this.site.icons[name]
  }
}

const configUtils = new ConfigUtils()

export default configUtils
