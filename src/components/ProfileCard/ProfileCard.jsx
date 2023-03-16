import { Card, Container, Row, Button, Col, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import './ProfileCard.css'



const ProfileCard = ({ username, email, battles, avatar }) => {

    return (

        <>
            <Row className='align-items-start'>

                <Col md={{ span: 12 }}>
                    <h1>{username}, this is your profile page.</h1>
                    <hr />
                    <p>The email you are using at Boomie: {email}</p>
                    <hr />
                    <h2>You have fought {battles.length} battles.</h2>
                    <h3>
                        <Link to="/battles/create">
                            <Nav.Link as="span">Create one now.</Nav.Link>
                        </Link>
                    </h3>
                    <hr />

                </Col>
            </Row>
            <Row className='align-items-start'>

                <Col sm={8} md={6} lg={3}>
                    <img src={avatar} alt={username} />
                </Col>
            </Row>
        </>

    )
}

export default ProfileCard