import React from 'react';
import './AdminDashboard.css';
import { Search ,User} from 'lucide-react';
import logo from '../../assets/FacultyDashboard/ArRp_logo-removebg-preview (1).png'

export default function AdminDashboard() {
  const students = Array(13).fill().map((_, i) => ({
    name: 'sahil shinde',
    department: 'computer',
    id: `s${i + 1}`
  }));

  const faculty = Array(13).fill().map((_, i) => ({
    name: 'sahil shinde',
    department: 'computer',
    id: `f${i + 1}`
  }));

  return (
    <div className="container">
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
          <button className='profile-logout' >Logout</button>
        </div>
      </header>
      <main className="main">
        <section className="column">
          <h2 className="column-title">Student</h2>
          <div className="list">
            {students.map(student => (
              <div key={student.id} className="list-item">
                <div className="avatar"></div>
                <div className="info">
                  <div>Name: {student.name}</div>
                  <div className="department">department: {student.department}</div>
                </div>
                <button className="button">View Report</button>
              </div>
            ))}
          </div>
        </section>
        <section className="column">
          <h2 className="column-title">Faculty</h2>
          <div className="list">
            {faculty.map(member => (
              <div key={member.id} className="list-item">
                <div className="avatar"></div>
                <div className="info">
                  <div>Name: {member.name}</div>
                  <div className="department">department: {member.department}</div>
                </div>
                <button className="button">View Profile</button>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}