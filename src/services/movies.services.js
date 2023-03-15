import axios from 'axios'

class MovieService {

    constructor() {
        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/movies`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    searchMovies(movieTitle) {
        return this.api.get(`/api/search/${movieTitle}`)
    }

    loadMovie(movieKey) {
        return this.api.get(`/api/load/${movieKey}`)
    }

    getMovies() {
        return this.api.get('/getAllMovies')
    }

    getMovieByMovieID(movieID) {
        return this.api.get(`/getMovieByMovieID/${movieID}`)
    }

    saveMovie(movieData) {
        return this.api.post(`/saveMovie/`, movieData)
    }

    detailsByKey(movieKey) {
        return this.api.get(`/detailsByKey/${movieKey}`)
    }

    getMoviesRatingSum() {
        // TODO
    }

}

const moviesService = new MovieService()

export default moviesService