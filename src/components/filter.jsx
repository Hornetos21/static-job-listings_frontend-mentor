import Tags from './filterTags'

import '../scss/filter.scss'

const Filter = ({ tags, onClear, onDelete }) => {
  const classes = !tags.length ? 'filter' : 'filter filter_active'

  return (
    <div className={classes}>
      <div className="card filter__card">
        <div id="filter-tags" className="tags">
          <Tags onDelete={onDelete} tags={tags} />
        </div>
        <button className="filter-clear" onClick={() => onClear()}>
          Clear
        </button>
      </div>
    </div>
  )
}

export default Filter
