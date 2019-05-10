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

import AdminOrder from "./AdminOrder";

export default class OrdersEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders: []
        }
    }

    async componentDidMount() {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:8000/order'
        });

        this.setState({
            orders: response.data
        })
    }

    render() {
        return (
          <div>
              <h1>Orders</h1>
              <Paper className="orders-edit">
                  <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell>Order number</TableCell>
                              <TableCell>Email</TableCell>
                              <TableCell>Address</TableCell>
                              <TableCell>Is delivered</TableCell>
                              <TableCell>Action</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {this.state.orders.map((order, i) => {
                              return (<AdminOrder key={i} orderInfo={order} />)
                          })}
                      </TableBody>
                  </Table>
              </Paper>
          </div>
        );
    }
}