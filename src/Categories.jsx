import { h } from 'preact'

export default function Categories ({ items, site, selectCategory, selectedCategory }) {
  return (
    <div className="categories">
      {items.map((category) => {
        const categoryConfig = site.categories[category] || {}

        const name = categoryConfig.title || category
        const icon = categoryConfig.icon
        const classes = ['category-btn']

        const isSelect = selectedCategory === category
        if (isSelect) classes.push('category-btn__selected')

        return (
          <button
            style={{ backgroundColor: categoryConfig.bgColor }}
            className={classes.join(' ')}
            key={category}
            onClick={() => selectCategory(category)}
          >
            {icon && <i className={`category-btn__icon ${icon}`} />}
            {name}
          </button>
        )
      })}
    </div>
  )
}
