import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Navigation = () => {

    return (
        <Navbar bg="white" variant="light" expand="lg" className='navBar'>  {/* bg white is not a thing */}
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
                        <Link to="/battles/create">
                            <Nav.Link as="span">Create Battle</Nav.Link>
                        </Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Navigation