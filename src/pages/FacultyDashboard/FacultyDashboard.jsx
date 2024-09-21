import React from 'react';
import './FacultyDashboard.css';
import { Search, User, ChevronDown, MoreVertical } from 'lucide-react';
// import report from '../assets/report.png'
import report from '../../assets/FacultyDashboard/report.png'
import logo from '../../assets/FacultyDashboard/ArRp_logo-removebg-preview (1).png'
import { useNavigate } from 'react-router-dom';

const FacultyDashboard = () => {
  const reports = [
    { id: 1, name: 'Report name', department: 'Comp Department' },
    { id: 2, name: 'Report name', department: 'Comp Department' },
    { id: 3, name: 'Report name', department: 'Comp Department' },
    { id: 4, name: 'Report name', department: 'Comp Department' },
  ];

  const handleLogout = () => {
    console.log("User logged out");
  };

  const navigate = useNavigate();
  const eventChange=()=>{
    console.log("clicked")
    navigate('/ReportForm')
  }

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


{/* mapping of js object */}
        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 3v18h-6V3h6z"></path>
                  <path d="M15 7v14H9V7h6z"></path>
                  <path d="M9 11v10H3V11h6z"></path>
                </svg>
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