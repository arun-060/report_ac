import React, { useState } from 'react';
import './ReportForm.css';

import { db } from '../../firebase.config'; // Import Firebase configuration
import { ref, set, get } from 'firebase/database'; // Firebase database methods
// import logo from '../../assets/Dashboard/ArRp_logo-removebg-preview (1).png';
import logo from '../../assets/FacultyDashboard/ArRp_logo-removebg-preview (1).png'
import { Search, User, ChevronDown, MoreVertical } from 'lucide-react';

// Main Component
const ReportForm = () => {
  const [selectedSemester, setSelectedSemester] = useState('');
  const [subjects, setSubjects] = useState([{ name: '', marks: '' }]);
  const [activities, setActivities] = useState([]);
  const [activityInput, setActivityInput] = useState({ name: '', description: '', date: '' });

  // Student Information State
  const [studentName, setStudentName] = useState('');
  const [department, setDepartment] = useState('');
  const [id, setId] = useState('');
  const [photo, setPhoto] = useState(null);

  // Handle Photo Upload
  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  // Add a Subject
  const addSubject = (e) => {
    e.preventDefault();
    setSubjects([...subjects, { name: '', marks: '' }]);
  };

  // Handle Subject Input Change
  const handleSubjectChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  // Add Activity to the List
  const addActivity = (e) => {
    e.preventDefault();
    if (activityInput.name && activityInput.description && activityInput.date) {
      setActivities([...activities, activityInput]);
      setActivityInput({ name: '', description: '', date: '' });
    }
  };

  // Handle Activity Input Change
  const handleActivityInputChange = (field, value) => {
    setActivityInput({ ...activityInput, [field]: value });
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the new semester's result
    const newSemesterResult = {
      subjects: subjects.map((subject) => subject.name),
      marks: subjects.map((subject) => subject.marks),
    };

    // Firebase Reference
    const studentRef = ref(db, 'reports/' + studentName);

    // Fetch existing student data from the database
    try {
      const snapshot = await get(studentRef);
      let existingData = snapshot.exists() ? snapshot.val() : {};

      // Merge the new semester result into the existing student data
      existingData = {
        ...existingData,
        studentName,
        department,
        photo,
        results: {
          ...existingData.results,
          [selectedSemester]: newSemesterResult,
        },
        activities: [
          ...(existingData.activities || []),
          ...activities.map((activity) => ({
            name: activity.name,
            description: activity.description,
            date: activity.date,
          })),
        ],
      };

      // Save the merged data to Firebase
      await set(studentRef, existingData);
      alert('Data saved successfully!');
    } catch (error) {
      alert('Error saving data: ' + error.message);
    }
  };


  const handleLogout = () => {
    console.log("User logged out");
  };
  return (
    <>
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


      {/* Main Form */}
      <div className="divide">
        <div className="report-form">
          <div className="report-In">
            <h2>Report Information</h2>
            <p>*To create the new report please fill the Student information first.</p>

            {/* Student Information */}
            <main className="main_content">
              <div className="right-panel">
                <form className="student-info-form" onSubmit={handleSubmit}>
                  <h2>Student Information</h2>
                  <div className="form-group">
                    <label>Upload Photo of Student</label>
                    <div
                      className="photo-upload"
                      onClick={() => document.getElementById('photo-input').click()}
                    >
                      {photo ? (
                        <img src={photo} alt="Uploaded" className="uploaded-photo" />
                      ) : (
                        <span>Upload photo here</span>
                      )}
                    </div>
                    <input
                      id="photo-input"
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className="form-group">
                    <label>Name of the Student</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Department of the Student</label>
                    <input
                      type="text"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Id of the Student</label><br />
                    <input
                      type="Roll number"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      required
                    />
                  </div>
                  {/* <div className="form-group">
                    <label>Id of the Student</label>
                    <input
                      type="Rollno"
                      value={id}
                      onChange={(e) => setId(e.target.value)}
                      required
                    />
                  </div> */}
                </form>
              </div>
            </main>

            {/* Semester and Subjects */}
            <div className="semester-selection">
              <h3>Select Semester</h3>
              <div className="semester-buttons">
                {['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6', 'Sem 7', 'Sem 8'].map((sem) => (
                  <button
                    key={sem}
                    className={`semester-button ${selectedSemester === sem ? 'active' : ''}`}
                    onClick={() => setSelectedSemester(sem)}
                  >
                    {sem}
                  </button>
                ))}
              </div>
            </div>

            <div className="subject-section">
              <h3>Add Subject and Marks:</h3>
              {subjects.map((subject, index) => (
                <div key={index} className="subject-row">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject.name}
                    onChange={(e) => handleSubjectChange(index, 'name', e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Marks"
                    value={subject.marks}
                    onChange={(e) => handleSubjectChange(index, 'marks', e.target.value)}
                  />
                </div>
              ))}
              <button className="add-button" onClick={addSubject}>Add</button>
            </div>

            {/* Activity Section */}
            <div className="activity-section">
              <h3>Add Activity</h3>
              <div className="activity-input">
                <select
                  value={activityInput.name}
                  onChange={(e) => handleActivityInputChange('name', e.target.value)}
                >
                  <option value="">Select Activities</option>
                  <option value="Interships">Interships</option>
                  <option value="Educational">Educational</option>
                  <option value="Sports">Sports</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="text"
                  placeholder="Describe the activity..."
                  value={activityInput.description}
                  onChange={(e) => handleActivityInputChange('description', e.target.value)}
                />
                <input
                  type="date"
                  placeholder="Enter date"
                  value={activityInput.date}
                  onChange={(e) => handleActivityInputChange('date', e.target.value)}
                />
                <button className="add-button" onClick={addActivity}>Add</button>
              </div>
            </div>

            {/* Activities Table */}
            <div className="activities-table">
              <h3>Activities:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Activity Name</th>
                    <th>Description</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.name}</td>
                      <td>{activity.description}</td>
                      <td>{activity.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="submit-button" onClick={handleSubmit}>Submit</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReportForm;
