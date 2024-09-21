import React, { useEffect, useState } from 'react';
import './FacultyDashboard.css';
import { Search, User, ChevronDown, MoreVertical } from 'lucide-react';
import report from '../../assets/FacultyDashboard/report.png';
import logo from '../../assets/FacultyDashboard/ArRp_logo-removebg-preview (1).png';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../firebase.config'; // Import database
import { ref, get } from 'firebase/database';

const FacultyDashboard = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const username = searchParams.get("userId");

  const [reports, setReports] = useState([]);

  const navigate = useNavigate();

  // Function to fetch data from Firebase Realtime Database
  useEffect(() => {
    const fetchReports = async () => {
      const reportsRef = ref(db, 'reports'); // Reference to the 'reports' node
      try {
        const snapshot = await get(reportsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          // Firebase returns an object, map it to an array of reports
          const reportsArray = Object.keys(data).map((reportKey) => {
            const reportData = data[reportKey];
            return {
              id: reportData.id, // id is directly under the report object
              name: reportKey, // Name is the key (e.g., 'Arunkumar Gupta')
              department: reportData.department, // department is also at the top level
              photo: reportData.photo.startsWith('data:image/')
                ? reportData.photo // Already prefixed with data:image/
                : `data:image/webp;base64,${reportData.photo}`, // Add prefix manually if missing
              results: reportData.results, // In case you need results later
            };
          });
          setReports(reportsArray);
        } else {
          console.log("No data available");
        }
      } catch (error) {
        console.error("Error fetching reports:", error);
      }
    };

    fetchReports();
  }, []); // Runs once on component mount

  const handleLogout = () => {
    console.log("User logged out");
  };

  const eventChange = () => {
    console.log("clicked");
    navigate('/ReportForm');
  };

  return (
    <div className="faculty-dashboard">
      <header className="header">
        <div className="jodi">
          <div className="logo">
            <img src={logo} alt="ARP Logo" className='logoSize'/>
          </div>
          <div className=''>
            Faculty
          </div>
        </div>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <Search className="search-icon" />
        </div>
        <div className="profile">
          <User className="profile-icon"/>
          <button className='profile-logout' onClick={handleLogout}>Logout</button>
        </div>
      </header>

      <main className="main_content">
        <div className="create-report-container">
          <button className="create-report-btn" onClick={eventChange}>
            <img src={report} alt="logo" height={50} width={50}/>
          </button>
          <h2>Create New Report</h2>
        </div>

        <div className="recently-added">
          <span>Recently Added</span>
          <ChevronDown className="dropdown-icon" />
        </div>

        {/* Mapping the Firebase data */}
        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-icon">
                {/* Render the photo if available */}
                {report.photo ? (
                  <img
                    src={report.photo}
                    alt={report.name}
                    className="report-photo"
                    style={{ height: '50px', width: '50px', objectFit: 'cover', borderRadius:'50%' }}
                  />
                ) : (
                  <div>No Image</div>
                )}
              </div>
              <h3 className="report-name">{report.name}</h3>
              <p className="report-department">{report.department}</p>
              <button className="more-options">
                <MoreVertical />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FacultyDashboard;
