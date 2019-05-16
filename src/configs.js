import Axios from 'axios'
import stripJsonComments from 'strip-json-comments'

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

export async function getSiteConfigs () {
  const { data } = await Axios.get('./configs/site.json')
  return parseJsonWithComment(data)
}

export async function getNavigationData () {
  const { data } = await Axios.get('./configs/navigation.json')
  return parseJsonWithComment(data)
}
