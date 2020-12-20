import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Post } from "./pages/Post";
import PostManage from "./pages/PostManage";
import Profile from "./pages/Profile";
import RoomDetail from "./pages/RoomDetail";
import NavbarLogin from "./components/Navbar/NavbarLogin";
import UserManage from "./pages/UserManage";
import Statistic from "./pages/Statistic";
import Chat from "./pages/Chat";

function App() {
  return (
    <>
      <Router>
        {sessionStorage.getItem("tokenAdmin") ? (
          <Navbar></Navbar>
        ) : (
          <NavbarLogin></NavbarLogin>
        )}

        <div className="main">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/post/:id?" component={Post} />
            <Route path="/room-detail/:id" component={RoomDetail} />
            <Route path="/post-manage" component={PostManage} />
            <Route path="/user-manage" component={UserManage} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/statistic" component={Statistic} />
            <Route path="/chat" component={Chat} />
          </Switch>
        </div>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
