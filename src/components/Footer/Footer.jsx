import './Footer.css'
import { Link } from 'react-router-dom'

const Footer = () => {

    return (
        <footer className='footer footer-border'>
            At <Link to="/">BOOMIE</Link>, Book vs. Movie, we're passionate about exploring the similarities
            and differences between your favorite books and their cinematic adaptations.
            <Link to="/sign-up"> Join us</Link> as we explore the fascinating world of book-to-movie adaptations.
        </footer>
    )
}

export default Footer