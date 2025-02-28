import React from 'react';

const Result = ({ predictedGrade }) => {
  return (
    <div className="result-container">
      <h2>Prediction Result</h2>
      <p>Your predicted grade is: <strong>{predictedGrade}</strong></p>
    </div>
  );
};

export default Result;