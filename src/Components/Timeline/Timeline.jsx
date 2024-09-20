import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'; 
import "./Timeline.css"
import { 
    FaBook,
    FaCalendarAlt, FaTrophy, 
    FaProjectDiagram, 
    FaGraduationCap 
} from 'react-icons/fa';


const activities = [
    { date: '2024-01-10', title: 'Orientation', description: 'Introduction to the semester and campus tour.', icon: <FaCalendarAlt /> },
    { date: '2024-02-15', title: 'Midterm Exams', description: 'Midterm examinations for all subjects.', icon: <FaBook /> },
    { date: '2024-03-20', title: 'Project Submission', description: 'Submission of semester-long projects.', icon: <FaProjectDiagram /> },
    { date: '2024-04-25', title: 'Sports Day', description: 'Annual sports day with various competitions.', icon: <FaTrophy /> },
    { date: '2024-05-30', title: 'Final Exams', description: 'Final examinations for all subjects.', icon: <FaGraduationCap /> },
];

function Timeline() {
  return (
    <div className="timeline-container">
      <VerticalTimeline>
        {activities.map((activity, index) => (
          <VerticalTimelineElement
            key={index}
            date={activity.date}
            icon={activity.icon}
            iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
          >
            <h3 className="vertical-timeline-element-title">
              {activity.title}
            </h3>
            <p>{activity.description}</p>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  )
}

export default Timeline;
