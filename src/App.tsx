import './styles.css'
import ReactPNG from './assets/react-js-icon.png'
import ReactSVG from './assets/react-js-icon.svg'
export const App = (): JSX.Element => {
  const myVar = 'Foobar'
  return (
    <>
      <h1>
        React TypeScript Webpack Base App {process.env.NODE_ENV} -{' '}
        {process.env.name}
      </h1>
      <p>{myVar}</p>
      <img src={ReactPNG} alt="React icon png" width="100" height="100" />
      <img src={ReactSVG} alt="React icon svg" width="100" height="100" />
    </>
  )
}
