import { h } from 'preact'

export default function Categories ({ items, site, selectCategory, selectedCategory }) {
  return (
    <div className="categories">
      {items.map((category) => {
        const name = site.categories[category] || category
        const isSelect = selectedCategory === category

        return (
          <button key={category} onClick={() => selectCategory(category)} className={isSelect && 'selected'}>
            {name}
          </button>
        )
      })}
    </div>
  )
}
