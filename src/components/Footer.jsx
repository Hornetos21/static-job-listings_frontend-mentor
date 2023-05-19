import '../scss/footer.scss'

const gitHub = 'https://github.com/Hornetos21'
const urlChallenge =
  'https://www.frontendmentor.io/challenges/job-listings-with-filtering-ivstIPCt'
const Footer = () => {
  return (
    <footer className="attribution">
      Challenge by{' '}
      <a className="link" href={urlChallenge} target="_blank" rel="noreferrer">
        Frontend Mentor
      </a>
      . Coded by{' '}
      <a className="link" href={gitHub}>
        Igor Shapovalov
      </a>
      .
    </footer>
  )
}

export default Footer
