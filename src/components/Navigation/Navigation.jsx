import { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import { ThemeContext } from '../../contexts/theme.context'


const Navigation = () => {

    const { themeValue, switchTheme } = useContext(ThemeContext)
    const { user, logout } = useContext(AuthContext)

    const navbarStyle = themeValue === 'dark' ? 'dark' : 'light'
    const themeText = themeValue === 'light' ? 'Movie Mode' : 'Book Mode'

    return (
        <Navbar bg={navbarStyle} variant={navbarStyle} expand="lg" className='navBar mb-4' >
            <Container>
                <Navbar.Brand href="/">BOOMIE</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/">
                            <Nav.Link as="span">Home</Nav.Link>
                        </Link>
                        <Link to="/battles">
                            <Nav.Link as="span">Battles</Nav.Link>
                        </Link>
                        {
                            user
                                ?
                                <>
                                    <Link to="/battles/create">
                                        <Nav.Link as="span">Create Battle</Nav.Link>
                                    </Link>
                                    <Link>
                                        <Nav.Link as="span" onClick={logout}>Log Out</Nav.Link>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to="/login">
                                        <Nav.Link as="span">Log In</Nav.Link>
                                    </Link>
                                    <Link to="/signup">
                                        <Nav.Link as="span">Sign Up</Nav.Link>
                                    </Link>
                                </>
                        }
                    </Nav>
                    <Nav className='display'>
                        {
                            user
                            &&
                            <Link to={`/details/${user._id}`}>
                                <Nav.Link as="span">{user.username}, you are the best!</Nav.Link>
                            </Link>
                        }
                        <Link>
                            <Nav.Link as="span" onClick={switchTheme} className="d-flex small">{themeText}</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Navigation