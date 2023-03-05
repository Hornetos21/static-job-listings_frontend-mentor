import './card.scss'
import './tags.scss'
import './badge.scss'

const Card = (cards) => {
   const {
      logo,
      company,
      position,
      postedAt,
      contract,
      location,
      tags,
      addTag,
   } = cards

   const arrTags = tags.map((tag) => (
      <div className="tag" key={tag} onClick={() => addTag(tag)}>
         {tag}
      </div>
   ))

   const newBadge = cards.new ? (
      <div className="badge badge_new">NEW!</div>
   ) : null

   const featuredBadge = cards.featured ? (
      <div className="badge badge_featured">FEATURED</div>
   ) : null

   return (
      <li className="card list__card">
         {console.log('render: Card')}
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
         <div className="tags">{arrTags}</div>
      </li>
   )
}

export default Card
