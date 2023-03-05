import { useState, useEffect } from 'react'
import './App.scss'

import Filter from './components/Filter'
import Footer from './components/footer'
import Header from './components/header'
import List from './components/list'

const DATA_JSON = './data.json'

function App() {
   const [filterTags, setFilterTags] = useState([])
   const [initCards, setInitCards] = useState([])
   const [cards, setCards] = useState([])
   const [error, setError] = useState('')
   const [isLoading, setIsLoading] = useState(true)

   const getData = () => {
      fetch(DATA_JSON)
         .then((res) => res.json())
         .then((data) => {
            const cards = data.map(({ ...job }) => {
               return {
                  ...job,
                  tags: [job.level, job.role, ...job.languages, ...job.tools],
               }
            })
            setCards(cards)
            setInitCards(cards)
         })

         .catch((error) => setError(error.message))
         .finally(() => setIsLoading(false))
   }

   useEffect(() => {
      getData()
   }, [])

   useEffect(() => {
      newFilter()
   }, [filterTags])

   // *If makes Error
   if (error) {
      return <h1>Error: {error}</h1>
   }

   const clearTags = () => setFilterTags([])

   const deleteTag = (tagDel) => {
      const filteredTags = filterTags.filter((tag) => tag !== tagDel)
      newFilter()
      setFilterTags(filteredTags)
   }

   const addTagToFilter = (tagList) => {
      !filterTags.includes(tagList)
         ? setFilterTags([...filterTags, tagList])
         : null
   }

   const newFilter = () => {
      console.log('filter')

      const filterCards = initCards.filter((card) =>
         filterTags.every((tag) => card.tags.includes(tag))
      )
      setCards(filterCards)
   }

   return (
      <>
         {console.log('render: App')}
         <Header />
         <main className="container">
            {isLoading ? (
               <h1>Loading...</h1>
            ) : (
               <>
                  <Filter
                     tags={filterTags}
                     onClear={clearTags}
                     onDelete={deleteTag}
                  />
                  <List cards={cards} addTag={addTagToFilter} />
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
