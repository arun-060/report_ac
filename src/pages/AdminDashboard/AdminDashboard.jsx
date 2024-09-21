import React, { useEffect, useState } from 'react';
import './AdminDashboard.css'; // Ensure you have appropriate styling
import { Search, MoreVertical } from 'lucide-react';
import { db } from '../../firebase.config'; // Import Firebase configuration
import { ref, get } from 'firebase/database';

const AdminDashboard = () => {
  const [reports, setReports] = useState([]);

  // Fetch data from Firebase
  useEffect(() => {
    const fetchReports = async () => {
      const reportsRef = ref(db, 'reports');
      try {
        const snapshot = await get(reportsRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          const reportsArray = Object.keys(data).map((reportKey) => {
            const reportData = data[reportKey];
            return {
              id: reportData.id,
              name: reportKey, // Use reportKey as name
              department: reportData.department,
              photo: reportData.photo.startsWith('data:image/')
                ? reportData.photo
                : `data:image/webp;base64,${reportData.photo}`,
              results: reportData.results, // Capture results data if needed
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
  }, []); // Fetch data on component mount

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="search-container">
          <input type="text" placeholder="Search..." className="search-input" />
          <Search className="search-icon" />
        </div>
      </header>


      <main className="main-content">
        <h2>Reports</h2>
        <div className="reports-grid">
          {reports.map((report) => (
            <div key={report.id} className="report-card">
              <div className="report-icon">
                {report.photo ? (
                  <img
                    src={report.photo}
                    alt={report.name}
                    className="report-photo"
                    style={{ height: '50px', width: '50px', objectFit: 'cover' }}
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

export default AdminDashboard;
