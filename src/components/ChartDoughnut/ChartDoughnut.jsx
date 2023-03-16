import React, { useState, useEffect } from "react"
import { Doughnut } from 'react-chartjs-2'
import Loader from "../Loader/Loader"


const ChartDoughnut = ({ data1, data2 }) => {

    const [chartData, setChartData] = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        createChartData()
    }, [data1, data2])


    const createChartData = () => {
        setChartData({
            // labels: ['Movies', 'Books'],
            datasets: [
                {
                    label: 'Rating',
                    data: [data1, data2],
                    backgroundColor: [
                        'rgba(192, 192, 192, 1)',
                        'rgba(96, 96, 96, 1)',
                    ],
                    borderWidth: 0,
                },
            ],
        })
        setIsLoading(false)
    }

    return (
        <>
            {
                isLoading
                    ?
                    <Loader />
                    :
                    <>
                        <Doughnut data={chartData} />
                    </>
            }
        </>
    )
}

export default ChartDoughnut