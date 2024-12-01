import React, { useState, useEffect } from "react";
import "./academic.css";

const Academic = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = localStorage.getItem("username"); // Retrieve username from localStorage
        if (!username) {
          throw new Error("No user logged in. Please log in first.");
        }

        const response = await fetch(`http://localhost:3000/Academic?Roll_Number=${username}`);
        if (!response.ok) {
          throw new Error("Failed to fetch student data.");
        }

        const data = await response.json();
        if (data.length === 0) {
          throw new Error("Student data not found.");
        }

        setStudentData(data[0]); // Assuming only one result for the Roll Number
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!studentData) {
    return null; // Render nothing if no data found
  }

  return (
    <div className="profile-container">
      <h1 className="profile-heading">Student Profile</h1>
      <div className="profile-card">
        <div className="profile-image">
          <img
            src={
              studentData.profilePicture ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            }
            alt="Profile"
            className="profile-pic"
          />
        </div>
        <div className="profile-details">
          <p>
            <strong>Name:</strong> {studentData.Name}
          </p>
          <p>
            <strong>Roll Number:</strong> {studentData.Roll_Number}
          </p>
          <p>
            <strong>Department:</strong> {studentData.Department}
          </p>
          <p>
            <strong>Year of Study:</strong> {studentData.Year_of_Study}
          </p>
          <p>
            <strong>Email:</strong> {studentData.Email}
          </p>
          <p>
            <strong>Phone Number:</strong> {studentData.Phone_Number}
          </p>
          <p>
            <strong>Address:</strong> {studentData.Address}
          </p>
          <p>
            <strong>CGPA:</strong> {studentData.CGPA}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Academic;
