import { useContext, useEffect, useState } from "react"
import { Button, Form, Row, Col, ListGroup } from "react-bootstrap"
import { MessageContext } from "../../contexts/message.context"
// import FormError from "../FormError/FormError"
import battlesServices from './../../services/battles.services'
import { Selector, cleanKey } from './BookSelector'
import booksServices from '../../services/books.services'


const NewBattleForm = ({ fireFinalActions = () => null }) => {

    const [battleData, setbattleData] = useState({
        name: '',
        bookID: '',
        movieID: ''
    })

    const [bookState, setbookState] = useState({
        author_name: '',
        ratings_average: 0,
        title: '',
        first_publish_date: 0,
        excerpt: '',
        key: '',
        saved: false
    })

    const { emitMessage } = useContext(MessageContext)

    const handleInputChange = e => {
        const { value, name } = e.target
        setbattleData({ ...battleData, [name]: value })
    }

    const handleBattleSubmit = e => {
        e.preventDefault()
        if (!bookState.key) return
        const bookID = cleanKey(bookState.key)
        // ONLY SAVE BOOK IF BOOK NOT THERE
        booksServices.detailsByKey(bookID).then(({ data }) => {
            if (!data) {
                booksServices
                    .saveBook(bookState)
                    .then(res => console.log(res))
                    .catch(err => console.error(err))
            }
        })

        battlesServices
            .saveBattle({ ...battleData, bookID })
            .then(() => {
                emitMessage('One more battle created!')
                fireFinalActions()
            })
            .catch(err => console.error(err))
    }

    return (
        <Form onSubmit={handleBattleSubmit}>
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={battleData.name} onChange={handleInputChange} />
            </Form.Group>
            <Row className="mb-3">

                <Selector onChange={setbookState} />

                <Selector onChange={setbookState} />

                {/* <Form.Group as={Col} controlId="movieID">
                    <Form.Label>Movie Name</Form.Label>
                    <Form.Control type="text" name="movieID" value={battleData.movieID} onChange={handleInputChange} />
                </Form.Group> */}
            </Row>
            <Button style={{ width: '100%' }} variant="dark mt-4" type="submit">Create Book vs Movie Battle</Button>
        </Form>
    )
}

export default NewBattleForm