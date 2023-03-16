import { useContext, useEffect, useState } from 'react'
import { Button, ButtonGroup, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth.context'
import battlesService from "../../services/battles.services"
import booksService from '../../services/books.services'
import moviesService from '../../services/movies.services'
import usersService from '../../services/users.services'
import { MessageContext } from "../../contexts/message.context"
import ChartDoughnut from '../ChartDoughnut/ChartDoughnut'
import Loader from '../Loader/Loader'


const BattleCard = ({ name, bookID, movieID, _id, owner }) => {


    const { user } = useContext(AuthContext)
    const [book, setBook] = useState({})
    const [movie, setMovie] = useState({})
    const [battleOwner, setBattleOwner] = useState({})
    const { emitMessage } = useContext(MessageContext)
    const { refreshToken } = useContext(AuthContext)
    const [isLoading, setIsLoading] = useState(true)


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
            .then(({ data }) => {
                setMovie(data)
                setIsLoading(false)
            })
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
                emitMessage('It is deleted!')
                refreshToken()
            })
            .catch((err) => console.error(err))
    }

    return (
        <Card className='mb-3 card'>
            <Card.Body>
                <Card.Text> <i>"{book.bookTitle}"</i> by {book.bookAuthor}</Card.Text>
                <hr />
                <Card.Text> <i>"{movie.movieTitle}"</i> by {movie.movieDirector}</Card.Text>
                <hr />
                <Link to={`/battles/details/${_id}`}>
                    <Card.Text className='battleName'> {name} </Card.Text>
                </Link>
                <Card.Text>By {battleOwner.username}</Card.Text>
                <hr />
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        <>
                            <ChartDoughnut data1={Number(book.bookRating)} data2={Number(movie.movieRating)} />
                        </>
                }
                <hr />
                {
                    book.bookRating > movie.movieRating &&
                    <Card.Text> <b>Book Wins</b> </Card.Text>
                }
                {
                    book.bookRating < movie.movieRating &&
                    <Card.Text> <b>Movie Wins</b> </Card.Text>
                }
                <hr />
                <Card.Text>OL {book.bookRating} vs TMD {movie.movieRating}</Card.Text>

            </Card.Body>
            {
                user && user.role === 'ADMIN' &&
                <>
                    <Link to={`/battles/edit/${_id}`}>
                        <Button style={{ width: '100%' }} variant='warning mb-3' size='sm'>Edit</Button>
                    </Link>
                    <Button as="figure" variant="danger" onClick={handleDelete} size='sm'>
                        Delete
                    </Button>
                </>
            }
        </Card >
    )
}

export default BattleCard