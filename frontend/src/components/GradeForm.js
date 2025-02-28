import React, { useState } from "react";
import { predictGrade } from "../api";
import Result from "./Result";

const GradeForm = () => {
  const [formData, setFormData] = useState({
    subjectName: "",
    remarks: 0,
    teacherExp: 0,
    attendance: 0,
    parentalEducation: "",
    gender: "",
    cgpa: 0,
  });

  const [predictedGrade, setPredictedGrade] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const inputData = {
        "Subject Name": formData.subjectName.trim(),
        Remarks: Number(formData.remarks),
        "Teacher Exp": Number(formData.teacherExp),
        "Attendance (%)": Number(formData.attendance),
        "Parental Education": formData.parentalEducation.trim(),
        Gender: formData.gender.trim(),
        CGPA: Number(formData.cgpa),
      };

      const requiredFields = [
        "Subject Name",
        "Remarks",
        "Teacher Exp",
        "Attendance (%)",
        "Parental Education",
        "Gender",
        "CGPA",
      ];

      const missingFields = requiredFields.filter((field) => !inputData[field]);
      if (missingFields.length > 0) {
        setError(`Missing fields: ${missingFields.join(", ")}`);
        setIsLoading(false);
        return;
      }

      const response = await predictGrade(inputData);
      setPredictedGrade(response.predicted_grade);
    } catch (error) {
      setError("Error predicting grade. Please check your inputs.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="card-title">Predict Your Grade</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
      <div>
  <label>Subject Name:</label>
  <select
    name="subjectName"
    value={formData.subjectName}
    onChange={handleChange}
    required
  >
    <option value="">-- Select --</option>
    <option value="Database Management System">Database Management System</option>
    <option value="Machine Learning">Machine Learning</option>
    <option value="Design and Analysis of Algorithms">Design and Analysis of Algorithms</option>
    <option value="Computer Organization and Architecture">Computer Organization and Architecture</option>
    <option value="Microprocessor and Microcontroller">Microprocessor and Microcontroller</option>
    <option value="Economics for Engineers">Economics for Engineers</option>
    <option value="Database Management System Laboratory">Database Management System Laboratory</option>
    <option value="Machine Learning Laboratory">Machine Learning Laboratory</option>
  </select>
</div>


        <div>
          <label>Remarks (0-5):</label>
          <input
            type="number"
            name="remarks"
            min="0"
            max="5"
            value={formData.remarks}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Teacher Experience (Years):</label>
          <input
            type="number"
            name="teacherExp"
            min="0"
            value={formData.teacherExp}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Attendance (%):</label>
          <input
            type="number"
            name="attendance"
            min="0"
            max="100"
            value={formData.attendance}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Parental Education:</label>
          <select
            name="parentalEducation"
            value={formData.parentalEducation}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="High School">High School</option>
            <option value="Graduate">Graduate</option>
            <option value="Postgraduate">Postgraduate</option>
          </select>
        </div>

        <div>
          <label>Gender:</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">-- Select --</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        <div>
          <label>CGPA:</label>
          <input
            type="number"
            step="0.01"
            min="0"
            max="10"
            name="cgpa"
            value={formData.cgpa}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Predicting..." : "Predict Grade"}
        </button>
      </form>

      {predictedGrade && <Result predictedGrade={predictedGrade} />}
    </div>
  );
};

export default GradeForm;