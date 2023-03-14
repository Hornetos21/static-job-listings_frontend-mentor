import '../scss/tags.scss'

const FilterTags = ({ tags, onDelete }) =>
  tags.map((tag) => {
    return (
      <div className="tag tag_del" key={tag}>
        <div className="tag_del-name">{tag}</div>
        <button className="tag_del-x" onClick={() => onDelete(tag)}>
          ⨯
        </button>
      </div>
    )
  })

export default FilterTags
