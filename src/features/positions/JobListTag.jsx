const JobListTag = ({ name, onTagListClick }) => {
  return (
    <div className="tag" onClick={onTagListClick}>
      {name}
    </div>
  )
}

export default JobListTag
