import React, { Component } from "react";
import { BrowserRouter as Router,  Route, Routes, Link} from 'react-router-dom';

import AuthService from "./services/auth.service";

import Login from "./component/login.component";
import Register from "./component/register.component";
import Home from "./component/home.component";
import Profile from "./component/profile.component";
import BoardUser from "./component/board-user.component";
import BoardModerator from "./component/board-moderator.component";
import BoardAdmin from "./component/board-admin.component";
import EventBus from "./common/EventBus";
import Topmenu from "./component/Topmenu";
import StudentList from "./component/student/StudentList";

// import AuthVerify from "./common/auth-verify";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showModeratorBoard: user.roles.includes("ROLE_MODERATOR"),
        showAdminBoard: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showModeratorBoard: false,
      showAdminBoard: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showModeratorBoard, showAdminBoard } = this.state;

    return (
      <div>
        
        <div className="container mt-3">
        <Router>
        <Topmenu admin={showAdminBoard} moderator={showModeratorBoard} user={currentUser} ></Topmenu>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/students" element={<StudentList />} />
          </Routes>
          </Router>
        </div>
       
        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
