import { useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import battlesServices from './../../services/battles.services'

const NewBattleForm = ({ fireFinalActions }) => {

    const [battleData, setbattleData] = useState({
        name: '',
        bookID: '',
        movieID: ''
    })

    const handleInputChange = e => {
        const { value, name } = e.target
        setbattleData({ ...battleData, [name]: value })
    }

    const handleBattleSubmit = e => {
        e.preventDefault()

        battlesServices
            .saveBattle(battleData)
            .then(({ data }) => {
                fireFinalActions()
            })
            .catch(err => console.log(err))
    }

    return (
        <Form onSubmit={handleBattleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={battleData.name} onChange={handleInputChange} />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="bookID">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" name="bookID" value={battleData.bookID} onChange={handleInputChange} />
                </Form.Group>

                <Form.Group as={Col} controlId="movieID">
                    <Form.Label>Movie Name</Form.Label>
                    <Form.Control type="text" name="movieID" value={battleData.movieID} onChange={handleInputChange} />
                </Form.Group>
            </Row>
            <Button style={{ width: '100%' }} variant="dark mt-4" type="submit">Create Book vs Movie Battle</Button>
        </Form>
    )
}

export default NewBattleForm