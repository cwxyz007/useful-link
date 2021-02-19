import Color from 'color'
import NProgress from 'nprogress'
import { contain as containOne } from './utils'
import dbCategories from './configs/categories.json'
import dbNavigation from './configs/navigation.json'
import dbSite from './configs/site.json'

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

    /**
     * @type {Map<string, import('./define').ShareItem[]>}
     */
    this._cacheTagItems = new Map()
  }

  _getSiteConfigs() {
    return dbSite
  }

  _getNavigationData() {
    return dbNavigation
  }

  _getCategoriesData() {
    const data = dbCategories

    const len = data.length
    for (const idx in data) {
      data[idx].bgColor = Color.hsv((360 / len) * idx, 40, 100).toString()
    }

    return data
  }

  fetchData() {
    this.site = this._getSiteConfigs()
    NProgress.set(0.3)
    this.categories = this._getCategoriesData()
    NProgress.set(0.6)
    this.items = this._getNavigationData()
    NProgress.set(0.9)

    this._cacheTags()
  }

  _cacheTags() {
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
  getItemsByTags(tags) {
    const exist = this._cacheTagItems.get(tags.toString())

    if (exist) {
      return exist
    }

    const items = []

    this.items.forEach((item) => {
      const r = containOne(item.tags, tags)

      if (r || tags.includes('*')) {
        items.push(item)
      }
    })

    this._cacheTagItems.set(tags.toString(), items)

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
