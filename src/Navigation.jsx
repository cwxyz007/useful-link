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

  const links = Object.keys(item.links || {}).map((type) => {
    const url = item.links[type]
    const faIcon = site.navigation.icons[type]
    return <FooterLink url={url} key={item.title + url} icon={faIcon} />
  })

  return (
    <div className="navigation-item">
      <div className="navigation-item__body">
        <div className="flex-v-center">
          <Favicon icon={item.icon} homeUrl={(item.links || {}).web} />
          <span className="navigation-item__title">{item.title}</span>
        </div>
        <p className="navigation-item__description">{item.desc}</p>
      </div>
      <div className="navigation-item__divider" />
      <div className="navigation-item__footer">{links}</div>
    </div>
  )
}

export default function Navigation ({ items, site, bgColor }) {
  const blankItems = [0, 0, 0, 0, 0]

  return (
    <div className="navigation" style={{ backgroundColor: bgColor }}>
      {items.concat(blankItems).map((item, i) => (
        <NavigationItem item={item} key={'navigation' + i} site={site} />
      ))}
    </div>
  )
}
