import JobCard from './JobCard.jsx'

import '../../scss/list.scss'
import { useDispatch, useSelector } from 'react-redux'
import { addTag } from '../filters/filters-slice.js'
import { useFetchPositions } from './use-fetch-positions.js'
import { usePositions } from './use-positions.js'

const JobList = () => {
  useFetchPositions()
  const { error, status } = useSelector((state) => state.jobs)
  const dispatch = useDispatch()
  const jobs = usePositions()

  const errorMessage = error ? (
    <h1 style={{ color: 'rgb(200, 62, 62)' }}>Error: {error}</h1>
  ) : null

  const onTagListClick = (tag) => {
    dispatch(addTag(tag))
  }

  return (
    <>
      {errorMessage}
      {status === 'loading' && <h1>Loading...</h1>}
      {status === 'idle' && !error && (
        <ul className="list">
          {jobs.map((card) => (
            <JobCard {...card} key={card.id} onTagListClick={onTagListClick} />
          ))}
        </ul>
      )}
    </>
  )
}

export default JobList
