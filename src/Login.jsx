import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const proceedLogin = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(`http://localhost:3000/Login?Admission_number=${username}`);
        if (!response.ok) {
          throw new Error("Server error");
        }
        const data = await response.json();

        if (data.length === 0) {
          alert("User not found");
        } else {
          const user = data[0];
          if (user.Password === password) {
            alert("Login successful!");
            // Store username in localStorage
            localStorage.setItem("username", username);
            navigate("/academic");
          } else {
            alert("Incorrect password. Please try again.");
          }
        }
      } catch (error) {
        alert(`Login failed: ${error.message}`);
      }
    }
  };

  const validate = () => {
    let isValid = true;
    let messages = [];

    if (!username) {
      isValid = false;
      messages.push("Username cannot be empty.");
    }
    if (!password) {
      isValid = false;
      messages.push("Password cannot be empty.");
    }

    if (!isValid) {
      alert(messages.join(" "));
    }

    return isValid;
  };

  return (
    <main className="form-signin w-100 m-auto">
      <form className="fr" onSubmit={proceedLogin}>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
        <div className="form-floating mb-3">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="form-control"
            id="floatingInput"
            placeholder="APxxxxxxxxxxx"
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-primary w-100 py-2">
          Sign In
        </button>
      </form>
    </main>
  );
};

export default Login;
