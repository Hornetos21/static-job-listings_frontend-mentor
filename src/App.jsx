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

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const getData = () => {
    fetch(DATA_JSON)
      .then((res) => res.json())
      .then((dataSet) => {
        const newCards = dataSet.map((job) => {
          return {
            ...job,
            tags: [job.level, job.role, ...job.languages, ...job.tools],
          }
        })
        dispatch(addPositions(newCards))
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    getData()
  }, [])

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
            <FilterPanel />
            <JobList />
          </>
        )}
      </main>
      <Footer />
    </>
  )
}

export default App
