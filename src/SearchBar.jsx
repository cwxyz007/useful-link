import { h, Component } from 'preact'
import { bindAll } from './utils'

export default class SearchBar extends Component {
  constructor ({ value, onChange }) {
    super({ value, onChange })
    this.state = {
      value
    }

    this.focus = false

    bindAll([this.clearInput, this.handleInput], this)
  }

  clearInput () {
    this.props.onChange('')
  }

  handleInput (e) {
    this.props.onChange(e.target.value)
  }

  render ({ value }) {
    const SearchIcon = () =>
      value ? <i className="far fa-times-circle" onClick={this.clearInput} /> : <i className="fas fa-search" />

    return (
      <div className="search-bar ab-v-center">
        <input className="search-input" type="text" value={value} onInput={this.handleInput} placeholder="搜索" />
        <button className="search-btn">
          <SearchIcon />
        </button>
      </div>
    )
  }
}
