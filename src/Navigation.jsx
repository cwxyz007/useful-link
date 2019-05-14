import { h } from 'preact'

function NavigationItem ({ item, site }) {
  if (item === 0) {
    return <div className="navigation-item" style={{ opacity: 0 }} />
  }

  const icon = item.icon || 'https://s2.googleusercontent.com/s2/favicons?domain_url=' + (item.links || {}).web

  const links = Object.keys(item.links || {}).map((type) => {
    const url = item.links[type]
    const faIcon = site.navigation.icons[type]
    return (
      <a
        className="navigation-item__link"
        title={url}
        href={url}
        key={item.title + url}
        rel="noopener noreferrer"
        target="_blank"
      >
        <i className={faIcon + ' icon'} />
      </a>
    )
  })

  return (
    <div className="navigation-item">
      <div className="navigation-item__body">
        <div className="flex-v-center">
          <img src={icon} className="navigation-item__icon" />
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
