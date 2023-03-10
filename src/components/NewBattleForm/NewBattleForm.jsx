import { useContext, useState } from "react"
import { Button, Form, Row, Col } from "react-bootstrap"
import { MessageContext } from "../../contexts/message.context"
import FormError from "../FormError/FormError"
import battlesServices from './../../services/battles.services'

const NewBattleForm = ({ fireFinalActions }) => {

    const [battleData, setbattleData] = useState({
        name: '',
        bookID: '',
        movieID: ''
    })

    const { emitMessage } = useContext(MessageContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setbattleData({ ...battleData, [name]: value })
    }

    const [errors, setErrors] = useState([])

    const handleBattleSubmit = e => {
        e.preventDefault()

        battlesServices
            .saveBattle(battleData)
            .then(() => {
                emitMessage('One more battle created!')
                fireFinalActions()
            })
            .catch(err => setErrors(err.response.data.errorMessages))    // visualización de errores
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
            {errors.length > 0 && <FormError>{errors.map(elm => <p>{elm}</p>)} </FormError>}
            <Button style={{ width: '100%' }} variant="dark mt-4" type="submit">Create Book vs Movie Battle</Button>
        </Form>
    )
}

export default NewBattleForm