import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { get, ref } from 'firebase/database';
import { db } from '../../firebase.config'; // Make sure firebase is initialized
import "./Dashboard.css"
import BarChart from '../../Components/BarChart/BarChart';
import PieChart from '../../Components/PieChart/PieChart';
import Timeline from '../../Components/Timeline/Timeline';
import PlotTime from '../../Components/PlotTime/PlotTime';
import student_ic from './../../assets/Dashboard/student_ic.png';

function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const userId = searchParams.get('userId');

  const [studentData, setStudentData] = useState(null); // Initialize with null

  useEffect(() => {
    const fetchStudentData = async () => {
      let snapshot = null;
      try {
        const userRef = ref(db, `students/${userId}`); // Changed to students collection
        snapshot = await get(userRef);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }

      if (snapshot.exists()) {
        const data = snapshot.val();
        setStudentData(data);
      } else {
        console.log('User not found in the database');
      }
    };

    fetchStudentData();
  }, [userId]);

  return (
    <div className='dashboard-container'>
      <div className="student-section">
        <div className="student-information">
          <img className="student-photo" src={student_ic} alt="Student" />
          <h2 className="student-name">{studentData?.name}</h2>
          <p className="student-details">ID: {userId}</p>
          <p className="student-details">Major: Computer Science</p>
          <p className="student-details">Year: 3rd</p>
          <p className="student-details">Email: {studentData?.email}</p>
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
  );
}

export default Dashboard;