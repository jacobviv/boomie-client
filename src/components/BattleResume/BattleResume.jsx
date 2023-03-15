import React, { useState, useEffect } from "react"
import booksService from "../../services/books.services"
import moviesService from "../../services/movies.services"

const BattleResume = () => {

    const [bookRatingSum, setBookRatingSum] = useState(0)
    const [movieRatingSum, setMovieRatingSum] = useState(0)

    useEffect(() => {
        sumBooks()
        sumMovies()
    }, [])

    useEffect(() => {
        console.log("EL RATING TOTAL =>", bookRatingSum)
    }, [bookRatingSum])

    const sumBooks = () => {

        booksService
            .getBooks()
            .then(({ data: books }) => {
                let booksRatingTotal = 0
                books.forEach((book) => {
                    booksRatingTotal += book.bookRating
                })
                setBookRatingSum(booksRatingTotal)
            })
            .catch((err) => console.log(err))
    }

    const sumMovies = () => {

        moviesService
            .getMovies()
            .then(({ data: movies }) => {
                let moviesRatingTotal = 0
                movies.forEach((movie) => {
                    moviesRatingTotal += movie.movieRating
                })
                setMovieRatingSum(moviesRatingTotal)
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
