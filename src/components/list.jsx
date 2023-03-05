import Card from './card'
import './list.scss'

const List = ({ cards, addTag }) => {
   return (
      <ul className="list">
         {cards.map((card) => (
            <Card {...card} key={card.id} addTag={addTag} />
         ))}
      </ul>
   )
}

export default List
