import React, { useState } from "react";

const AttendanceRequest = () => {
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [classesRequested, setClassesRequested] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new attendance request
    fetch("http://localhost:3000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        admissionNumber,
        subject_code: subjectCode,
        classesRequested,
        status: "Pending",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create attendance request.");
        }
        return response.json();
      })
      .then(() => {
        alert("Attendance request sent successfully!");
        setAdmissionNumber("");
        setSubjectCode("");
        setClassesRequested(0);
      })
      .catch((error) => {
        console.error("Error creating attendance request:", error.message);
      });
  };

  return (
    <div>
      <h2>Attendance Request</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Admission Number:
          <input
            type="text"
            value={admissionNumber}
            onChange={(e) => setAdmissionNumber(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Subject Code:
          <input
            type="text"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Classes Requested:
          <input
            type="number"
            value={classesRequested}
            onChange={(e) => setClassesRequested(Number(e.target.value))}
            required
          />
        </label>
        <br />
        <button type="submit">Send Request</button>
      </form>
    </div>
  );
};

export default AttendanceRequest;
