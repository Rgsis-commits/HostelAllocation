import React, { useState, useEffect } from "react";
import "../css/student.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";
import Header from "./header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function StudentDetails() {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userEmail = localStorage.getItem("studentEmail");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:6969/student/student-detail/${userEmail}`
        );
        if (response.status === 200) {
          setStudentData(response.data);
        } else {
          console.error("Error fetching student detail.");
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching student detail:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(localStorage.getItem("isLogin") !== 'true'){
      return navigate("/");
   }
  })

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!studentData) {
    return <div>No data available</div>;
  }

  return (
    <div className="back">
      <Header />
      <div className="mainclass">
        <div className="student-profile py-4">
          <div className="container1">
            <div className="row">
              <div className="col-lg-4">
                <div className="body1 card shadow-sm">
                  <div className="card-header bg-transparent text-center">
                    {/* <img
                      className="profile_img"
                      src={studentData.photo}
                      alt=""
                    /> */}
                    <img
                      className="profile_img"
                      src="https://drive.google.com/uc?export=view&id=150jX_6xyAyqVFbHVokU0wqxuCyzvGrhg"
                      alt=""
                    />
                    <h3>
                      {studentData.firstName} {studentData.lastName}
                    </h3>
                  </div>
                  <div className="card-body">
                    <p className="mb-0">
                      <strong className="pr-1">Student ID: </strong>
                      {studentData.student_id}
                    </p>
                    <p className="mb-0">
                      <strong className="pr-1">Hostel ID: </strong>
                      {studentData.hostel_id}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="body2 card shadow-sm">
                  <div className="card-header bg-transparent border-0">
                    <h3 className="mb-0">
                      <i className="fa fa-clone pr-1"></i>&nbsp; General
                      Information
                    </h3>
                  </div>
                  <div className="card-body pt-0">
                    <table className="table table-bordered">
                      <tr>
                        <th width="30%">Full Name</th>
                        <td width="2%">:</td>
                        <td>
                          {studentData.first_name} {studentData.last_name}
                        </td>
                      </tr>
                      <tr>
                        <th width="30%">Roll No</th>
                        <td width="2%">:</td>
                        <td>{studentData.roll_no}</td>
                      </tr>
                      <tr>
                        <th width="30%">Graduation Year </th>
                        <td width="2%">:</td>
                        <td>{studentData.year}</td>
                      </tr>
                      <tr>
                        <th width="30%">Email</th>
                        <td width="2%">:</td>
                        <td>{studentData.email}</td>
                      </tr>
                    </table>
                    <h3 className="mb-0">
                      <i className="fa fa-clone pr-1"></i>&nbsp; Hostel
                      Information
                    </h3>
                  </div>
                  <div className="card-body pt-0">
                    <table className="table table-bordered">
                      <tr>
                        <th width="30%">Hostel Name</th>
                        <td width="2%">:</td>
                        <td>{studentData.hostel_name}</td>
                      </tr>
                      <tr>
                        <th width="30%">Floor</th>
                        <td width="2%">:</td>
                        <td>{studentData.floor}</td>
                      </tr>
                      <tr>
                        <th width="30%">Room</th>
                        <td width="2%">:</td>
                        <td>{studentData.room}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentDetails;
