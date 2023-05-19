import '../../scss/tags.scss'

const FilterTag = ({ onDelete, name }) => {
  return (
    <div className="tag tag_del">
      <div className="tag_del-name">{name}</div>
      <button className="tag_del-x" onClick={onDelete}>
        ⨯
      </button>
    </div>
  )
}

export default FilterTag
