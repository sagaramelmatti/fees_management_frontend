import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


function StudentList(props) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getPosts();
    }, []);

    // get posts
    const getPosts = () => {
        axios
            .get("http://localhost:8080/api/students/")
            .then((response) => {
                if (response.status === 200) {
                    setPosts(response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onDelete = (id) => {
        axios.delete(`http://localhost:8080/api/students/${id}`)
        .then(() => {
            getPosts();
        })
    }

    const setData = (data) => {
        let { id, rollNo, name, address , contactNo , dob, paidAmt , remAmt } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('rollNo', rollNo);
        localStorage.setItem('name', name);
        localStorage.setItem('address', address);
        localStorage.setItem('contactNo', contactNo);
        localStorage.setItem('paidAmt', paidAmt);
        localStorage.setItem('remAmt', remAmt);
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
                                <div className="box-header">
                                    <h3 className="box-title"> Student List</h3>
                                </div>
                                <div className="box-body">
                                    <a href="/addStudent"><button className="btn btn-success"><i className="glyphicon glyphicon-plus"></i> Add Student</button></a>
                                    <br />
                                    <br />
                                    <table id="table" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="5%">Sr. No </th>
                                                <th width="10%">Roll No</th>
                                                <th width="15%">Name</th>
                                                <th width="10%">Contact No.</th>
                                                <th width="25%">Address</th>
                                                <th width="10%">Paid Amount</th>
                                                <th width="10%">Rem Amount</th>
                                                <th width="15%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {posts &&
                                                posts.map((student) => (
                                                    <tr key={student?.id} >
                                                        <td>{student?.id} </td>
                                                        <td>{student?.rollNo}</td>
                                                        <td>{student?.name}</td>
                                                        <td>{student?.contactNo}</td>
                                                        <td>{student?.address}</td>
                                                        <td>{student?.paidAmt}</td>
                                                        <td>{student?.remAmt}</td>
                                                        <td>    
                                                            <Link to={"/students/"+ student?.id} title={"Edit"}><button className="btn btn-warning"><i className="fa fa-pencil"></i> Edit </button></Link>
                                                        &nbsp; &nbsp;&nbsp; &nbsp;
                                                        <button className="btn btn-danger" onClick={() => onDelete(student?.id)}><i className="fa fa-trash-o"></i> Delete</button></td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default StudentList;