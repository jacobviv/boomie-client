import { useEffect, useState, useContext } from "react"
import { Container, Row, Col, Button, ButtonGroup, Card } from "react-bootstrap"
import { Link, useNavigate, useParams } from "react-router-dom"
import battlesService from "../../services/battles.services"
import { AuthContext } from '../../contexts/auth.context'
import booksService from '../../services/books.services'
import moviesService from '../../services/movies.services'
import usersService from '../../services/users.services'



const BattleDetailsPage = ({ owner }) => {

    const [book, setBook] = useState({})
    const [movie, setMovie] = useState({})
    const [battleOwner, setBattleOwner] = useState({})

    const [battle, setBattle] = useState({
        _id: '',
        name: '',
        bookID: '',
        movieID: '',
        owner: ''
    })

    const { user } = useContext(AuthContext)

    const { battle_id } = useParams()

    const navigate = useNavigate()

    // console.log(battle_id)

    useEffect(() => {
        battlesService
            .getBattleDetails(battle_id)
            .then(({ data }) => setBattle(data))
            .catch(err => console.error(err))
    }, [])

    useEffect(() => {
        loadData()
    }, [battle])

    const loadData = () => {

        const promises = [
            booksService.getBookByBookID(battle.bookID),
            moviesService.getMovieByMovieID(battle.movieID),
            usersService.getUserById(battle.owner)
        ]

        Promise
            .all(promises)
            .then(([bookInfo, movieInfo, userInfo]) => {
                setBook(bookInfo.data)
                setMovie(movieInfo.data)
                setBattleOwner(userInfo.data)
            })
            .catch(err => console.log(err))


        // booksService
        //     .getBookByBookID(battle.bookID)
        //     .then(({ data }) => setBook(data))
        //     .catch(err => console.log(err))

        // moviesService
        //     .getMovieByMovieID(battle.movieID)
        //     .then(({ data }) => setMovie(data))
        //     .catch(err => console.log(err))

        // usersService
        //     .getUserById(battle.owner)
        //     .then(({ data }) => setBattleOwner(data))
        //     .catch(err => console.log(err))

    }

    const handleDelete = () => {
        battlesService
            .deleteBattleById(battle_id)
            .then(() => {
                navigate("/battles")
            })
            .catch((err) => console.error(err))
    }

    // useEffect(() => {
    //     console.log("LA BATALLAAAAAAA", battle)
    //     console.log(book)
    // }, [battle])


    return (

        <Container>

            <Row>
                <Col md={{ span: 12, offset: 0 }}>

                    <h1 className="mb-4">{battle.name}</h1>
                    <hr />
                    {
                        book.bookRating > movie.movieRating &&
                        <h1><i><b>The book seems to be better.</b></i></h1>
                    }
                    {
                        book.bookRating < movie.movieRating &&
                        <h1><i><b>The movie is supposed to be better.</b></i></h1>
                    }

                </Col>
            </Row>

            <Row>
                <Col md={{ span: 6, offset: 0 }}>

                    <hr />
                    <p>Book:</p>
                    <h2 className="mb-4"> <i>{book.bookTitle}</i> </h2>
                    <h3>Writen by {book.bookAuthor}</h3>
                    <hr />
                    <p>Published in {book.bookPublishingDate}</p>
                    <p>Open Library Rating: {book.bookRating}</p>

                </Col>

                <Col md={{ span: 6, offset: 0 }}>

                    <hr />
                    <p>Movie:</p>
                    <h2 className="mb-4"> <i>{movie.movieTitle}</i> </h2>
                    <h3>Directed by {movie.movieDirector}</h3>
                    <hr />
                    <p>First released in {movie.movieReleaseDate}</p>
                    <p>The Movie Database Rating: {movie.movieRating}</p>

                </Col>
            </Row>

            <Row>
                <Col md={{ span: 12, offset: 0 }}>
                    <hr />
                    <h4>Movie Overview</h4>
                    <p> <i>"{movie.movieOverview}"</i> </p>
                    <hr />
                    {
                        book.bookFirstSentence && book.bookFirstSentence.length !== 0 &&
                        <>
                            <hr />
                            <h4>Book First Sentence</h4>
                            <p>{book.bookFirstSentence}</p>
                        </>
                    }
                </Col>
            </Row>

            <Row>
                <Col md={{ span: 6, offset: 0 }}>

                    <p>Battle fought by {battleOwner.username}</p>
                    <hr />

                    <Link to="/battles">
                        <Button as="figure" variant="dark mt-4">Back to Battles</Button>
                    </Link>

                    {
                        user && user.role === "ADMIN" &&
                        <ButtonGroup style={{ width: '100%' }}>
                            <Link to={`/battles/edit/${battle_id}`}>
                                <Button as="figure" variant="warning mt-4">Admin Edit Battle</Button>
                            </Link>
                            <Button as="figure" variant="danger mt-4" onClick={handleDelete}>
                                Admin Delete Battle
                            </Button>
                        </ButtonGroup>
                    }

                </Col>

            </Row>

        </Container >
    )

}

export default BattleDetailsPage