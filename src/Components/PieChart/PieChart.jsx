import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import "./PieChart.css"

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
    labels: ['Educational', 'Sports', 'Internships', 'Others', 'Extracurricular'],
    datasets: [
        {
            label: 'Activities Distribution',
            data: [40, 20, 15, 10, 15],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
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
            text: 'Distribution of Activities During the Semester',
        },
    },
};

function PieChart() {
  return (
    <div className="piechart-contianer">
        <Pie data={data} options={options} />
    </div>
  )
}

export default PieChart