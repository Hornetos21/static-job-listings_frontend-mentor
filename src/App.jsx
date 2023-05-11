import { useEffect, useState } from 'react'

import FilterPanel from './components/FilterPanel.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import JobList from './components/JobList.jsx'

import './scss/app.scss'
import { useDispatch } from 'react-redux'
import { addPositions } from './store/positions/positions-actions.js'

const DATA_JSON = '../data/data.json'

function App() {
  const dispatch = useDispatch()

  const [data, setData] = useState({
    cards: [],
    tagsFilter: [],
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const { cards, tagsFilter } = data

  const getData = () => {
    fetch(DATA_JSON)
      .then((res) => res.json())
      .then((dataSet) => {
        const newCards = dataSet.map(({ ...job }) => {
          return {
            ...job,
            tags: [job.level, job.role, ...job.languages, ...job.tools],
          }
        })
        dispatch(addPositions(newCards))
        // setData({ ...data, cards: [...newCards] })
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getData()
  }, [])

  const clearTags = () => setData({ ...data, tagsFilter: [] })

  const deleteTag = (tagDel) => {
    const filteredTags = data.tagsFilter.filter((tag) => tag !== tagDel)
    setData({ ...data, tagsFilter: filteredTags })
  }

  const onTagListClick = (tagList) => {
    !tagsFilter.includes(tagList)
      ? setData({ ...data, tagsFilter: [...tagsFilter, tagList] })
      : null
  }

  const filterCards = () =>
    !tagsFilter.length
      ? cards
      : cards.filter((card) =>
          tagsFilter.every((tag) => card.tags.includes(tag))
        )

  const filteredCards = filterCards()

  const errorMessage = error ? (
    <h1 style={{ color: 'rgb(200, 62, 62)' }}>Error: {error}</h1>
  ) : null

  return (
    <>
      <Header />
      <main className="container">
        {errorMessage}
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <FilterPanel
              tags={data.tagsFilter}
              onClear={clearTags}
              onDelete={deleteTag}
            />
            <JobList cards={filteredCards} onTagListClick={onTagListClick} />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
