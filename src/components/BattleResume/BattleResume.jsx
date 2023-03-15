import React, { useState, useEffect } from "react"
import booksService from "../../services/books.services"
import moviesService from "../../services/movies.services"

const BattleResume = () => {
    // const [bookTotalRating, setBookTotalRating] = useState(0)
    // const [movieTotalRating, setMovieTotalRating] = useState(0)
    const [bookRatingSum, setBookRatingSum] = useState(0)
    const [movieRatingSum, setMovieRatingSum] = useState(0)

    // useEffect(() => {
    //     sumBooks()
    //     sumMovies()
    // }, [])

    const sumBooks = () => {

        booksService
            .getBooks()
            .then((books) => {
                console.log(books)
                books.forEach((book) => {
                    bookRatingSum += book.bookRating
                })
                setBookRatingSum(bookRatingSum)
                // setBookTotalRating(bookRatingSum)

            })
            .catch((err) => console.log(err))
    }

    const sumMovies = () => {

        moviesService
            .getMovies()
            .then((movies) => {

                movies.forEach((movie) => {
                    movieRatingSum += movie.movieRating
                })
                setMovieRatingSum(movieRatingSum)
                // setMovieTotalRating(movieRatingSum)

            })
            .catch((err) => console.log(err))
    }

    const winner = bookRatingSum > movieRatingSum ? "BOOKS ARE WINNING!" : "MOVIES ARE WINNING!";
    console.log('bookTotalRating--------', bookRatingSum)
    return (
        <div>
            <h2>Battle Resume</h2>
            <p>Book Total Rating: {bookRatingSum}</p>
            <p>Movie Total Rating: {movieRatingSum}</p>
            <h3>{winner}</h3>
        </div>
    )
}

export default BattleResume
