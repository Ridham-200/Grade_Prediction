import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'; 
import QuestionBank from './components/QuestionBank'; // Assuming this is your Question Bank component
import Dashboard from './components/Dashboard/Dashboard'; // Assuming this is your Dashboard component
import GradeForm from "./components/GradeForm";
import Improvements from "./components/Improvements";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Fixed Navigation Bar */}
        <div className="navbar">
          <div className="navbar-content">
            <div className="navbar-brand">Grade Prediction System</div>
            <div className="navbar-links">
              <nav>
                {/* Use Link components for routing */}
                <Link to="questionbank">Question Bank</Link>
                <Link to="dashboard">Dashboard</Link>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Main Content Container */}
        <div className="content-container">
          {/* Left Section - Improvements */}
          <div className="improvements-section">
            <Improvements />
          </div>
          
          {/* Right Section - Grade Prediction Form */}
          <div className="prediction-section">
            <GradeForm />
          </div>
        </div>

        {/* Routes for different pages */}
        <div className="content">
          <Routes>
            <Route path="/questionbank" element={<QuestionBank />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
