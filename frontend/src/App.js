// App.js
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import QuestionBank from './components/QuestionBank';
import Dashboard from './components/Dashboard/Dashboard';
import GradeForm from "./components/GradeForm";
import Improvements from "./components/Improvements";
import Home from "./components/Home/Home";
import "./App.css";

function Navbar() {
  const location = useLocation();
  
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">Smart Grade Analytics</div>
        <div className="navbar-links">
          <nav>
            {/* {location.pathname === '/' && (
              <>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/grade-prediction">Grade Prediction</Link>
              </>
            )} */}
            {location.pathname === '/dashboard' && (
              <>
                <Link to="/">Home</Link>
                <Link to="/grade-prediction">Grade Prediction</Link>
              </>
            )}
            {location.pathname === '/grade-prediction' && (
              <>
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/questionbank">Question Bank</Link>
              </>
            )}
            {location.pathname === '/questionbank' && (
              <>
                <Link to="/">Home</Link>
                <Link to="/grade-prediction">Grade Prediction</Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        
        {/* Routes for different pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/grade-prediction" element={
            <div className="content-container">
              <div className="improvements-section">
                <Improvements />
              </div>
              <div className="prediction-section">
                <GradeForm />
              </div>
            </div>
          } />
          <Route path="/questionbank" element={<QuestionBank />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
