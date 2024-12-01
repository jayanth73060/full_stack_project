import React, { useState } from "react";

const Verification = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const admissionNumber = localStorage.getItem("username"); // Retrieve from local storage

  const updatePhoneNumber = () => {
    if (!admissionNumber) {
      alert("Admission number not found in local storage.");
      return;
    }

    if (!phoneNumber || !/^\d{10}$/.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Fetch the student's record based on admission number
    fetch(`http://localhost:3000/Academic?Roll_Number=${admissionNumber}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch student data.");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          const studentRecord = data[0]; // Assuming only one record matches

          // Use the Roll_Number of the student record to update the phone number
          return fetch(`http://localhost:3000/Academic/${studentRecord.Roll_Number}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ Phone_Number: phoneNumber }), // Adding/Updating phone_number
          });
        } else {
          throw new Error("No record found for the given admission number.");
        }
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update phone number.");
        }
        alert("Phone number updated successfully!");
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("An error occurred: " + error.message);
      });
  };

  return (
    <div>
      <h2>Update Phone Number</h2>
      <p>Admission Number: {admissionNumber}</p>
      <input
        type="text"
        placeholder="Enter new phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={updatePhoneNumber}>Update Phone Number</button>
    </div>
  );
};

export default Verification;
