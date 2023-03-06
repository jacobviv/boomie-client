import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import authService from "../../services/auth.services"
import { useNavigate } from 'react-router-dom'


const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        email: '',
        password: '',
        avatar: ''
    })

    const navigate = useNavigate()

    const handleInputChange = e => {
        const { value, name } = e.target
        setSignupData({ ...signupData, [name]: value })
    }

    const handleFormSubmit = e => {

        e.preventDefault()

        authService
            .signup(signupData)
            .then(() => navigate('/login'))
            .catch(err => console.log(err))
    }

    return (

        <Form onSubmit={handleFormSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>User Name</Form.Label>
                <Form.Control type="text" value={signupData.username} onChange={handleInputChange} name="username" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={signupData.email} onChange={handleInputChange} name="email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={signupData.password} onChange={handleInputChange} name="password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control type="avatar" value={signupData.avatar} onChange={handleInputChange} name="avatar" />
            </Form.Group>

            <div className="d-grid">
                <Button variant="dark" type="submit">Register</Button>
            </div>

        </Form>
    )
}

export default SignupForm