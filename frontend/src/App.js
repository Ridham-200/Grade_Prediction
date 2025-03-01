import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import QuestionBank from './components/QuestionBank';
import Dashboard from './components/Dashboard/Dashboard';
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
                <Link to="/questionbank">Question Bank</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/">Home</Link>
              </nav>
            </div>
          </div>
        </div>
        
        {/* Routes for different pages */}
        <Routes>
          {/* Home page route */}
          <Route path="/" element={
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
          } />
          
          {/* Question Bank route */}
          <Route path="/questionbank" element={<QuestionBank />} />
          
          {/* Dashboard route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
