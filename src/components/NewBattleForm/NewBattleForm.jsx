import { useContext, useEffect, useState } from "react"
import { Button, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/auth.context"

import { MessageContext } from "../../contexts/message.context"
// import FormError from "../FormError/FormError"
import battlesServices from './../../services/battles.services'
import BookSelector from './../BookSelector/BookSelector'
import MovieSelector from './../MovieSelector/MovieSelector'
import booksServices from '../../services/books.services'
import moviesServices from '../../services/movies.services'


const NewBattleForm = ({ fireFinalActions = () => null }) => {


    const { refreshToken } = useContext(AuthContext)

    const [battleData, setBattleData] = useState({
        name: '',
        bookID: '',
        movieID: ''
    })

    const [bookState, setBookState] = useState({
        author_name: '',
        ratings_average: 0,
        title: '',
        first_publish_date: 0,
        excerpt: '',
        key: '',
        saved: false
    })

    const [movieState, setMovieState] = useState({
        director: '',
        vote_average: 0,
        title: '',
        release_date: '',
        overview: '',
        id: '',
        saved: false
    })

    const { emitMessage } = useContext(MessageContext)
    const navigate = useNavigate()

    const cleanKey = k => k.replace('/works/', '')

    const handleBattleSubmit = e => {
        e.preventDefault()
        if (!bookState.key) return
        if (!movieState.id) return
        const bookID = cleanKey(bookState.key)
        const movieID = (movieState.id)

        booksServices
            .detailsByKey(bookID)
            .then(({ data }) => {
                // WILL ONLY SAVE BOOK IF BOOK NOT THERE
                if (!data) {
                    booksServices
                        .saveBook(bookState)
                        .then(res => console.log(res))
                        .catch(err => console.error(err))
                }
            })
            .catch(err => console.error(err))

        moviesServices
            .detailsByKey(movieID)
            .then(({ data }) => {
                // WILL ONLY SAVE MOVIE IF MOVIE NOT THERE
                if (!data) {
                    moviesServices
                        .saveMovie(movieState)
                        .then(res => console.log(res))
                        .catch(err => console.error(err))
                }
            })
            .catch(err => console.error(err))

        // Generate Battle Name based on selected book and movie
        const battleName = `${bookState.title} VS ${movieState.title}`
        const saveData = { ...battleData, bookID, movieID, name: battleName }

        battlesServices
            .saveBattle(saveData)
            .then(({ data }) => {
                console.log({ data })
                emitMessage('One more battle created!')
                setBattleData({ ...battleData, _id: data._id })
                refreshToken()
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        if (battleData._id) {
            navigate(`/details/${battleData._id}`)
        }
    }, [battleData._id, navigate])

    return (
        <Form onSubmit={handleBattleSubmit}>
            <Row className="mb-3">
                <BookSelector onChange={setBookState} />
                <MovieSelector onChange={setMovieState} />
            </Row>
            {/* <Button style={{ width: '100%' }} variant="dark mt-4" type="submit">Create Book vs Movie Battle</Button> */}
            <Button style={{ width: '100%', padding: '30px' }} variant="dark mt-4" type="submit">
                Create Book vs Movie Battle
                {bookState.title && movieState.title && (
                    <div className="mt-3">
                        {bookState.title} VS {movieState.title}
                    </div>
                )}
            </Button>
        </Form>
    )

}

export default NewBattleForm