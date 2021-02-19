import { h } from 'preact'
import configUtils from './configs'
import { hrefUtil, hrefParams } from './share'

function FooterLink({ url, icon }) {
  return (
    <a
      className="navigation-item__link alias"
      title={url}
      href={url}
      rel="noopener noreferrer"
      target="_blank"
    >
      <i className={icon + ' icon'} />
    </a>
  )
}

function Favicon({ icon, homeUrl }) {
  const favicon =
    icon || 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + homeUrl
  const isSvg = icon && !icon.startsWith('http')

  return isSvg ? (
    <i className={`navigation-item__icon ${favicon}`} />
  ) : (
    <img src={favicon} className="navigation-item__icon" />
  )
}

function NavigationItem({ item, site, onClick }) {
  // placeholder empty item
  if (!item) {
    return <div className="navigation-item" style={{ opacity: 0 }} />
  }

  const sortLinkKeys = Object.keys(item.links || {})
  sortLinkKeys.sort((a, b) => (a > b ? -1 : 1))

  const $links = sortLinkKeys.map(type => {
    const url = item.links[type]
    const faIcon = configUtils.getIconClass(type)
    return <FooterLink url={url} key={item.title + url} icon={faIcon} />
  })

  const changeUrlToShare = () => {
    hrefUtil.setParam(hrefParams.title, item.title)
  }

  const homeUrl = (item.links || {}).href

  const $tags = item.tags.map(item => (
    <a
      key={item}
      title={item}
      className="navigation-item__tag navigation-item__link"
      onClick={e => onClick(item, e)}
    >
      <i className={configUtils.getIconClass(item) + ' icon'}></i>
    </a>
  ))

  return (
    <div
      className="navigation-item"
      id={item.title}
      title={item.title}
      onClick={changeUrlToShare}
    >
      <div className="navigation-item__header">
        <a
          className="navigation-item__href flex-v-center plain-url"
          href={homeUrl}
          title={homeUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          <Favicon icon={item.icon} homeUrl={homeUrl} />
          <span className="navigation-item__title">{item.title}</span>
        </a>
        <div className="navigation-item__tags flex-v-center ">{$tags}</div>
      </div>
      <div className="navigation-item__body">
        <p className="navigation-item__description">{item.desc}</p>
      </div>
      <div className="navigation-item__divider" />
      <div className="navigation-item__footer">{$links}</div>
    </div>
  )
}

export default function Navigation({ items, site, onClickItem }) {
  const blankItems = [0, 0, 0, 0, 0]

  function clickItem(tag, e) {
    onClickItem(tag, e)
  }

  return (
    <div className="navigation">
      {items.concat(blankItems).map((item, i) => (
        <NavigationItem
          onClick={clickItem}
          item={item}
          key={'navigation' + i}
          site={site}
        />
      ))}
    </div>
  )
}
