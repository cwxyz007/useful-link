import { h, render, Component } from 'preact'
import './style.less'
import NProgress from 'nprogress'
import Categories from './Categories'
import Navigation from './Navigation'
import { shiciCache, bindAll } from './utils'
import configUtils from './configs'
import SearchBar from './SearchBar'
import Fuse from 'fuse.js'
import Footer from './Footer'

NProgress.configure({
  showSpinner: false
})

const selectCategoryKey = 'category'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      searchText: '',
      /**
       * @type {import('./define').SiteConfig}
       */
      site: null,
      /**
       * @type {string}
       */
      selectedCategory: null,
      /**
       * @type {import('./define').Category[]}
       */
      categories: [],
      shiCi: {}
    }

    /**
     * @type {Fuse}
     */
    this.fuse = null

    this.init()
    this.initJinRiShiCi()

    bindAll(['selectedCategory', 'handleSearchInput'], this)
  }

  async initJinRiShiCi () {
    this.setState({
      shiCi: await shiciCache.get()
    })
  }

  selectedCategory (category) {
    localStorage.setItem(selectCategoryKey, category)

    this.setState({
      selectedCategory: category,
      searchText: ''
    })
  }

  async init () {
    NProgress.start()
    await configUtils.fetchData()

    const siteConfigs = configUtils.site
    const categories = configUtils.categories
    const selectedCategory = localStorage.getItem(selectCategoryKey)
    const selectedCategoryItem =
      configUtils.categories.find((c) => c.title === selectedCategory) || configUtils.categories[0]

    this.setState({
      site: siteConfigs,
      categories,
      selectedCategory: selectedCategoryItem.title
    })

    NProgress.done()
    this.fuse = new Fuse(configUtils.items, {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ['title', 'desc', 'links.web', 'tags']
    })
  }

  handleSearchInput (text) {
    this.setState({
      searchText: text
    })
  }

  render () {
    const { site, selectedCategory, categories, shiCi, searchText } = this.state

    if (!site) {
      return <div />
    }

    const selectedCategoryItem = categories.find((c) => c.title === selectedCategory)

    const bgColor = selectedCategoryItem.bgColor

    const items = searchText ? this.fuse.search(searchText) : configUtils.getItemsByTags(selectedCategoryItem.tags)

    const shiCiTitle = shiCi && shiCi.origin.title
    const shiCiContent = shiCi && `${shiCi.content} 一一 ${shiCiTitle}(${shiCi.origin.author})`
    const hanyuLink = encodeURI(`https://hanyu.baidu.com/s?wd=${shiCiTitle} ${shiCi.origin.author}`)

    return (
      <div className="app">
        <div className="header header-img" style={{ backgroundImage: `url(${site.header.bgImg})` }}>
          <span
            className="header-title ab-v-center"
            style={{
              color: site.header.color,
              fontSize: '1.2em'
            }}
          >
            {shiCiContent}
            <a className="navigation-item__link" target="_blank" href={hanyuLink} rel="noopener noreferrer">
              <i style={{ marginLeft: 10 }} className="fas fa-external-link-alt icon" />
            </a>
          </span>
          <SearchBar onChange={this.handleSearchInput} value={searchText} />
          <a
            className="header-add-site"
            rel="noopener noreferrer"
            href={site.header.edit.addr}
            target="_blank"
            title={site.header.edit.title}
          >
            +
          </a>
        </div>
        <div className="content">
          <Categories
            items={categories}
            site={site}
            selectCategory={this.selectedCategory}
            selectedCategory={selectedCategory}
          />
          <div className="right-box" style={{ backgroundColor: bgColor }}>
            <Navigation items={items} site={site} />
            <Footer />
          </div>
        </div>
      </div>
    )
  }
}

const $div = document.createElement('div')
$div.id = 'app'
document.body.appendChild($div)

render(<App />, $div)
