import { h } from 'preact'

/**
 *
 * @param {object} param0
 * @param {import('./define').ShareItem[]} param0.items
 */
export default function Categories ({ items, selectCategory, selectedCategory }) {
  return (
    <div className="categories">
      {items.map((item) => {
        const icon = item.icon

        const classes = ['category-btn']

        const isSelect = selectedCategory === item.title
        if (isSelect) classes.push('category-btn__selected')

        return (
          <button
            id={item.title}
            style={{ backgroundColor: item.bgColor }}
            className={classes.join(' ')}
            key={item.title}
            onClick={() => selectCategory(item.title)}
          >
            {icon && <i className={`category-btn__icon ${icon}`} />}
            {item.title}
          </button>
        )
      })}
    </div>
  )
}
