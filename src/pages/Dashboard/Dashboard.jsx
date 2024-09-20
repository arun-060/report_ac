import React from 'react'
import { Bar } from 'react-chartjs-2'
import BarChart from '../../Components/BarChart/BarChart'
import PieChart from '../../Components/PieChart/PieChart'
import Timeline from '../../Components/Timeline/Timeline'
import PlotTime from '../../Components/PlotTime/PlotTime'
import "./Dashboard.css"
import student_ic from "./../../assets/Dashboard/student_ic.png"

function Dashboard() {
    return (
        <div className='dashboard-container'>
            <div className="student-section">
                <div className="student-information">
                    <img className="student-photo" src={student_ic} />
                    <h2 class="student-name">John Doe</h2>
                    <p class="student-details">ID: 123456</p>
                    <p class="student-details">Major: Computer Science</p>
                    <p class="student-details">Year: Sophomore</p>
                    <p class="student-details">Email: john.doe@example.com</p>
                </div>
            </div>
            <div className="data-container">
                <BarChart />
                <PieChart />
                <PlotTime />
            </div>
            <div className="timeline-container">
                <Timeline />
            </div>
        </div>
    )
}

export default Dashboard