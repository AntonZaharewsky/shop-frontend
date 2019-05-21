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

import AdminPaymentMethod from "./AdminPaymentMethod";

export default class PaymentMethodEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paymentMethods: [],
            paymentMethodName: ''
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    async componentDidMount() {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:8000/paymentmethod'
        });

        this.setState({
            paymentMethods: response.data
        })
    }

    async createPaymentMethod() {
        const response  = await axios({
            method: "POST",
            url: 'http://localhost:8000/paymentmethod',
            data: {
                paymentMethodName: this.state.paymentMethodName
            }
        })


        if (response.status === 200) {
            alert('added');
        }
    }

    render() {
        return (
            <div>
                <h1>Payment methods</h1>
                <Paper className="payment-method-edit">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Payment method number</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>
                                    <TextField
                                        id="paymentMethodName"
                                        autoFocus
                                        type="text"
                                        value={this.state.paymentMethodName}
                                        onChange={this.handleChange}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Button onClick={() => this.createPaymentMethod()}>Add</Button>
                                </TableCell>
                            </TableRow>
                            {this.state.paymentMethods.map((paymentMethod, i) => {
                                return (<AdminPaymentMethod key={i} paymentMethod={paymentMethod} />)
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
        );
    }
}