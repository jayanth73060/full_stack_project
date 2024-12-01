import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Navbar from "./Navbar";
import Attendence from "./Attendence";
import Attendence_Request from "./Attendence_Request";
import Examination from "./Examination";
import Timetable from "./Timetable";
import Verification from "./Verification";
import Academic from "./Academic";
import Teacherside from "./Teacherside";
import { useLocation } from "react-router-dom";

const Layout = () => {
  const location = useLocation(); // Get the current location

  // Define routes where the Navbar should not be visible
  const hideNavbarRoutes = ["/teacher"];

  // Check if the current route matches any of the hideNavbarRoutes
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div style={{ display: "flex" }}>
      {!shouldHideNavbar && <Navbar />} {/* Conditionally render Navbar */}
      <div
        style={{
          marginLeft: shouldHideNavbar ? "0" : "250px", // Adjust margin when Navbar is hidden
          padding: "20px",
          width: "100%",
        }}
      >
        <Routes>
          <Route path="/academic" element={<Academic />} />
          <Route path="/attendence" element={<Attendence />} />
          <Route path="/attendencerequest" element={<Attendence_Request />} />
          <Route path="/examination" element={<Examination />} />
          <Route path="/timetable" element={<Timetable />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/teacher" element={<Teacherside />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/*" element={<Layout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
