import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StudentDataService from '../../services/StudentDataService';
import {Link, Routes, Route, useNavigate} from 'react-router-dom'

function AddStudent(props) {

    const navigate = useNavigate();
    
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null)

    const initialStudentState = {
        rollNo: "",
        name: "",
        address: "",
        contactNo: "",
        dob: "",
        paidAmt: 0,
        remAmt:0
    };

    const [student, setStudent] = useState(initialStudentState);

    const handleInputChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setStudent(values => ({...values, [name]: value}))
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        StudentDataService.create(student)
        .then(response => {
            console.log(response.data);
            navigate("/students");
        })
        .catch(e => {
            console.log(e);
        });
    }

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Student Section</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            {error && (
                                <p className="error"> {error} </p>
                            )}
                                <div className="box-header">
                                    <h3 className="box-title"> Add New Student</h3>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Roll Number</label>
                                                    <input type="text" className="form-control" name="rollNo" required value={student.rollNo} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Student Name</label>
                                                    <input type="text" className="form-control" name="name" required value={student.name} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Address</label>
                                                    <input type="text" className="form-control" name="address" value={student.address}  onChange={handleInputChange} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Contact Number</label>
                                                    <input type="text" className="form-control" name="contactNo" required value={student.contactNo} onChange={handleInputChange} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Date Of Birth</label>
                                                    <input type="date" className="form-control" name="dob"  placeholder="Enter Date Of Birth" value={student.dob}  onChange={handleInputChange} />
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
        </>
    );
}

export default AddStudent;