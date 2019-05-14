import { h, render, Component } from 'preact'
import './style.less'
import NProgress from 'nprogress'
import { getSiteConfigs, getNavigationData } from './configs'
import Categories from './Categories'
import Navigation from './Navigation'

NProgress.configure({
  showSpinner: false
})

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      site: null,
      selectedCategory: null,
      categories: [],
      navigation: {}
    }

    this.init()
    this.selectedCategory = this.selectedCategory.bind(this)
  }

  selectedCategory (category) {
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
      selectedCategory: categories[0]
    })

    NProgress.done()
  }

  render () {
    const { site, navigation, selectedCategory, categories } = this.state

    if (!site) {
      return <div />
    }

    const items = navigation[selectedCategory]
    return (
      <div className="app">
        <div className="header header-img" style={{ backgroundImage: `url(${site.header.bgImg})` }}>
          <span className="header-title ab-v-center">Ex Sample Navigation</span>
        </div>
        <div className="content">
          <Categories
            items={categories}
            site={site}
            selectCategory={this.selectedCategory}
            selectedCategory={selectedCategory}
          />
          <Navigation items={items} />
        </div>
      </div>
    )
  }
}

const $div = document.createElement('div')
$div.id = 'app'
document.body.appendChild($div)

render(<App />, $div)
