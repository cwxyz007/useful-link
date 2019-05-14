import Axios from 'axios'
import Yaml from 'js-yaml'

export async function getSiteConfigs () {
  const { data } = await Axios.get('./configs/site.yaml')
  return Yaml.load(data)
}

export async function getNavigationData () {
  const { data } = await Axios.get('./configs/navigation.yaml')
  return Yaml.load(data)
}
