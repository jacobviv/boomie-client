import React, { useState, useEffect } from "react"
import Chart from "chart.js/auto"
import { Col } from "react-bootstrap"
import Loader from "../../components/Loader/Loader"
import battlesService from "../../services/battles.services"
import ChartDoughnut from "../ChartDoughnut/ChartDoughnut"



const BattleResume = () => {


    const [isLoading, setIsLoading] = useState(true)
    const [battlesInfo, setBattlesInfo] = useState(null)

    useEffect(() => {
        battlesService
            .getBattlesInfo()
            .then(({ data }) => {
                setBattlesInfo(data)
                setIsLoading(false)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <>
            {
                isLoading
                    ?
                    <Loader />
                    :
                    <>
                        < Col sm={12} md={6} lg={5} >
                            <ChartDoughnut data1={battlesInfo.bookTotalRating} data2={battlesInfo.movieTotalRating} />
                        </Col >
                        <Col sm={12} md={6} lg={{ span: 6, offset: 1 }} >
                            <h3>Battle Resume</h3>
                            <p>{battlesInfo.total} battles have been played between books and movies thanks to our beloved community.</p>
                            <hr />
                            <h2>Guess what? {battlesInfo.winner.toUpperCase()} ARE WINNING!</h2>
                            <hr />
                            <p>Books Total Rating: {battlesInfo.bookTotalRating}</p>
                            <p>Movies Total Rating: {battlesInfo.movieTotalRating}</p>
                        </Col>
                    </>
            }
        </>
    )
}

export default BattleResume
