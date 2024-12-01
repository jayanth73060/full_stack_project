import React, { useState, useEffect } from "react";
import "./Teacherside.css";

const Teacherside = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/requests")
      .then((response) => response.json())
      .then((data) => {
        setRequests(data);
      })
      .catch((error) => console.error("Error fetching requests:", error.message));
  }, []);

  const handleDelete = (requestId) => {
    fetch(`http://localhost:3000/requests/${requestId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the request.");
        }
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.id !== requestId)
        );
        alert("Request deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting request:", error.message);
      });
  };

  const handleApproval = (requestId, admissionNumber, subjectCode, classesRequested) => {
    fetch(`http://localhost:3000/requests/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Approved" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update request status.");
        }
        return response.json();
      })
      .then(() => {
        fetch(`http://localhost:3000/Attendence?Admission_number=${admissionNumber}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.length > 0) {
              const attendanceEntry = data[0];
  
              // Update the subject's attendance details
              const updatedAttendanceDetails = attendanceEntry.attendence_details.map(
                (subject) => {
                  if (subject.subject_code === subjectCode) {
                    const presentCount = parseInt(
                      subject.attendance_entered.match(/Present: (\d+)/)[1]
                    );
                    const absentCount = parseInt(
                      subject.attendance_entered.match(/Absent: (\d+)/)[1]
                    );
  
                    const updatedPresentCount = presentCount + classesRequested;
                    const updatedClassesConducted =
                      subject.classes_conducted + classesRequested;
                    const updatedAttendancePercentage = (
                      (updatedPresentCount / updatedClassesConducted) *
                      100
                    ).toFixed(2);
  
                    return {
                      ...subject,
                      classes_conducted: updatedClassesConducted,
                      attendance_entered: `Present: ${updatedPresentCount}, Absent: ${absentCount}`,
                      attendance_percentage: updatedAttendancePercentage,
                    };
                  }
                  return subject;
                }
              );
  
              // Save updated attendance details
              fetch(`http://localhost:3000/Attendence?Admission_number=${attendanceEntry}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ attendence_details: updatedAttendanceDetails }),
              })
                .then((response) => {
                  if (!response.ok) {
                    throw new Error("Failed to update attendance data.");
                  }
                  alert("Attendance updated successfully!");
                })
                .catch((error) => {
                  console.error("Error updating attendance:", error.message);
                });
            } else {
              alert("No attendance record found for the student.");
            }
          });
      })
      .catch((error) => {
        console.error("Error updating request:", error.message);
      });
  };
  
  const handleRejection = (requestId) => {
    fetch(`http://localhost:3000/requests/${requestId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: "Rejected" }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update request status.");
        }
        alert("Request rejected successfully!");
      })
      .catch((error) => {
        console.error("Error rejecting request:", error.message);
      });
  };

  return (
    <div className="teacher-container">
      <h1>Attendance Requests</h1>
      <table className="teacher-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Admission Number</th>
            <th>Subject Code</th>
            <th>Classes Requested</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.admissionNumber}</td>
              <td>{request.subject_code}</td>
              <td>{request.classesRequested}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "Pending" && (
                  <>
                    <button
                      className="approve-button"
                      onClick={() =>
                        handleApproval(
                          request.id,
                          request.admissionNumber,
                          request.subject_code,
                          request.classesRequested
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      className="reject-button"
                      onClick={() => handleRejection(request.id)}
                    >
                      Reject
                    </button>
                  </>
                )}
                <button
                  className="delete-button"
                  onClick={() => handleDelete(request.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Teacherside;
