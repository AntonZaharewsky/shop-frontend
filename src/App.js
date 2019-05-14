import React, {Component} from 'react';
import './App.css';
import Places from './Place/Places.js';
import {BrowserRouter as Router, Link, Route, Redirect} from "react-router-dom";
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
import UsersEditor from "./Admin/UsersEditor";
import UserProfile from "./Profile/UserProfile";

const AdminRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('user') !== null && JSON.parse(localStorage.getItem('user')).role[0] === 'ROLE_ADMIN'
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
);

const UserRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        localStorage.getItem('user') !== null
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
);

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: localStorage.getItem('user') === null ? {} : JSON.parse(localStorage.getItem('user')),
            logoutRedirect: false
        }
    }

    setUser(user) {
        this.setState({user: user});
    }

    async checkLogin() {
        if (localStorage.getItem("accessToken") !== null) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem("accessToken");
        }
    }

    logout() {
        localStorage.removeItem("accessToken");
        axios.defaults.headers.common['Authorization'] = '';
        localStorage.removeItem('user');
        this.setState({user: {}});

        window.location = '/login';
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
                            {Object.keys(this.state.user).length > 0 ?
                                <Tab label="Profile" component={Link} to="/profile" /> :
                                <div><Tab label="Login" component={Link} to="/login"/>
                                    <Tab label="Sign Up" component={Link} to="/register"/></div>}
                            <Tab label="Basket" component={Link} to="/basket"/>
                            {Object.keys(this.state.user).length > 0 ?
                                <Tab label="Logout" onClick={() => this.logout()}/> :
                                ''}
                            {Object.keys(this.state.user).length > 0 && this.state.user.role[0] === "ROLE_ADMIN" ?
                                <Tab label="Admin panel" component={Link} to="/admin"/> :
                                ''
                            }
                        </Tabs>
                    </AppBar>

                    <hr/>
                    <hr/>
                    <hr/>
                    <hr/>

                    <Route exact path="/" component={Places}/>
                    <Route path="/about" component={About}/>
                    <Route
                        path='/login'
                        render={(props) => <Login {...props} setUser={this.setUser.bind(this)}/>}
                    />
                    <Route path="/register" component={Register}/>
                    <Route path={`/place/:placeId`} component={DetailPlace}/>
                    <Route path="/basket" component={Basket}/>
                    <Route path="/checkout" component={Checkout}/>
                    <UserRoute path="/profile" component={UserProfile} />
                    <AdminRoute path="/admin" component={AdminPanel}/>
                    <AdminRoute path="/admin/place" component={PlaceEditor}/>
                    <AdminRoute path="/admin/product" component={ProductEditor}/>
                    <AdminRoute path="/admin/sql" component={Sql}/>
                    <AdminRoute path="/admin/orders" component={OrdersEditor}/>
                    <AdminRoute path="/admin/users" component={UsersEditor}/>
                    <AdminRoute path="/admin/images" component={ImageUploader}/>
                    <AdminRoute path="/admin/payment-methods" component={PaymentMethodEditor}/>
                    <AdminRoute path={`/admin/places`}/>
                </Router>
            </div>
        );
    }
}

export default App;
