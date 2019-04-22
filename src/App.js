import React, { Component } from 'react';
import './App.css';
import Places from './Place/Places.js';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import About from "./General/About";
import DetailPlace from "./Place/DetailPlace";
import Login from "./Authentication/Login";
import axios from "axios";
import Basket from "./Basket/Basket";
import AdminPanel from "./Admin/AdminPanel";

class App extends Component {
  checkLogin() {
    if (localStorage.getItem("accessToken") !== null) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("accessToken");
    }
  }

  logout() {
    localStorage.removeItem("accessToken");
    axios.defaults.headers.common['Authorization'] = '';
  }

  render() {
    this.checkLogin();

    return (
      <div className="App">
        <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/basket">Basket</Link>
              </li>
              <li>
                <button onClick={() => this.logout()}>Logout</button>
              </li>
              <li>
                <Link to="/admin">Admin panel</Link>
              </li>
            </ul>

            <hr />

            <Route exact path="/" component={Places} />
            <Route path="/about" component={About} />
            <Route path="/login" exact component={Login} />
            <Route path={`/place/:placeId`} component={DetailPlace} />
            <Route path="/basket" component={Basket} />
            <Route path="/admin" component={AdminPanel} />
            <Route path={`/admin/places`} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
