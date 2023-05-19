import FilterPanel from './features/filters/FilterPanel.jsx'
import Footer from './components/Footer.jsx'
import Header from './components/Header.jsx'
import JobList from './features/positions/JobList.jsx'

import './scss/app.scss'

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <FilterPanel />
        <JobList />
      </main>
      <Footer />
    </>
  )
}

export default App
