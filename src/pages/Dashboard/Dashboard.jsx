import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { get, ref, child } from "firebase/database";
import { db } from "../../firebase.config"; // Make sure firebase is initialized
import "./Dashboard.css";
import BarChart from "../../Components/BarChart/BarChart";
import PieChart from "../../Components/PieChart/PieChart";
import Timeline from "../../Components/Timeline/Timeline";
import PlotTime from "../../Components/PlotTime/PlotTime";
import student_ic from "./../../assets/Dashboard/student_ic.png";

function Dashboard() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("userId");

  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activities, setActivities] = useState([]); // State to store fetched activities
  const [results, setResults] = useState(null); // State to store fetched results

  const fetchStudentData = async () => {
    try {
      const userRef = ref(db, `reports/${username}`); // Changed to students collection
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        setStudentData(data);
        setIsLoading(false);
      } else {
        console.log("No data found for student:", username);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      setError("Error fetching student data");
      setIsLoading(false);
    }
  };

  const fetchActivities = async (studentId) => {
    try {
      const activitiesRef = child(ref(db, "reports"), studentId + "/activities");
      const snapshot = await get(activitiesRef);

      if (snapshot.exists()) {
        const activitiesData = snapshot.val();
        const activities = Object.values(activitiesData);
        setActivities(activities);
        return activities;
      } else {
        console.log("No activities found for student:", studentId);
        setActivities([]);
        return [];
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
      setActivities([]);
      return [];
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [username]);

  // Call fetchActivities within a separate function or useEffect as needed
  const handleFetchActivities = () => {
    const studentId = "Arunkumar Gupta"; // Replace with the actual student ID
    fetchActivities(studentId)
      .then((activities) => {
        console.log("Activities:", activities);
      })
      .catch((error) => {
        console.error("Error fetching activities:", error);
      });
  };

  useEffect(() => {
    handleFetchActivities(); // Call on component mount or based on your logic
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const resultsRef = ref(db, `reports/${username}/results`);
        const snapshot = await get(resultsRef);

        if (snapshot.exists()) {
          const resultsData = snapshot.val();
          setResults(resultsData);
        } else {
          console.log("No results found for student:", username);
          setError("No results found for student:", username);
        }
      } catch (error) {
        console.error("Error fetching results:", error);
        setError("Error fetching results");
      }
    };

    fetchResults();
  }, [username]);

  return (
    <div className="dashboard-container">
      <div className="student-section">
        <div className="student-information">
          <img
            className="student-photo"
            src={studentData?.photo}
            alt="Student"
          />
          <h2 className="student-name">{studentData?.studentName}</h2>
          <p className="student-details">
            Department: {studentData?.department}
          </p>
          <p className="student-details">Year: 3rd</p>
        </div>
      </div>
      <div className="data-container">
        {results && Object.keys(results).map((semester) => ( // Assuming results state exists
          <div key={semester}>
            <h2>Semester {semester}</h2>

            {/* <BarChart data={data} />  */}
          </div>
        ))}
        <PieChart />
        <PlotTime />
      </div>
      <div className="timeline-container">
        {isLoading ? (
          <p>Loading activities...</p>
        ) : error ? (
          <p>Error fetching activities: {error}</p>
        ) : (
          <Timeline activities={activities} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;