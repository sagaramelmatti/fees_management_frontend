import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentDataService from '../../services/PaymentDataService';
import {Link, Routes, Route, useNavigate} from 'react-router-dom'

function AddPayment(props) {

    const navigate = useNavigate();
    
    const [students, setStudents] = React.useState([]);
    const [studentId, setStudentId] = useState("");
    const [feesDeposited, setFeesDeposited] = useState("");
    const [feesPending, setFeesPending] = useState("");
    const [paymentAmount, setPaymentAmount] = useState("");
    const [paymentDate, setPaymentDate] = useState("");
    const [paidAmt, setPaidAmt] = useState("");
    const [remAmt, setRemAmt] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(null)

    React.useEffect(() => {
        async function getStudents() {
          const response = await fetch("http://localhost:8080/api/students/");
          const body = await response.json();
          setStudents(body.map(item => {
              return { value: item.id, label: item.name };
            }));
        }
        getStudents();
      }, []);

    const handleSelect=(e)=>{
        console.log('studentId=',e.target.value);
        setStudentId(e.target.value);
        axios.get('http://localhost:8080/api/students/' + e.target.value).then(response => {
            setFeesDeposited(response?.data.paidAmt);
            setFeesPending(response?.data.remAmt);
            setRemAmt(response?.data.remAmt);
        });
    }

    const handlePaymentAmount=(e)=>{
        if(e.target.value != undefined && e.target.value != ''){
            setPaymentAmount(e.target.value);
            console.log('feesPending=',feesPending);
            console.log('paymentAmount=',e.target.value);
            var remAmount = parseFloat(remAmt) - parseFloat(e.target.value);
            var paidAmount = parseFloat(feesDeposited) + parseFloat(e.target.value);
            setFeesPending(remAmount);
            setRemAmt(remAmount);
            setPaidAmt(paidAmount);
        }
       
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            studentId : studentId,
            paymentAmount : paymentAmount,
            paidAmt : paidAmt,
            remAmt : remAmt,
            paymentDate : paymentDate
        };

        PaymentDataService.create(data)
          .then(response => {
            console.log(response.data);
            navigate("/payments");
          })
          .catch(e => {
            console.log(e);
          });
    }

    return (
        <>
            <div className="content-wrapper">
                <section className="content-header">
                    <h1>Make Payment</h1>
                </section>
                <section className="content">
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="box">
                            {error && (
                                <p className="error"> {error} </p>
                            )}
                                <div className="box-header">
                                    <h3 className="box-title"> Payment Master</h3>
                                </div>
                                <form method ="post" className='form' onSubmit={handleSubmit}>
                                    <div className="box-body">
                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="form-group required">
                                                    <label className="control-label">Student Name</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <select className='form-control select2' value={studentId} onChange={handleSelect}>
                                                    {students.map(o => (
                                                        <option key={o.value} value={o.value}>{o.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label className="control-label">Fees Deposited</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" name="feesDeposited" value={feesDeposited}  readOnly/>
                                                    <input type="hidden" className="form-control" name="paidAmt" value={paidAmt}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="form-group">
                                                    <label className="control-label">Fees Pending</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                <input type="text" className="form-control" name="feesPending" value={feesPending} readOnly/>
                                                <input type="hidden" className="form-control" name="remAmt" value={remAmt}/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-2" >
                                                <div className="form-group required">
                                                    <label className="control-label">Make Payment Amount</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <input type="text" className="form-control" name="paymentAmount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} onBlur={handlePaymentAmount} required />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-md-2">
                                                <div className="form-group required">
                                                    <label className="control-label">Payment Date</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="form-group">
                                                    <input type="date" className="form-control" name="paymentDate" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} required />
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="row">
                                            <div className="col-md-2">
                                            </div>
                                            <div className="col-md-3">
                                                <button type="submit" className="btn btn-success btn-block btn-flat r-btn">Save</button>
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

export default AddPayment;