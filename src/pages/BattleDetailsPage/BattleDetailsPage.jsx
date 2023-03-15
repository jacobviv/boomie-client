import { useEffect, useState, useContext } from "react"
import { Container, Row, Col, Button, ButtonGroup, Card } from "react-bootstrap"
import { Link, useParams } from "react-router-dom"
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

    console.log(battle_id)

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

        booksService
            .getBookByBookID(battle.bookID)
            .then(({ data }) => setBook(data))
            .catch(err => console.log(err))

        moviesService
            .getMovieByMovieID(battle.movieID)
            .then(({ data }) => setMovie(data))
            .catch(err => console.log(err))

        usersService
            .getUserById(battle.owner)
            .then(({ data }) => setBattleOwner(data))
            .catch(err => console.log(err))

    }

    const handleDelete = () => {
        battlesService
            .deleteBattleById(battle_id)
            .then(() => {
                window.location = "/battles"
            })
            .catch((err) => console.error(err))
    }

    useEffect(() => {
        console.log("LA BATALLAAAAAAA", battle)
        console.log(book)
    }, [battle])


    return (

        <Container>

            <h1 className="mb-4">{battle.name}</h1>
            <hr />
            <h2 className="mb-4">BOOK: {book.bookTitle}</h2>
            <p>{book.bookRating}</p>
            <h2 className="mb-4">MOVIE: {movie.movieTitle}</h2>
            <p>{movie.movieRating}</p>
            <hr />
            {
                book.bookRating > movie.movieRating &&
                <h1> <b>BOOK WINS</b> </h1>
            }
            {
                book.bookRating < movie.movieRating &&
                <h1> <b>MOVIE WINS</b> </h1>
            }
            <hr />

            <Row>

                <Col md={{ span: 12, offset: 0 }}>
                    <h3>Specs</h3>
                    <ul>
                        <li>Book: {book.bookTitle}</li>
                        <li>Movie: {movie.movieTitle}</li>
                        <li>Fought by: {battleOwner.username}</li>

                    </ul>
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

                <Col md={{ span: 4 }}>
                    <img src={battle.imageUrl} style={{ width: '100%' }} />
                </Col>

            </Row>

        </Container >
    )

}

export default BattleDetailsPage