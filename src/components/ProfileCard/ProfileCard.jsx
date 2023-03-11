import { Card, Container, Row, Button, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { ThemeContext } from "../../contexts/theme.context"
import './ProfileCard.css'



const ProfileCard = ({ user }) => {



    console.log(user)

    return (

        <>
            <Row className='align-items-start'>

                <Col md={{ span: 12 }}>
                    <h1>{user.username} profile page</h1>
                    <hr />
                    <h2>You have fought {user.battles.length} battles.</h2>
                </Col>
            </Row>
            <Row className='align-items-start'>

                <Col md={{ span: 2 }}>
                    <img src={user.avatar} alt={user.username} />
                </Col>
            </Row>
        </>

    )
}

export default ProfileCard