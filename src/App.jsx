import { h, render, Component } from 'preact'
import './style.less'
import NProgress from 'nprogress'
import { getSiteConfigs, getNavigationData } from './configs'
import Categories from './Categories'
import Navigation from './Navigation'
import { shiciCache } from './utils'

NProgress.configure({
  showSpinner: false
})

const selectCategoryKey = 'category'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      site: null,
      selectedCategory: null,
      categories: [],
      navigation: {},
      shiCi: {}
    }

    this.init()
    this.initJinRiShiCi()
    this.selectedCategory = this.selectedCategory.bind(this)
  }

  async initJinRiShiCi () {
    this.setState({
      shiCi: await shiciCache.get()
    })
  }

  selectedCategory (category) {
    localStorage.setItem(selectCategoryKey, category)
    this.setState({
      selectedCategory: category
    })
  }

  async init () {
    NProgress.start()
    const siteConfigs = await getSiteConfigs()
    NProgress.set(0.4)
    const navigation = await getNavigationData()
    NProgress.set(0.6)
    const categories = Object.keys(navigation)

    this.setState({
      site: siteConfigs,
      navigation,
      categories,
      selectedCategory: localStorage.getItem(selectCategoryKey) || categories[0]
    })

    NProgress.done()
  }

  render () {
    const { site, navigation, selectedCategory, categories, shiCi } = this.state

    if (!site) {
      return <div />
    }

    const bgColor = (site.categories[selectedCategory] || {}).bgColor

    const items = navigation[selectedCategory]

    const shiCiContent = shiCi && `${shiCi.content} 一一 ${shiCi.origin.author}`
    return (
      <div className="app">
        <div
          className="header header-img"
          style={{ backgroundImage: `url(${site.header.bgImg})` }}
        >
          <span
            className="header-title ab-v-center"
            style={{
              color: site.header.color,
              fontSize: '1.2em'
            }}
          >
            {shiCiContent}
          </span>
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
          <Navigation items={items} site={site} bgColor={bgColor} />
        </div>
      </div>
    )
  }
}

const $div = document.createElement('div')
$div.id = 'app'
document.body.appendChild($div)

render(<App />, $div)
