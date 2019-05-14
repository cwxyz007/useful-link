import { h } from 'preact'

function NavigationItem ({ item }) {
  return (
    <a href={item.url} rel="noopener noreferrer" target="_blank">
      {item.title}
    </a>
  )
}

export default function Navigation ({ items }) {
  return (
    <div className="navigation">
      {items.map((item) => (
        <NavigationItem item={item} key={item.url} />
      ))}
    </div>
  )
}
