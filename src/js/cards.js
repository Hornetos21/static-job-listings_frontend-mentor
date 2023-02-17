const URL = './data/data.json'

const getData = async () => {
  const response = await fetch(URL)

  if (!response.ok) {
    throw new Error(`Could not fetch ${URL}, status: ${response.status}`)
  }

  return await response.json()
}

class CardJob {
  constructor({ ...job }, parent) {
    this.id = job.id
    this.company = job.company
    this.logo = job.logo
    this.featured = job.featured
    this.position = job.position
    this.postedAt = job.postedAt
    this.contract = job.contract
    this.location = job.location
    this.role = job.role
    this.new = job.new
    this.level = job.level
    this.languages = job.languages
    this.tools = job.tools
    this.tags = [job.level, job.role, ...job.languages, ...job.tools]
    this.parent = document.querySelector(parent)
  }

  render() {
    const cardElement = document.createElement('li')

    const createBadge = (thisNew, thisFeatured) => {
      const badgeNewElement = document.createElement('div')
      const badgeFeaturedElement = document.createElement('div')

      const newBadge = () => {
        badgeNewElement.textContent = 'NEW!'
        badgeNewElement.classList.add('badge', 'badge_new')
      }
      const featuredBadge = () => {
        badgeFeaturedElement.textContent = 'FEATURED'
        badgeFeaturedElement.classList.add('badge', 'badge_featured')
        cardElement.classList.add('list__card_featured')
      }
      const appendBadge = (element1 = '', element2 = '') => {
        document
          .querySelectorAll('.card__job-company')
          .forEach((div) => div.append(element1, element2))
      }

      if (thisNew && thisFeatured) {
        newBadge()
        featuredBadge()
        return appendBadge(badgeNewElement, badgeFeaturedElement)
      }
      if (thisNew) {
        newBadge()
        return appendBadge(badgeNewElement)
      }
      if (thisFeatured) {
        featuredBadge()
        return appendBadge(badgeFeaturedElement)
      }
    }
    // * Set attributes
    cardElement.setAttribute('data-role', this.role)
    cardElement.setAttribute('data-level', this.level)
    cardElement.setAttribute('data-languages', this.languages)
    cardElement.setAttribute('data-tools', this.tools)
    // * HTML block
    cardElement.innerHTML = /* html */ `
          <div class="card__job" >
            <div class="card__job-logo">
              <img src=${this.logo} alt="logo" />
            </div>
            <div class="card__job-details">
              <div class="card__job-company">
                <h4 class="card__job-company-name">${this.company}</h4>
              </div>
              <h4 class="card__job-position">${this.position}</h4>
              <div class="card__job-descr">
                ${this.postedAt}<span>&bull;</span>${this.contract}<span>&bull;</span>${this.location}
              </div>
            </div>
          </div>
          <hr />
          <div class="tags">
          </div>`
    cardElement.classList.add('card', 'list__card')
    // * Append card
    this.parent.append(cardElement)

    // * Check for badges
    createBadge(this.new, this.featured)

    // * Create and append tags in card
    this.tags.forEach((tag) => {
      const tagElement = document.createElement('div')

      tagElement.textContent = tag
      tagElement.classList.add('tag')
      document
        .querySelectorAll('.tags')
        .forEach((div) => div.append(tagElement))
    })
  }
}

getData().then((data) => {
  data.forEach(({ ...job }) => {
    new CardJob(job, '.list').render()
  })
})

// <div class="badge badge_new">NEW!</div>
// <div class="badge badge_featured">FEATURED</div>
// createBadge('FEATURED', 'badge_featured')

{
  /*  */
}

//  *** badges trables
/* 
  const createBadge = (text, clazz) => {
       const div = document.createElement('div')

      badgeElement.textContent = text
      badgeElement.classList.add('badge', clazz)
      console.log(`render: ${this.id}`, badgeElement)
      return badgeElement
    }


  document.querySelectorAll('.card__job-company').forEach((div, i) => {
  console.log(this.id, 'card: ', i)
  const newBadge = createBadge('NEW!', 'badge_new')
  const featuredBadge = createBadge('FEATURED', 'badge_featured')
  div.append(newBadge, featuredBadge)
  cardElement.classList.add('list__card_featured')
}) */
