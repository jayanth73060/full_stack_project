import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const sidebarStyles = {
  height: "100vh",
  width: "250px",
  backgroundColor: "#0a3c59",
  color: "white",
  padding: "20px",
  position: "fixed",
  top: 0,
  left: 0,
  display: "flex",
  flexDirection: "column",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
};

const logoStyles = {
  display: "flex",
  alignItems: "center",
  marginBottom: "20px",
};

const profileStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "30px",
};

const profileImageStyles = {
  width: "80px",
  height: "80px",
  borderRadius: "50%",
  marginBottom: "10px",
  border: "2px solid white",
};

const menuItemStyles = {
  listStyleType: "none",
  padding: 0,
  margin: 0,
};

const menuLinkStyles = {
  display: "block",
  padding: "10px 15px",
  marginBottom: "5px",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
  fontWeight: "500",
};

const Navbar = () => {
  const [name, setName] = useState(""); // State to store the student's name
  const admissionNumber = localStorage.getItem("username"); // Retrieve the admission number from local storage

  useEffect(() => {
    if (admissionNumber) {
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
            // Assuming the student's name is in the first record
            setName(data[0].Name); // Set the student's name from the fetched data
          } else {
            console.error("No student found for the given admission number.");
          }
        })
        .catch((error) => {
          console.error("Error fetching student data:", error);
        });
    } else {
      console.error("No admission number found in local storage.");
    }
  }, [admissionNumber]); // Effect will run when the admission number changes

  return (
    <div style={sidebarStyles}>
      <div style={logoStyles}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUoko4aGH9-9mtvI8DS5KYIiDSXtUm9QiN5g&s"
          alt="College Logo"
          style={{ width: "100px", borderRadius: "50px" }}
        />
      </div>
      <div style={profileStyles}>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="Profile"
          style={profileImageStyles}
        />
        <span>Welcome,</span>
        <strong>{name || "Loading..."}</strong> {/* Display student's name or "Loading..." */}
      </div>
      <ul style={menuItemStyles}>
        <li>
          <Link to="/academic" style={menuLinkStyles}>
            Academic
          </Link>
        </li>
        <li>
          <Link to="/attendence" style={menuLinkStyles}>
            Attendence
          </Link>
        </li>
        <li>
          <Link to="/attendencerequest" style={menuLinkStyles}>
            Attendence Request
          </Link>
        </li>
        <li>
          <Link to="/examination" style={menuLinkStyles}>
            Examination
          </Link>
        </li>
        <li>
          <Link to="/timetable" style={menuLinkStyles}>
            Time Table
          </Link>
        </li>
        <li>
          <Link to="/verification" style={menuLinkStyles}>
            Verification
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
