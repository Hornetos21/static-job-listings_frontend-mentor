const URL = './src/data/data.json'

const list = document.querySelector('.list')
const filter = document.querySelector('.filter')
const filterTags = document.querySelector('#filter-tags')

let arrTags = []
let arrCards = []

/* Functions */

// * Get data
const getData = () => {
   fetch(URL)
      .then((response) => response.json())
      .then((data) => {
         arrCards = data.map(({ ...job }) => {
            return {
               ...job,
               tags: [job.level, job.role, ...job.languages, ...job.tools],
            }
         })
         renderCards(arrCards)
      })
      .catch((error) => console.error(error.message))
}
// * Render cards
const renderCards = (cards) => {
   cards.forEach((card) => {
      const cardElement = document.createElement('li')

      const createBadge = (thisNew, thisFeatured) => {
         const badgeNewElement = document.createElement('div')
         const badgeFeaturedElement = document.createElement('div')

         const badge = (elem, text, ...classes) => {
            elem.textContent = text
            elem.classList.add(...classes)
         }

         const newBadge = () =>
            badge(badgeNewElement, 'NEW!', 'badge', 'badge_new')

         const featuredBadge = () => {
            badge(badgeFeaturedElement, 'FEATURED', 'badge', 'badge_featured')
            cardElement.classList.add('list__card_featured')
         }

         const appendBadge = (element = '') => {
            document
               .querySelectorAll('.card__job-company')
               .forEach((div) => div.append(element))
         }

         if (thisNew) {
            newBadge()
            appendBadge(badgeNewElement)
         }
         if (thisFeatured) {
            featuredBadge()
            appendBadge(badgeFeaturedElement)
         }
      }
      // * Set attributes
      cardElement.setAttribute('data-role', card.role)
      cardElement.setAttribute('data-level', card.level)
      cardElement.setAttribute('data-languages', card.languages)
      cardElement.setAttribute('data-tools', card.tools)
      // * HTML block
      cardElement.innerHTML = /* html */ `
            <div class="card__job" >
              <div class="card__job-logo">
                <img src=${card.logo} alt="logo" />
              </div>
              <div class="card__job-details">
                <div class="card__job-company">
                  <h4 class="card__job-company-name">${card.company}</h4>
                </div>
                <h4 class="card__job-position">${card.position}</h4>
                <div class="card__job-descr">
                  ${card.postedAt}<span>&bull;</span>${card.contract}<span>&bull;</span>${card.location}
                </div>
              </div>
            </div>
            <hr />
            <div id="list-tags" class="tags"></div>`
      cardElement.classList.add('card', 'list__card')
      // * Append card
      list.append(cardElement)

      // * Check for badges
      createBadge(card.new, card.featured)

      // * Create and append tags in card
      card.tags.forEach((tag) => {
         const tagElement = document.createElement('div')

         tagElement.textContent = tag
         tagElement.classList.add('tag')
         document
            .querySelectorAll('#list-tags')
            .forEach((div) => div.append(tagElement))
      })
   })
}
// * Render filter tags
const renderFilterTags = (text) => {
   const tag = document.createElement('div')
   tag.classList.add('tag', 'tag_del')
   tag.innerHTML = /* html */ `
            <div class="tag_del-name">${text}</div>
            <button class="tag_del-x">⨯</button>`
   filterTags.append(tag)
}
// * Check tags in card
const checkTags = (cards, tag) => {
   return cards.filter(
      (card) =>
         tag === card.role || tag === card.level || card.tags.includes(tag)
   )
}
// * Filter cards with check tags
const filterCards = () => {
   let filteredCards = arrCards
   !arrTags.length
      ? filteredCards
      : arrTags.forEach(
           (tag) => (filteredCards = checkTags(filteredCards, tag))
        )
   return filteredCards
}
// * Clear list
const clearList = () => {
   const cards = document.querySelectorAll('.list__card')
   cards.forEach((card) => card.remove())
}
/* Events */

// * Listener list-tags

list.addEventListener('click', (e) => {
   // * Add tag to filter
   if (e.target.matches('.tag')) {
      const tag = e.target.textContent
      filter.classList.add('filter_active')

      if (!arrTags.includes(tag)) {
         renderFilterTags(tag)
         arrTags.push(tag)

         const filteredList = filterCards()
         clearList()
         renderCards(filteredList)
      }
   }
})

// *Listener filter-tags
filter.addEventListener('click', (e) => {
   //  * Listener Remove tag
   if (e.target.matches('.tag_del-x')) {
      filterTags.removeChild(e.target.parentElement)
      arrTags = arrTags.filter(
         (tag) => tag !== e.target.previousElementSibling.innerText
      )
      const filteredList = filterCards()
      clearList()
      renderCards(filteredList)
      !arrTags.length ? filter.classList.remove('filter_active') : null
   }

   // * Listener clear btn
   if (e.target.matches('.filter-clear')) {
      filter.classList.remove('filter_active')
      const flTags = document.querySelectorAll('.tag_del')
      flTags.forEach((tag) => tag.remove())
      clearList()
      arrTags = []
      renderCards(arrCards)
   }
})

// * Init
getData()
