import React from 'react'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js'
import "./BarChart.css"

let marksInData
let subjectsInData


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = {
    labels: subjectsInData,
    datasets: [
        {
            label: 'Marks',
            data: marksInData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
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
            text: 'Student Marks in Semester Exam',
        },
    },
};

function BarChart({results}) {
     marksInData = results.sem1.subjects
     subjectsInData = results.sem1.marks.map((mark) => mark.toString());    
     console.log("in bar chart, " , results)
    console.log("marks and subjects are ," , marksInData, subjectsInData)
    let data
    if(marksInData && subjectsInData){
        data = {
            labels: marksInData,
            datasets: [
                {
                    label: 'Marks',
                    data:  subjectsInData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
    }
};
  return (
    <div className="char-container">
        <Bar data={data} options={options} />
    </div>
)
}

export default BarChart