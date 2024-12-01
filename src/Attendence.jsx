import React, { useState, useEffect } from "react";

const Attendence = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [admissionNumber, setAdmissionNumber] = useState("");


  useEffect(() => {
    // Fetch the admission number from localStorage
    const storedAdmissionNumber = localStorage.getItem("username");
    setAdmissionNumber(storedAdmissionNumber);
    if (!storedAdmissionNumber) {
      console.error("No username found in localStorage");
    }    

    // Fetch attendance details for the logged-in user
    if (storedAdmissionNumber) {
      fetch(`http://localhost:3000/Attendence?Admission_number=${storedAdmissionNumber}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch attendance data");
          }
          return response.json();
        })
        .then((data) => {
          if (data.length > 0) {
            setAttendanceData(data[0].attendence_details || []); // Access `attendance_details` directly
          } else {
            alert("No attendance data found for the user.");
          }
        })
        .catch((error) => {
          console.error("Error fetching attendance data:", error.message);
        });
    }
  }, []);

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    margin: "20px 0",
    fontSize: "16px",
    textAlign: "center",
  };

  const thStyles = {
    backgroundColor: "#0a3c59",
    color: "white",
    padding: "10px",
    border: "1px solid #ddd",
  };

  const tdStyles = {
    padding: "10px",
    border: "1px solid #ddd",
  };

  const rowStyles = {
    backgroundColor: "#f9f9f9",
  };

  const headerRowStyles = {
    backgroundColor: "#0a3c59",
    color: "white",
  };

  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "20px 0" }}>Attendance Details</h1>
      <table style={tableStyles}>
        <thead>
          <tr style={headerRowStyles}>
            <th style={thStyles}>Subject Code</th>
            <th style={thStyles}>Subject Description</th>
            <th style={thStyles}>Classes Conducted</th>
            <th style={thStyles}>Attendance Entered (Slots)</th>
            <th style={thStyles}>Present % (P / (P+A))</th>
            <th style={thStyles}>OD/ML Taken</th>
            <th style={thStyles}>OD/ML % Approved</th>
            <th style={thStyles}>Attendance %</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.length > 0 ? (
            attendanceData.map((row, index) => (
              <tr key={index} style={rowStyles}>
                <td style={tdStyles}>{row.subject_code}</td>
                <td style={tdStyles}>{row.subject_description}</td>
                <td style={tdStyles}>{row.classes_conducted}</td>
                <td style={tdStyles}>{row.attendance_entered}</td>
                <td style={tdStyles}>{row.present_percentage}</td>
                <td style={tdStyles}>{row.od_ml_taken}</td>
                <td style={tdStyles}>{row.od_ml_approved_percentage}</td>
                <td style={tdStyles}>{row.attendance_percentage}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                No attendance data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Attendence;
