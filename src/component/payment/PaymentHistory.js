import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


function PaymentHistory(props) {
    const [payments, setPayments] = useState([]);
    useEffect(() => {
        getPayments();
    }, []);

    // get payments
    const getPayments = () => {
        axios
            .get("http://localhost:8080/api/payments/")
            .then((response) => {
                if (response.status === 200) {
                    setPayments(response?.data);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onDelete = (id) => {
        axios.delete(`http://localhost:8080/api/payments/${id}`)
        .then(() => {
            getPayments();
        })
    }

    const setData = (data) => {
        let { id, name, paymentDate , paymentAmount , remAmt } = data;
        localStorage.setItem('id', id);
        localStorage.setItem('name', name);
        localStorage.setItem('paymentDate', paymentDate);
        localStorage.setItem('paymentAmount', paymentAmount);
        localStorage.setItem('remAmt', remAmt);
    }

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Payment Section</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title"> Payment History</h3>
                                </div>
                                <div className="box-body">
                                    <a href="/addStudent"><button className="btn btn-success"><i className="glyphicon glyphicon-plus"></i> Add New Payment</button></a>
                                    <br />
                                    <br />
                                    <table id="table" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th width="5%">Sr. No </th>
                                                <th width="15%">Student Name</th>
                                                <th width="10%">Payment Date</th>
                                                <th width="25%">Payment Amount</th>
                                                <th width="10%">Paid Due Till Date</th>
                                                <th width="15%">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {payments &&
                                                payments.map((payment) => (
                                                    <tr key={payment?.id} >
                                                        <td>{payment?.id} </td>
                                                        <td>{payment?.student.name}</td>
                                                        <td>{payment?.paymentDate}</td>
                                                        <td>{payment?.paymentAmount}</td>
                                                        <td>{payment?.remAmt}</td>
                                                        <td>    
                                                            <Link to={"/payments/"+ payment?.id} title={"Edit"}><button className="btn btn-warning"><i className="fa fa-pencil"></i> Edit </button></Link>
                                                        &nbsp; &nbsp;&nbsp; &nbsp;
                                                        <button className="btn btn-danger" onClick={() => onDelete(payment?.id)}><i className="fa fa-trash-o"></i> Delete</button></td>
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

export default PaymentHistory;