import ReactPNG from '../assets/react-js-icon.png'
import ReactSVG from '../assets/react-js-icon.svg'
const Home = (): JSX.Element => {
  return (
    <>
      <h1>
        Redux example - {process.env.NODE_ENV} - {process.env.name}
      </h1>
      <img src={ReactPNG} alt="React icon png" width="100" height="100" />
      <img src={ReactSVG} alt="React icon svg" width="100" height="100" />
    </>
  )
}

export default Home
