import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'
import { ThemeContext } from './contexts/theme.context'
import AppRoutes from './routes/AppRoutes'


const App = () => {

  const { themeValue } = useContext(ThemeContext)

  return (
    <div className={`App pb-5 ${themeValue}`}>

      <Navigation />
      <AppRoutes />
      <Footer />

    </div>
  )
}


export default App
