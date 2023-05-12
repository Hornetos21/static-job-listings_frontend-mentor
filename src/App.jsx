import { useEffect } from 'react'

import FilterPanel from './components/FilterPanel.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import JobList from './components/JobList.jsx'

import './scss/app.scss'
import { useDispatch, useSelector } from 'react-redux'
import { loadPositions } from './store/positions/positions-actions.js'

const DATA_JSON = '../data/data.json'

function App() {
  const dispatch = useDispatch()
  const { err, status } = useSelector((state) => state.jobs)

  useEffect(() => {
    dispatch(loadPositions())
  }, [])

  const errorMessage = err ? (
    <h1 style={{ color: 'rgb(200, 62, 62)' }}>Error: {err}</h1>
  ) : null

  return (
    <>
      <Header />
      <main className="container">
        {errorMessage}
        {status === 'loading' ? (
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
