import FilterTag from './FilterTag.jsx'

import '../scss/filter.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectTags } from '../store/tags/tags-selectors.js'
import { clearTags, deleteTag } from '../store/tags/tags-actions.js'

const FilterPanel = (
  {
    /*tags,*/
    /*onClear, onDelete,*/
  }
) => {
  const tags = useSelector(selectTags)

  const dispatch = useDispatch()
  const onClear = () => dispatch(clearTags)
  const onDelete = (tag) => dispatch(deleteTag(tag))

  const classes = !tags.length ? 'filter' : 'filter filter_active'

  return (
    <div className={classes}>
      <div className="card filter__card">
        <div id="filter-tags" className="tags">
          {tags.map((tag) => (
            <FilterTag key={tag} name={tag} onDelete={() => onDelete(tag)} />
          ))}
        </div>
        <button className="filter-clear" onClick={onClear}>
          Clear
        </button>
      </div>
    </div>
  )
}

export default FilterPanel
