import './filter.scss'
import './tags.scss'

const Filter = ({ tags, onClear, onDelete }) => {
   console.log('render: Filter')

   const classes = !tags.length ? 'filter' : 'filter filter_active'

   const arrTags = tags.map((tag) => {
      return (
         <div className="tag tag_del" key={tag}>
            <div className="tag_del-name">{tag}</div>
            <button className="tag_del-x" onClick={() => onDelete(tag)}>
               ⨯
            </button>
         </div>
      )
   })

   return (
      <div className={classes}>
         <div className="card filter__card">
            <div id="filter-tags" className="tags">
               {arrTags}
            </div>
            <button className="filter-clear" onClick={() => onClear()}>
               Clear
            </button>
         </div>
      </div>
   )
}

export default Filter
