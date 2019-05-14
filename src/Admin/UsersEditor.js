import React, { Component } from 'react';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
    TextField,
    Select, MenuItem
} from '@material-ui/core';

import AdminUser from "./AdminUser";

export default class UsersEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:8000/admin/user'
        });

        this.setState({
            users: response.data
        })
    }

    render() {
        return (
            <div>
                <h1>Users</h1>
                <Paper className="ussers-edit">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.users.map((user, i) => {
                                return (<AdminUser key={i} user={user} />)
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}