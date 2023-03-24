import React from 'react';
import {  Link } from "react-router-dom";

function Topmenu(props) {

    const showAdminBoard = props.admin;
    const showModeratorBoard = props.moderator;
    const currentUser = props.user;

    console.log('admin user',showAdminBoard);

    return (
        <>
            <div className="wrapper">
                <header className="main-header">
                    <nav className="navbar navbar-static-top">
                        <div className="container">
                            <div className="navbar-header">
                                <a href="#" className="navbar-brand"><b>School Fees Management System</b></a>
                                
                            </div>
                            <div className="collapse navbar-collapse pull-left" id="navbar-collapse">
                                <ul className="nav navbar-nav">


                                <li className="nav-item">
                                    <Link to={"/home"} className="nav-link">
                                    Home
                                    </Link>
                                </li>

                                {showModeratorBoard && (
                                    <li className="nav-item">
                                    <Link to={"/mod"} className="nav-link">
                                        Moderator Board
                                    </Link>
                                    </li>
                                )}

                                {showAdminBoard && (
                                    <li className="nav-item">
                                    <Link to={"/admin"} className="nav-link">
                                        Admin Board
                                    </Link>
                                    </li>
                                )}

                                {currentUser && (
                                    <li className="nav-item">
                                    <Link to={"/user"} className="nav-link">
                                        User
                                    </Link>
                                    </li>
                                )}



                                    {showAdminBoard && (
                                    <li className="nav-item">
                                        <Link to="/students"><i className="fa fa-address-book"></i> Student List</Link>
                                    </li>
                                    )}
                                    
                                    <li>
                                        <Link to="/payments"><i className="fa fa-inr"></i> Payment History</Link>
                                    </li>
                                    <li>
                                        <Link to="/makePayment"><i className="fa fa-address-book"></i> Make Student Payment</Link>
                                    </li>
                                    <li>
                                        <Link to="/reports"><i className="fa fa-file"></i> Payment Reports</Link>
                                    </li>

                                    <li className="dropdown">
                                        <a href="#" className="dropdown-toggle" data-toggle="dropdown"><i className="fa fa-wrench"></i>&nbsp;&nbsp; Setting <span className="caret"></span></a>
                                        <ul className="dropdown-menu" role="menu">
                                            <li className="divider"></li>
                                            <li>
                                                <Link to="/customers"><i className="fa fa-address-book"></i> Customer List</Link>
                                            </li>
                                            
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="">
                                            <i className="fa fa-power-off"></i> <span></span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>
            </div>
        </>
    );
}

export default Topmenu;