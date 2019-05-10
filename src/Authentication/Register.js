import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import "./Login.css";

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
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

    handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/register',
                data: {
                    email: this.state.email,
                    password: this.state.password
                },
                // config: { headers: {'Content-Type': 'multipart/form-data' }}
            });

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