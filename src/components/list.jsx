import Card from './card'

import '../scss/list.scss'

const List = ({ cards, onTagListClick }) => {
  return (
    <ul className="list">
      {cards.map((card) => (
        <Card {...card} key={card.id} onTagListClick={onTagListClick} />
      ))}
    </ul>
  )
}

export default List
