import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import "./Login.css";

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            loggedIn: false
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    renderRedirect() {
        if (this.state.loggedIn) {
            return <Redirect to='/' />
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/login_check',
                data: {
                    username: this.state.email,
                    password: this.state.password
                },
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            });
            localStorage.setItem('accessToken', response.data.token);
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;

            this.setState({
                loggedIn: true
            })
        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        return (
            <div className="Login">
                {this.renderRedirect()}
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="email" bsSize="large">
                        <label>Email</label>
                        <FormControl
                            autoFocus
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bsSize="large">
                        <label>Password</label>
                        <FormControl
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}