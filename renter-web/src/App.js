import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Footer from "./components/Layouts/Footer/Footer";
import Navbar from "./components/Layouts/Navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import RoomDetail from "./pages/RoomDetail";
import Favorite from "./pages/Favorite";
import { loadUser } from "./actions/user";
import Profile from "./pages/Profile";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  console.log(currentUser);
  return (
    <>
      <Router>
        <Navbar currentUser={currentUser}></Navbar>

        <div className="main">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/room-detail/:id" component={RoomDetail} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/favorite" component={Favorite} />
          </Switch>
        </div>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
