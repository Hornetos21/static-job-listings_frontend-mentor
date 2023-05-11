import Card from './Card.jsx'

import '../scss/list.scss'
import { useDispatch, useSelector } from 'react-redux'
import { selectVisiblePositions } from '../store/positions/positions-selectors.js'
import { addTag } from '../store/tags/tags-actions.js'
import { selectTags } from '../store/tags/tags-selectors.js'

const JobList = (/*{ cards, onTagListClick }*/) => {
  const currentTags = useSelector(selectTags)
  const jobs = useSelector((state) =>
    selectVisiblePositions(state, currentTags)
  )

  const dispatch = useDispatch()

  const onTagListClick = (tag) => {
    dispatch(addTag(tag))
  }

  return (
    <ul className="list">
      {/*{cards.map((card) => (*/}
      {/*  <Card {...card} key={card.id} onTagListClick={onTagListClick} />*/}
      {/*))}*/}
      {jobs.map((card) => (
        <Card {...card} key={card.id} onTagListClick={onTagListClick} />
      ))}
    </ul>
  )
}

export default JobList
