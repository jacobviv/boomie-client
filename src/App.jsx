import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Footer from './components/Footer/Footer'
import Navigation from './components/Navigation/Navigation'
import AppRoutes from './routes/AppRoutes'

const App = () => {
  return (
    <div className="App">

      <Navigation />
      <AppRoutes />
      <Footer />

    </div>
  )
}

export default App
