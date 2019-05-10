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

    render() {
        return (
            <TableRow>
                <TableCell>{ this.state.paymentMethod.id }</TableCell>
                <TableCell>{ this.state.paymentMethod.payment_method_name }</TableCell>
            </TableRow>
        );
    }

}