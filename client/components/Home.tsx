import Carousel from './Votes-Carousel'

function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">Insight Stack 🗂️</h1>
      <p className="nonce">Click on on a programming language below 👇</p>
      <p className="no-border">
        Click on the right box to go to the next box. Click on the right one to
        go back.
      </p>
      <Carousel />
    </div>
  )
}

export default Home
