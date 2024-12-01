import React, { useEffect, useState } from "react";
import "./timetable.css";

const Timetable = () => {
  const [timetable, setTimetable] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // Fetch the username from local storage
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);

    // Fetch the timetable data for the logged-in user
    fetch(`http://localhost:3000/Users?Admission_number=${storedUsername}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch timetable");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          setTimetable(data[0].Timetable);
        } else {
          alert("Timetable not found for the user");
        }
      })
      .catch((error) => {
        console.error("Error fetching timetable:", error.message);
      });
  }, []);

  const timeslots = [
    "09:00 To 09:55",
    "10:00 To 10:55",
    "11:00 To 11:55",
    "12:00 To 12:55",
    "01:00 To 01:55",
    "02:00 To 02:55",
    "03:00 To 03:55",
    "04:00 To 05:30",
  ];

  return (
    <div className="timetable-container">
      <h2 className="timetable-heading">College Time Table</h2>
      <table className="timetable">
        <thead>
          <tr>
            <th>Day</th>
            {timeslots.map((slot, index) => (
              <th key={index}>{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className="day-cell">{row.day}</td>
              {row.periods.map((period, colIndex) => (
                <td key={colIndex} className="period-cell">
                  {period}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Timetable;
