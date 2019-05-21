import React, { Component } from 'react';
import { TableRow, TableCell, Button } from '@material-ui/core';
import axios from 'axios';

export default class AdminPaymentMethod extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paymentMethod: this.props.paymentMethod
        }
    }

    async remove() {
        const response = axios({
            method: 'DELETE',
            url: 'http://localhost:8000/paymentmethod/' + this.state.paymentMethod.id
        });

        if (response.status === 200) {
            alert('removed');
        }
    }

    render() {
        return (
            <TableRow>
                <TableCell>{ this.state.paymentMethod.id }</TableCell>
                <TableCell>{ this.state.paymentMethod.payment_method_name }</TableCell>
                <TableCell><Button onClick={() => this.remove()}>Remove</Button></TableCell>
            </TableRow>
        );
    }

}