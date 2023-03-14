import { useState, useEffect } from "react"
import { Form, Col, ListGroup } from "react-bootstrap"
import moviesServices from '../../services/movies.services'
import Loader from "../Loader/Loader"

const MAX_MOVIES = 10

const MovieSelector = ({ onChange }) => {

    const [searchData, setsearchData] = useState({
        movieTitle: '',
        movieTitle: ''
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

    const [moviesLoading, setMoviesLoading] = useState(false)
    const [movieList, setMovieList] = useState([])
    const [movieDirectorsPromises, setMovieDirectorsPromises] = useState([])

    useEffect(() => {
        if (movieList.length === 0) return
        // check we havent been there setting director yet return otherwise
        if (movieList[0].director?.length > 0) return
        // collect all promises to call later
        setMovieDirectorsPromises(movieList.map(({ id }) => moviesServices.loadMovie(id)))
    }, [movieList])

    useEffect(() => {
        // gather all collected promises and update movies with the loaded values
        Promise.all(movieDirectorsPromises).then((fullMovies) => {
            setMovieList(movieList.map(movie => {
                const matchMovie = fullMovies.find(m => m.data.id === movie.id)
                const { crew } = matchMovie.data
                const director = crew.find((d) => d.job === 'Director')
                if (!director) return movie
                return { ...movie, ...{ director: director.name } }
            }))
        });
    }, [movieDirectorsPromises])

    const handleInputChange = e => {
        const { value, name } = e.target
        setsearchData({ ...searchData, [name]: value })
    }

    const searchMovies = () => {
        setMoviesLoading(true)
        const movieTitle = searchData.movieTitle

        moviesServices
            .searchMovies(movieTitle)
            .then((result) => {
                const allMovies = result.data.results.slice(0, MAX_MOVIES).filter(b => b.vote_average > 0)
                setMovieList(allMovies)
                setMoviesLoading(false)
            })
            .catch(err => console.error(err))
    }

    const selectMovie = (selectKey) => {
        const selected = movieList.find(b => b.id === selectKey)
        const { overview, release_date, vote_average, title, id } = selected

        moviesServices
            .loadMovie(id)
            .then((fullMovie) => {
                const { crew } = fullMovie.data
                const director = crew.find((d) => d.job === 'Director')

                const movieWithDirector = {
                    ...movieState,
                    director: director.name,
                    overview,
                    release_date,
                    vote_average,
                    title,
                    id,
                    saved: true
                }

                onChange(movieWithDirector)
                setMovieState(movieWithDirector)
            })
            .catch(err => console.error(err))

        setMovieList(movieList.map(b => b.id === selectKey ? ({ ...b, selected: true }) : ({ ...b, selected: false })))
    }

    return (
        <Form.Group as={Col} controlId="movieID">
            <Form.Label>Movie Name</Form.Label>
            <Form.Control
                type="text"
                name="movieTitle"
                value={searchData.movieTitle}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        searchMovies()
                    }
                }}
                placeholder="Search and press Enter"
            />
            <hr />
            {
                !moviesLoading
                    ?
                    (<ListGroup>
                        {movieList.map((elm, i) => <ListGroup.Item key={i}>{`"${elm.title}" by: ${elm.director}`}
                            <Form.Check checked={elm.selected ?? false} type="checkbox" onChange={() => selectMovie(elm.id)} />
                        </ListGroup.Item>)}
                    </ListGroup>)
                    :
                    <Loader />
            }
        </Form.Group>
    )
}

export default MovieSelector