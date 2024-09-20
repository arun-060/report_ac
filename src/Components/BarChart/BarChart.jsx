import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import "./BarChart.css"


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// const data = {
//     labels: ['Math', 'Science', 'English', 'History', 'Geography'],
//     datasets: [
//         {
//             label: 'Marks',
//             data: [85, 90, 78, 88, 76],
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1,
//         },
//     ],
// };

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Student Marks in Semester Exam',
        },
    },
};

function BarChart({data}) {
  return (
    <div className="char-container">
        <Bar data={data} options={options} />
    </div>
)
}

export default BarChart