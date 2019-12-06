import { h } from 'preact'

function FooterLink ({ url, icon }) {
  return (
    <a className="navigation-item__link" title={url} href={url} rel="noopener noreferrer" target="_blank">
      <i className={icon + ' icon'} />
    </a>
  )
}

function Favicon ({ icon, homeUrl }) {
  const favicon = icon || 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + homeUrl
  const isSvg = icon && !icon.startsWith('http')

  return isSvg ? (
    <i className={`navigation-item__icon ${favicon}`} />
  ) : (
    <img src={favicon} className="navigation-item__icon" />
  )
}

function NavigationItem ({ item, site }) {
  // placeholder empty item
  if (item === 0) {
    return <div className="navigation-item" style={{ opacity: 0 }} />
  }

  const sortLinkKeys = Object.keys(item.links || {})
  sortLinkKeys.sort((a, b) => (a > b ? -1 : 1))
  const links = sortLinkKeys.map((type) => {
    const url = item.links[type]
    const faIcon = site.navigation.icons[type]
    return <FooterLink url={url} key={item.title + url} icon={faIcon} />
  })

  const changeUrlToShare = () => {
    history.pushState({}, '', `/?title=${item.title}`)
  }

  const homeUrl = (item.links || {}).web

  return (
    <div className="navigation-item" id={item.title} onClick={changeUrlToShare}>
      <div className="navigation-item__body">
        <a className="flex-v-center plain-url" href={homeUrl} title={homeUrl} rel="noopener noreferrer" target="_blank">
          <Favicon icon={item.icon} homeUrl={homeUrl} />
          <span className="navigation-item__title">{item.title}</span>
        </a>
        <p className="navigation-item__description">{item.desc}</p>
      </div>
      <div className="navigation-item__divider" />
      <div className="navigation-item__footer">{links}</div>
    </div>
  )
}

export default function Navigation ({ items, site }) {
  const blankItems = [0, 0, 0, 0, 0]

  return (
    <div className="navigation">
      {items.concat(blankItems).map((item, i) => (
        <NavigationItem item={item} key={'navigation' + i} site={site} />
      ))}
    </div>
  )
}
