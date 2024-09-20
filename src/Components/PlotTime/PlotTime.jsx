import React from 'react'
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import "./PlotTime.css"

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Title, Tooltip, Legend)

const data = {
    labels: ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'],
    datasets: [
        {
            label: 'CGPA',
            data: [7.5, 8.0, 8.2, 8.5, 8.7, 8.9, 9.0, 9.2],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
        },
    ],
};

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Semester-wise CGPA',
        },
    },
};

function PlotTime() {
    return (
        <div className="plottime-container">
            <Line data={data} options={options} />
        </div>
    )
}

export default PlotTime