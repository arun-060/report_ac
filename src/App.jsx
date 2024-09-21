import logo from './logo.svg';
import './App.css';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
 } from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard';
import SignIn from './pages/SignIn/SignIn';
import SignUp from  './pages/SignUp/SignUp';
import FacultyDashboard from './pages/FacultyDashboard/FacultyDashboard';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import ReportForm from './pages/ReportForm/ReportForm';
// import AdminDashboard from './pages/AdminDashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Navigate to={"/signin"}/>} />
        <Route path="/signin" element={<SignIn />} />

        {/* SignUp Route */}
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard Route */}
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />

        <Route path="/ReportForm" element={<ReportForm />} />


        {/* <Route path="/AdminDashboard" element={<ReportForm />} /> */}


      </Routes> 
    </Router>
  );
}

export default App;
