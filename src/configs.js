import stripJsonComments from 'strip-json-comments'
import NProgress from 'nprogress'

/**
 *
 * @param {string} data
 */
function parseJsonWithComment (data) {
  if (typeof data !== 'string') {
    return data
  }

  return JSON.parse(stripJsonComments(data))
}

async function get (url) {
  const data = await fetch(url)
  return data.text()
}

class ConfigUtils {
  constructor () {
    /**
     * @type {import('./define').SiteConfig}
     */
    this.site = null
    /**
     * @type {import('./define').Category[]}
     */
    this.categories = null
    /**
     * @type {import('./define').ShareItem[]}
     */
    this.items = null

    /**
     * @type {string[]}
     */
    this.tags = []
  }

  async _getSiteConfigs () {
    const data = await get('./configs/site.json')
    return parseJsonWithComment(data)
  }

  async _getNavigationData () {
    const data = await get('./configs/navigation.json')
    return parseJsonWithComment(data)
  }

  async _getCategoriesData () {
    const data = await get('./configs/categories.json')
    return parseJsonWithComment(data)
  }

  async fetchData () {
    this.site = await this._getSiteConfigs()
    NProgress.set(0.3)
    this.categories = await this._getCategoriesData()
    NProgress.set(0.6)
    this.items = await this._getNavigationData()
    NProgress.set(0.9)

    this._cacheTags()
  }

  _cacheTags () {
    this.items.forEach((item) => {
      item.tags.forEach((t) => {
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
  getItemsByTags (tags) {
    const items = []
    this.items.forEach((item) => {
      item.tags.forEach((t) => {
        if (tags.includes(t)) {
          items.push(item)
        }
      })
    })

    return items
  }
}

const configUtils = new ConfigUtils()

export default configUtils
