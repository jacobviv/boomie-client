import React, { useState, useEffect } from "react"
import booksService from "../../services/books.services"
import moviesService from "../../services/movies.services"
import { Doughnut } from 'react-chartjs-2'
import Chart from "chart.js/auto"
import { Col } from "react-bootstrap"
import Loader from "../Loader/Loader"
import battlesService from "../../services/battles.services"



const BattleResume = () => {

    const [bookRatingSum, setBookRatingSum] = useState(0)
    const [movieRatingSum, setMovieRatingSum] = useState(0)
    const [chartData, setChartData] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [numberBattles, setNumberBattles] = useState(0)

    useEffect(() => {
        sumBooks()
        sumMovies()
        totalNumberBattles()
    }, [])

    useEffect(() => {
        createChartData()
    }, [bookRatingSum, movieRatingSum])

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
                setIsLoading(false)


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
                setIsLoading(false)

                console.log()

            })
            .catch((err) => console.log(err))
    }

    const createChartData = () => {
        setChartData({
            labels: ['Movies', 'Books'],
            datasets: [
                {
                    label: 'Rating Sum',
                    data: [Number(bookRatingSum), Number(movieRatingSum)],
                    backgroundColor: [
                        'rgba(192, 192, 192, 1)',
                        'rgba(96, 96, 96, 1)',
                    ],
                    borderWidth: 0,
                },
            ],
        })
    }

    const totalNumberBattles = () => {
        battlesService
            .getBattles()
            .then(({ data }) => {
                let numberBattles = data.length
                setNumberBattles(numberBattles)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }

    const winner = bookRatingSum > movieRatingSum
        ?
        "Guess what? BOOKS ARE WINNING!"
        :
        "Who could say? MOVIES ARE WINNING!"

    console.log('bookTotalRating--------', bookRatingSum)

    return (
        <>
            <Col sm={12} md={6} lg={5}>
                {
                    isLoading
                        ?
                        <Loader />
                        :
                        <>
                            <Doughnut data={chartData} />
                        </>
                }
            </Col>
            <Col sm={12} md={6} lg={{ span: 6, offset: 1 }} >
                <h3>Battle Resume</h3>
                <p>{numberBattles} battles have been played between books and movies thanks to our beloved community.</p>
                <hr />
                <h2>{winner}</h2>
                <hr />
                <p>Books Total Rating: {bookRatingSum}</p>
                <p>Movies Total Rating: {movieRatingSum}</p>
            </Col>
        </>
    )
}

export default BattleResume
