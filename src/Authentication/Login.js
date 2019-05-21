import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import axios from "axios";
import "./Login.css";
import { Paper, withStyles, Grid, TextField, Button, FormControlLabel, Checkbox } from '@material-ui/core';

const styles = theme => ({
    margin: {
        width: '50%',
        margin: '0 auto'
    },
    padding: {
        padding: theme.spacing.unit
    }
});

class Login extends Component {
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

            const user = await axios({
                method: 'GET',
                url: 'http://localhost:8000/api'
            });

            localStorage.setItem('user', JSON.stringify(user.data));

            this.setState({
                loggedIn: true
            });

            this.props.setUser(user.data);
        } catch (e) {
            alert('Login failed.');
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.margin}>
                {this.renderRedirect()}
                <div className={classes.padding}>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="email" label="email" value={this.state.email} onChange={this.handleChange} type="email" fullWidth autoFocus required />
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} alignItems="flex-end">
                        <Grid item md={true} sm={true} xs={true}>
                            <TextField id="password" value={this.state.password} onChange={this.handleChange} label="Password" type="password" fullWidth required />
                        </Grid>
                    </Grid>
                    <Grid container alignItems="center" justify="space-between">
                        <Grid item>
                            <FormControlLabel control={
                                <Checkbox
                                    color="primary"
                                />
                            } label="Remember me" />
                        </Grid>
                        <Grid item>
                            <Button disableFocusRipple disableRipple style={{ textTransform: "none" }} variant="text" color="primary">Forgot password ?</Button>
                        </Grid>
                    </Grid>
                    <Grid container justify="center" style={{ marginTop: '10px' }}>
                        <Button variant="outlined" disabled={!this.validateForm()} onClick={this.handleSubmit} color="primary" style={{ textTransform: "none" }}>Login</Button>
                    </Grid>
                </div>
            </Paper>
        );
    }

}
export default withStyles(styles)(Login);