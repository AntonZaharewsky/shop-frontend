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

import AdminPaymentMethod from "./AdminPaymentMethod";

export default class PaymentMethodEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paymentMethods: []
        }
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
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