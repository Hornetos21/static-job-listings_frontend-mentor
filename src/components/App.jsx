import { useState, useEffect } from 'react'

import Filter from './Filter'
import Footer from './footer'
import Header from './header'
import List from './list'

import '../scss/app.scss'

const DATA_JSON = '../data/data.json'

function App() {
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
        setData({ ...data, cards: [...newCards] })
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
            <Filter
              tags={data.tagsFilter}
              onClear={clearTags}
              onDelete={deleteTag}
            />
            <List cards={filteredCards} onTagListClick={onTagListClick} />
          </>
        )}
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  )
}

export default App
