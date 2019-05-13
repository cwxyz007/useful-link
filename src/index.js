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

async function start () {
  NProgress.start()
  const data = await getConfigsData()

  const $pre = document.createElement('pre')
  $pre.innerHTML = Yaml.dump(data)
  document.body.appendChild($pre)

  NProgress.done()
}

start()
