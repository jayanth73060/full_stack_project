import React, { useState, useEffect } from "react";

const Examination = () => {
  const [results, setResults] = useState([]);
  const [sgpa, setSgpa] = useState(0.0);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch the username from local storage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    // Fetch the examination results for the logged-in user
    fetch(`http://localhost:3000/Results?Admission_Number=${storedUsername}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch examination results");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setResults(data[0].Subjects || []); // Ensure `results` exists in the response
          setSgpa(data[0].SGPA || 0.0); // Ensure `sgpa` exists in the response
        } else {
          alert("Examination results not found for the user");
        }
      })
      .catch((error) => {
        console.error("Error fetching examination results:", error.message);
      });
  }, []); // Empty dependency array to fetch once when the component mounts

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>UNIVERSITY EXAMINATION RESULTS - MAY 2024</h2>
      <table style={styles.table}>
        <thead>
          <tr style={styles.headerRow}>
            <th style={styles.headerCell}>Semester</th>
            <th style={styles.headerCell}>Subject Code</th>
            <th style={styles.headerCell}>Subject Description</th>
            <th style={styles.headerCell}>Credit</th>
            <th style={styles.headerCell}>Grade</th>
            <th style={styles.headerCell}>Result</th>
          </tr>
        </thead>
        <tbody>
          {results.length > 0 ? (
            results.map((result, index) => (
              <tr key={index} style={styles.row}>
                <td style={styles.cell}>{result.Semester}</td>
                <td style={styles.cell}>{result.Code}</td>
                <td style={styles.cell}>{result.Description}</td>
                <td style={styles.cell}>{result.Credits}</td>
                <td style={styles.cell}>{result.Grade}</td>
                <td style={styles.cell}>{result.Result}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" style={{ ...styles.cell, textAlign: "center" }}>
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div style={styles.sgpaContainer}>
        <strong>S.G.P.A: </strong> {sgpa.toFixed(3)}
      </div>
    </div>
  );
};

const styles = {
  container: {
    marginLeft: "270px", // Adjust for the sidebar
    marginTop: "30px",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
  },
  heading: {
    textAlign: "center",
    color: "#007bff",
    marginBottom: "20px",
    fontSize: "18px",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "20px",
  },
  headerRow: {
    backgroundColor: "#007bff",
    color: "white",
  },
  headerCell: {
    padding: "10px",
    textAlign: "center",
    fontWeight: "bold",
    border: "1px solid #ddd",
  },
  row: {
    textAlign: "center",
  },
  cell: {
    padding: "10px",
    border: "1px solid #ddd",
  },
  sgpaContainer: {
    textAlign: "right",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#333",
  },
};

export default Examination;
