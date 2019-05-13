import * as React from 'react'
import { render } from 'react-dom'
import Axios from 'axios'
import Yaml from 'js-yaml'
import NProgress from 'nprogress'

NProgress.configure({
  showSpinner: false
})

async function getConfigsData () {
  const { data } = await Axios.get('./configs.yaml')
  return Yaml.load(data)
}

class App extends React.Component {
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

  render () {
    return (
      <div className="app">
        <pre>{this.state.yaml}</pre>
      </div>
    )
  }
}

const $div = document.createElement('div')
$div.id = 'app'
document.body.appendChild($div)

render(<App />, $div)
