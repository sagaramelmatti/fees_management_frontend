import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentDataService from '../../services/StudentDataService';
import {Link, Routes, Route, useParams, useNavigate} from 'react-router-dom'

function EditStudent(props) {

    const { id }= useParams();
    let navigate = useNavigate();

    const initialStudentState = {
        id: null,
        rollNo: "",
        name: "",
        address: "",
        contactNo: "",
        dob: "",
        paidAmt: 0,
        remAmt:0
      };

    const [student, setCurrentStudent] = useState(initialStudentState);
    const [message, setMessage] = useState("");

    const getStudent = id => {
        StudentDataService.get(id)
        .then(response => {
            console.log('response ='+response.data);
            setCurrentStudent(response.data);
           
        })
        .catch(e => {
            console.log(e);
        });
    };

  useEffect(() => {
    if (id)
      getStudent(id);
  }, [id]);


  const handleInputChange = event => {
    const { name, value } = event.target;
    setCurrentStudent({ ...student, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    StudentDataService.update(student.id, student)
    .then(response => {
        console.log(response.data);
        navigate("/students");
        setMessage("The Student has been updated successfully!");
    })
    .catch(e => {
        console.log(e);
    });
}


    return (
        <>
            {student ? (
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Student Section</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Edit Student</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Roll Number</label>
                                                    <input type="text" className="form-control" name="rollNo" value={student.rollNo} onChange={handleInputChange} />
                                                    <input type="hidden" className="form-control" name="id" value={student.id}  />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Student Name</label>
                                                    <input type="text" className="form-control" name="name" value={student.name} onChange={handleInputChange} />

                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Address</label>
                                                    <input type="text" className="form-control" name="address" value={student.address }  onChange={handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Contact Number</label>
                                                    <input type="text" className="form-control" name="contactNo" value={student.contactNo} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Date Of Birth</label>
                                                    <input type="date" className="form-control" placeholder="Enter Date Of Birth" name="dob" value={student.dob} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-3">
                                            </div>
                                            <div className="col-md-3">
                                                <button type="submit" className="btn btn-success btn-block btn-flat r-btn">Save</button>
                                            </div>
                                            <div className="col-md-6">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            ) : (
                <div>
                  <br />
                  <p>Please click on a Student...</p>
                </div>
              )}
        </>
    );
}

export default EditStudent;