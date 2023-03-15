import { useContext, useEffect, useState } from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import battlesService from "../../services/battles.services"
import booksService from '../../services/books.services'
import moviesService from '../../services/movies.services'
import usersService from '../../services/users.services'


const BattleCard = ({ name, bookID, movieID, _id, owner }) => {


    const { user } = useContext(AuthContext)
    const [book, setBook] = useState({})
    const [movie, setMovie] = useState({})
    const [battleOwner, setBattleOwner] = useState({})


    useEffect(() => {
        loadData()
    }, [bookID, movieID])

    // console.log('soy el owner de la battle', battleOwner)

    const loadData = () => {

        booksService
            .getBookByBookID(bookID)
            .then(({ data }) => setBook(data))
            .catch(err => console.log(err))

        moviesService
            .getMovieByMovieID(movieID)
            .then(({ data }) => setMovie(data))
            .catch(err => console.log(err))

        usersService
            .getUserById(owner)
            .then(({ data }) => setBattleOwner(data))
            .catch(err => console.log(err))

    }

    const handleDelete = () => {
        battlesService
            .deleteBattleById(_id)
            .then(() => {
                window.location = "/battles"
            })
            .catch((err) => console.error(err))
    }

    return (
        <Card className='mb-3 card'>
            <Card.Body>
                <Card.Text>Book: "{book.bookTitle}" - {book.bookRating}</Card.Text>
                <hr />
                <Card.Text>Movie: "{movie.movieTitle}" - {movie.movieRating}</Card.Text>
                <hr />
                <Link to={`/battles/details/${_id}`}>
                    <Card.Text className='battleName'> {name} </Card.Text>
                </Link>
                <Card.Text>By {battleOwner.username}</Card.Text>
                <hr />
                {
                    book.bookRating > movie.movieRating &&
                    <Card.Text>BOOK WINS</Card.Text>
                }
                {
                    book.bookRating < movie.movieRating &&
                    <Card.Text>MOVIE WINS</Card.Text>
                }
            </Card.Body>
            {
                user && user._id === owner &&
                <>
                    <Link to={`/battles/edit/${_id}`}>
                        <Button style={{ width: '100%' }} variant='warning mb-3' size='sm'>Owner's edit</Button>
                    </Link>
                    <Button as="figure" variant="danger" onClick={handleDelete} size='sm'>
                        Owner's delete
                    </Button>
                </>
            }
        </Card >
    )
}

export default BattleCard