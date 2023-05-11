import '../scss/card.scss'
import '../scss/tags.scss'
import '../scss/badge.scss'
import ListTag from './ListTag.jsx'

const Card = (card) => {
  const {
    logo,
    company,
    position,
    postedAt,
    contract,
    location,
    tags,
    onTagListClick,
    new: newJob,
    featured,
  } = card

  const newBadge = newJob ? <div className="badge badge_new">NEW!</div> : null

  const featuredBadge = featured ? (
    <div className="badge badge_featured">FEATURED</div>
  ) : null

  return (
    <li className="card list__card">
      <div className="card__job">
        <div className="card__job-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="card__job-details">
          <div className="card__job-company">
            <h4 className="card__job-company-name">{company}</h4>
            {newBadge}
            {featuredBadge}
          </div>
          <h4 className="card__job-position">{position}</h4>
          <div className="card__job-descr">
            {postedAt}
            <span>&bull;</span>
            {contract}
            <span>&bull;</span>
            {location}
          </div>
        </div>
      </div>
      <hr />
      <div className="tags">
        {tags.map((tag) => (
          <ListTag
            key={tag}
            name={tag}
            onTagListClick={() => onTagListClick(tag)}
          />
        ))}
      </div>
    </li>
  )
}

export default Card
