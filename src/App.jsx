import { h, render, Component } from 'preact'
import Axios from 'axios'
import Yaml from 'js-yaml'
import NProgress from 'nprogress'
import './style.less'

NProgress.configure({
  showSpinner: false
})

async function getConfigsData () {
  const { data } = await Axios.get('./configs.yaml')
  return Yaml.load(data)
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      yaml: ''
    }

    this.init()
  }

  async init () {
    NProgress.start()
    const data = await getConfigsData()
    this.setState({
      yaml: Yaml.dump(data)
    })
    NProgress.done()
  }

  render (_, state) {
    return (
      <div className="app">
        <pre>{state.yaml}</pre>
      </div>
    )
  }
}

const $div = document.createElement('div')
$div.id = 'app'
document.body.appendChild($div)

render(<App />, $div)
