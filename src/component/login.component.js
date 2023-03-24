import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, Routes, Route, useNavigate} from 'react-router-dom'
import authService from '../services/auth.service';

function Login(props) {

    const navigate = useNavigate();
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null)

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        authService.login(username, password)
        .then(response => {
            console.log(response.data);
            navigate("/profile");
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
                                                    <input type="text" className="form-control" name="rollNo" required value={username} onChange={(e) => setUsername(e.target.value)} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group required">
                                                    <label className="control-label">Student Name</label>
                                                    <input type="text" className="form-control" name="name" required value={password} onChange={(e) => setPassword(e.target.value)} />
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

export default Login;