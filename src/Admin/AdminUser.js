import React, { Component } from 'react';
import {
    TableRow,
    TableCell,
    Button,
    Table,
    TextField,
    FormControl,
    Select,
    MenuItem,
    Modal,
    TableHead, TableBody
} from '@material-ui/core';
import axios from 'axios';

export default class AdminUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this.props.user,
            openModal: false
        }
    }

    async delivery() {
        const response = await axios({
            method: 'PATCH',
            url: 'http://localhost:8000/admin/user/' + this.state.user.id + '/makeuser'
        });

        if (response.status === 200) {
            const user = {...this.state.user};
            user.role = 'USER';
            this.setState({user});

            alert('This user is default user now.');
        }
    }

    async makeAdmin() {
        const response = await axios({
            method: 'PATCH',
            url: 'http://localhost:8000/admin/user/' + this.state.user.id + '/makeadmin'
        });

        if (response.status === 200) {
            const user = {...this.state.user};
            user.role = 'ADMIN';
            this.setState({user});

            alert('This user is admin now.');
        }
    }

    render() {
        return (
            <TableRow hover={true}>
                <TableCell>{ this.state.user.id }</TableCell>
                <TableCell>{ this.state.user.email }</TableCell>
                <TableCell>{ this.state.user.role }</TableCell>
                <TableCell>{ this.state.user.role === "USER" ?
                    <Button onClick={() => this.makeAdmin()}>Make admin</Button>:
                    <Button onClick={() => this.delivery()}>Make user</Button>}
                </TableCell>
            </TableRow>
        );
    }

}