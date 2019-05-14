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
    Select, MenuItem, Button
} from '@material-ui/core';
import ProfileOrder from "./ProfileOrder";

export default class OrdersEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: [],
            returnReasons: []
        }
    }

    async componentDidMount() {
        const [orders, returnReasons] = await Promise.all([
            axios({
                method: 'GET',
                url: 'http://localhost:8000/profile/order/' + JSON.parse(localStorage.getItem('user')).id
            }),
            axios({
                method: 'GET',
                url: 'http://localhost:8000/returnreasons'
            })
        ]);

        this.setState({
            orders: orders.data,
            returnReasons: returnReasons.data
        })
    }

    render() {
        return (
            <div>
                <h1>My Orders</h1>
                <Paper className="orders-edit">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Order number</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Is delivered</TableCell>
                                <TableCell>Return status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.orders.map((order, i) => {
                                return (<ProfileOrder key={i} orderInfo={order} returnReasons={this.state.returnReasons} />)
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}