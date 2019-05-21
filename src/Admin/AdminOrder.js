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

export default class AdminOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orderInfo: this.props.orderInfo,
            openModal: false,
            orderLines: [],
            orderHistory: [],
            isReturned: false
        }
    }

    getLines() {
        return axios({
            method: 'GET',
            url: 'http://localhost:8000/api/order/' + this.state.orderInfo.order_id + '/lines'
        });
    }

    getHistory() {
        return axios({
            method: 'GET',
            url: 'http://localhost:8000/order/' + this.state.orderInfo.order_id + '/history'
        });
    }

    async handleOpen() {
        const [orderLines, orderHistory] = await Promise.all([this.getLines(), this.getHistory()]);

        this.setState({
            openModal: true,
            orderLines: orderLines.data,
            orderHistory: orderHistory.data
        })
    }

    handleClose() {
        this.setState({
            openModal: false,
            orderLines: []
        })
    }

    async delivery() {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:8000/admin/order/delivery/' + this.state.orderInfo.order_id
        });

        if (response.status === 200) {
            const orderInfo = {...this.state.orderInfo}
            orderInfo.delivered = 1;
            this.setState({orderInfo});

            alert('Order delivered');
        }
    }

    async deliveryRollBack() {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:8000/admin/order/delivery/' + this.state.orderInfo.order_id + '/rollback'
        });

        if (response.status === 200) {
            const orderInfo = {...this.state.orderInfo}
            orderInfo.delivered = 0;
            this.setState({orderInfo});

            alert('Order delivery is rolled back');
        }
    }

    async componentDidMount() {
        const response = await axios({
            method: 'GET',
            url: 'http://localhost:8000/isreturned/' + this.state.orderInfo.order_id
        });

        this.setState({
            isReturned: response.data
        })
    }

    render() {
        return (
            <TableRow hover={true}>
                <TableCell>{ this.state.orderInfo.order_id }</TableCell>
                <TableCell>{ this.state.orderInfo.email }</TableCell>
                <TableCell>{ this.state.orderInfo.city }</TableCell>
                <TableCell>{ Boolean(Number(this.state.orderInfo.delivered)) === true ? 'Delivered' : 'Not delivered' }</TableCell>
                <TableCell>{ this.state.isReturned === true ? 'Returned' : 'Not returned' }</TableCell>
                <TableCell>{Boolean(Number(this.state.orderInfo.delivered)) === true ?
                    <Button onClick={() => this.deliveryRollBack()}>Rollback Delivery</Button>:
                    <Button onClick={() => this.delivery()}>Delivery</Button>}
                    <Button onClick={() => this.handleOpen()}>Show Details</Button>
                </TableCell>
                {this.state.orderLines.length > 0 &&
                <Modal open={this.state.openModal} onClose={this.handleClose.bind(this)}>
                    <div style={{width: '50%', height: 'auto', backgroundColor: 'white', margin: '0 auto'}} >
                        <h1>Order Lines</h1>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Cost</TableCell>
                                    <TableCell>Quantity</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {this.state.orderLines.map((orderLine, i) => {
                                        return (
                                            <TableRow>
                                                <TableCell>{orderLine.product_name}</TableCell>
                                                <TableCell>{orderLine.description}</TableCell>
                                                <TableCell>{orderLine.cost}</TableCell>
                                                <TableCell>{orderLine.quantity}</TableCell>
                                            </TableRow>
                                        )
                                    })}
                            </TableBody>
                        </Table>
                        <h1>Order History</h1>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Comment</TableCell>
                                    <TableCell>Date</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.orderHistory.map((historyLine, i) => {
                                    return (
                                        <TableRow>
                                            <TableCell>{historyLine.comment}</TableCell>
                                            <TableCell>{historyLine.created_at}</TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </Modal>}
            </TableRow>
        );
    }

}