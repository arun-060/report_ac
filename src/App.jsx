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
import SignUp from  './pages/SignUp/SignUp'

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
      </Routes>
    </Router>
  );
}

export default App;
