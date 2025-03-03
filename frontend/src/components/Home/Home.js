import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to Smart Grade Analytics</h1>
        <p>Your one-stop solution for academic performance insights and predictions.</p>
      </div>

      <div className="cards-container">
        <div className="card">
          <div className="card-icon">📊</div>
          <h2>Grade Prediction</h2>
          <p>Predict your future grades using intelligent data analysis and trends.</p>
          <a href="/grade-prediction" className="btn">Try Prediction</a>
        </div>

        <div className="card">
          <div className="card-icon">📈</div>
          <h2>Performance Dashboard</h2>
          <p>Analyze students current performance, track progress, and identify improvement areas.</p>
          <a href="/dashboard" className="btn">View Dashboard</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
