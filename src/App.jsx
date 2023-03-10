import 'bootstrap/dist/css/bootstrap.min.css'
import { useContext } from 'react'
import './App.css'
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'
import UserMessage from './components/UserMessage/UserMessage'
import { ThemeContext } from './contexts/theme.context'
import AppRoutes from './routes/AppRoutes'


const App = () => {

  const { themeValue } = useContext(ThemeContext)

  return (
    <div className={`App pb-5 ${themeValue}`}>

      <Navigation />
      <AppRoutes />
      <Footer />
      <UserMessage />

    </div>
  )
}


export default App
