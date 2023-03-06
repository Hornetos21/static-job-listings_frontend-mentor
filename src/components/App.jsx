import { useState, useEffect } from 'react'

import Filter from './Filter'
import Footer from './footer'
import Header from './header'
import List from './list'

import './App.scss'

const DATA_JSON = '../data/data.json'

function App() {
   console.log('render: App')

   const [filterTags, setFilterTags] = useState([])
   const [initCards, setInitCards] = useState([])
   const [filteredCards, setFilteredCards] = useState([])
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
            setFilteredCards(cards)
            setInitCards(cards)
         })

         .catch((error) => setError(error.message))
         .finally(() => setIsLoading(false))
   }

   useEffect(() => {
      getData()
   }, [])

   useEffect(() => {
      filteringCards()
   }, [filterTags])

   if (error) {
      return <h1>Error: {error}</h1>
   }

   const clearTags = () => setFilterTags([])

   const deleteTag = (tagDel) => {
      const filteredTags = filterTags.filter((tag) => tag !== tagDel)
      filteringCards()
      setFilterTags(filteredTags)
   }

   const onTagListClick = (tagList) => {
      !filterTags.includes(tagList)
         ? setFilterTags([...filterTags, tagList])
         : null
   }

   const filteringCards = () => {
      const filterCards = initCards.filter((card) =>
         filterTags.every((tag) => card.tags.includes(tag))
      )
      setFilteredCards(filterCards)
   }

   return (
      <>
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
