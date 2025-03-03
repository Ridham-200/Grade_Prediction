import React from "react";

const Improvements = () => {
  const improvementTips = [
    {
      id: 1,
      title: "Improve Attendance",
      description: "Regular attendance has a significant impact on grades. Aim for at least 90% attendance for better results."
    },
    {
      id: 2,
      title: "Active Participation",
      description: "Engage in class discussions and ask questions to clarify doubts immediately."
    },
    {
      id: 3,
      title: "Consistent Study Schedule",
      description: "Develop a regular study routine rather than cramming before exams."
    },
    {
      id: 4,
      title: "Seek Feedback",
      description: "Regularly consult with teachers about areas for improvement."
    },
    {
      id: 5,
      title: "Practice Previous Papers",
      description: "Solve previous years' question papers to understand exam patterns and important topics."
    },
    {
      id: 6,
      title: "Effective Time Management",
      description: "Prioritize tasks and allocate sufficient time for studying, assignments, and revision to avoid last-minute stress."
    }
    
  ];

  return (
    <div className="card">
      <h2 className="card-title">Ways to Improve Your Grade</h2>
      <div className="improvements-list">
        {improvementTips.map((tip) => (
          <div key={tip.id} className="improvement-item">
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Improvements;