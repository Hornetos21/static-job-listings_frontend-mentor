import Card from './card'
import './list.scss'

const List = ({ cards, onTagListClick }) => {
   console.log('render: List')

   return (
      <ul className="list">
         {cards.map((card) => (
            <Card {...card} key={card.id} onTagListClick={onTagListClick} />
         ))}
      </ul>
   )
}

export default List
