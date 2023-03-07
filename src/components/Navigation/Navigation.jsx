import { useContext } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
// import { ThemeContext } from '../../contexts/theme.context'


const Navigation = () => {

    // const { themeValue, switchTheme } = useContext(ThemeContext)
    const { user, logout } = useContext(AuthContext)

    // const navbarStyle = themeValue === 'dark' ? 'light' : 'dark'
    // const themeText = themeValue === 'light' ? 'Tema oscuro' : 'Tema claro'

    return (
        <Navbar bg="white" variant="light" expand="lg" className='navBar mb-3' >  {/* bg white is not a thing */}
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
                    {
                        user
                        &&
                        <Link to={`/details/${user._id}`}>
                            <Nav.Link as="span">{user.username}, you are the best!</Nav.Link>
                        </Link>
                    }
                    {/* <Navbar.Text>
                        <span onClick={switchTheme} className="d-flex">{themeText}</span>
                    </Navbar.Text> */}
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Navigation