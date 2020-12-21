import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import NavbarOwner from "./components/NavbarOwner";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Post } from "./pages/Post";
import PostManage from "./pages/PostManage";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import RoomDetail from "./pages/RoomDetail";
import Chat from "./pages/Chat";
import { loadUser } from "./actions/user";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <>
      <Router>
        {currentUser.owner_full_name !== undefined ? (
          <NavbarOwner currentUser={currentUser}></NavbarOwner>
        ) : (
          <Navbar currentUser={currentUser}></Navbar>
        )}

        <div className="main">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/post/:id?" component={Post} />
            <Route path="/room-detail/:id" component={RoomDetail} />
            {currentUser.owner_full_name !== undefined ? (
              <Route
                path="/post-manage"
                component={() => (
                  <PostManage currentUser={currentUser}></PostManage>
                )}
              />
            ) : (
              <p></p>
            )}

            <Route path="/profile/:id" component={Profile} />
            <Route path="/chat" component={Chat} />
          </Switch>
        </div>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
