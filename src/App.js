import React, {Component} from 'react';
import './App.css';
import Places from './Place/Places.js';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import About from "./General/About";
import DetailPlace from "./Place/DetailPlace";
import Login from "./Authentication/Login";
import axios from "axios";
import Basket from "./Basket/Basket";
import AdminPanel from "./Admin/AdminPanel";
import Register from "./Authentication/Register";
import PlaceEditor from "./Admin/PlaceEditor";
import ProductEditor from "./Admin/ProductEditor";
import Checkout from "./Checkout/Checkout";
import Sql from "./Admin/Sql";
import {AppBar, Tabs, Tab} from '@material-ui/core';
import OrdersEditor from "./Admin/OrdersEditor";
import ImageUploader from "./Admin/ImageUploader";
import PaymentMethodEditor from "./Admin/PaymentMethodEditor";

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
                    <AppBar>
                        <Tabs>
                            <Tab label="Home" component={Link} to="/"/>
                            <Tab label="About" component={Link} to="/about"/>
                            <Tab label="Topics" component={Link} to="/topics"/>
                            <Tab label="Login" component={Link} to="/login"/>
                            <Tab label="Sign Up" component={Link} to="/register"/>
                            <Tab label="Basket" component={Link} to="/basket"/>
                            <Tab label="Logout">
                                <a onClick={() => this.logout()}>Logout</a>
                            </Tab>
                            <Tab label="Admin panel" component={Link} to="/admin"/>
                        </Tabs>
                    </AppBar>

                    <hr/>
                    <hr/>
                    <hr/>
                    <hr/>

                    <Route exact path="/" component={Places}/>
                    <Route path="/about" component={About}/>
                    <Route path="/login" exact component={Login}/>
                    <Route path="/register" component={Register}/>
                    <Route path={`/place/:placeId`} component={DetailPlace}/>
                    <Route path="/basket" component={Basket}/>
                    <Route path="/checkout" component={Checkout}/>
                    <Route path="/admin" component={AdminPanel}/>
                    <Route path="/admin/place" component={PlaceEditor}/>
                    <Route path="/admin/product" component={ProductEditor}/>
                    <Route path="/admin/sql" component={Sql}/>
                    <Route path="/admin/orders" component={OrdersEditor}/>
                    <Route path="/admin/images" component={ImageUploader}/>
                    <Route path="/admin/payment-methods" component={PaymentMethodEditor}/>
                    <Route path={`/admin/places`}/>
                </Router>
            </div>
        );
    }
}

export default App;
