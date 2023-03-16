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
import { cleanKey } from "../../utils/stringsUtils"
import battlesService from "./../../services/battles.services"


const NewBattleForm = () => {

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
        first_publish_year: 0,
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

    const handleBattleSubmit = e => {

        e.preventDefault()
        if (!bookState.key) return
        if (!movieState.id) return
        const bookID = cleanKey(bookState.key)
        const movieID = movieState.id
        console.log({ bookID }, { movieID })
        let movie = undefined
        let book = undefined

        const promises = [booksServices.detailsByKey(bookID), moviesServices.detailsByKey(movieID)]

        Promise
            .all(promises)
            .then(([bookData, movieData]) => {

                console.log('BOOK DATA', bookData)
                console.log('MOVIE DATA', movieData)
                if (bookData.data) {
                    book = bookData.data._id
                }

                if (movieData.data) {
                    movie = movieData.data._id
                }

                if (!bookData.data) {
                    console.log('NO HABIA DATA EN BOOK')
                    booksServices
                        .saveBook(bookState)
                        .then(res => {
                            book = bookData.data._id   ///////////  <--------- SHIT HAPPENS
                            console.log(res)
                        })
                        .catch(err => console.error(err))
                }
                if (!movieData.data) {
                    console.log('NO HABIA DATA EN MOVIE')
                    moviesServices
                        .saveMovie(movieState)
                        .then(res => {
                            movie = res.data._id
                            console.log(res)
                        })
                        .catch(err => console.error(err))
                }

            })
            .then(() => {
                const battleName = `${bookState.title} VS ${movieState.title}`
                const saveData = { ...battleData, bookID, movieID, name: battleName, book, movie }

                console.log('CREANDO BATALLA:', saveData)

                battlesService
                    .getBattles()
                    .then(({ data }) => {
                        const sameBookID = data.some(elm => elm.bookID === bookID)
                        const sameMovieID = data.some(elm => Number(elm.movieID) === movieID)
                        if (sameBookID === true && sameMovieID === true) {
                            emitMessage('This battle already exists! Try another one.')
                            console.log('no se puede cerar chavaalllll')
                        } else {
                            battlesServices
                                .saveBattle(saveData)
                                .then(({ data }) => {
                                    console.log('BATALLA CREADA', data)
                                    emitMessage('One more battle created!')
                                    setBattleData({ ...battleData, _id: data._id })
                                    refreshToken()
                                })
                                .catch(err => console.error(err))
                        }

                    })
                    .catch(err => console.log(err))

                // battlesServices
                //     .saveBattle(saveData)
                //     .then(({ data }) => {
                //         console.log('BATALLA CREADA', data)
                //         emitMessage('One more battle created!')
                //         setBattleData({ ...battleData, _id: data._id })
                //         refreshToken()
                //     })
                //     .catch(err => console.error(err))

            })
            .catch(err => console.error(err))

    }

    useEffect(() => {
        if (battleData._id) {
            navigate(`/details/${battleData._id}`)
        }
    }, [battleData._id])

    return (
        <Form onSubmit={handleBattleSubmit}>
            <Row className="mb-3">
                <BookSelector onChange={setBookState} />
                <MovieSelector onChange={setMovieState} />
            </Row>
            <Button style={{ width: '100%', padding: '30px' }} variant="dark mt-4" type="submit">
                Save Book vs Movie Battle
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