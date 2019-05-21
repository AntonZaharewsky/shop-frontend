import React, {Component} from 'react';
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

export default class ProfileOrder extends Component {
    constructor(props) {
        super(props);



        this.state = {
            orderInfo: this.props.orderInfo,
            returnReasons: this.props.returnReasons,
            openModal: false,
            orderLines: [],
            orderHistory: [],
            selectedReason: 0,
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

    handleSelectChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    async returnOrder() {
        const response = await axios({
            method: 'POST',
            url: 'http://localhost:8000/return',
            data: {
                orderId: this.state.orderInfo.order_id,
                returnReasonId: this.state.selectedReason
            }
        });

        if (response.status === 200) {
            alert('Order returned.');

            this.setState({
                isReturned: true
            })
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
                <TableCell>{this.state.orderInfo.order_id}</TableCell>
                <TableCell>{this.state.orderInfo.city}</TableCell>
                <TableCell>{Boolean(Number(this.state.orderInfo.delivered)) === true ? 'Delivered' : 'Not delivered'}</TableCell>
                <TableCell>
                    <Select id="selectedReason" onChange={this.handleSelectChange}
                            value={this.state.selectedReason}
                            inputProps={{
                                name: 'selectedReason',
                                id: 'selectedReason',
                            }}
                            disabled={Boolean(Number(this.state.orderInfo.delivered)) === false || this.state.isReturned === true}
                    >
                        {this.state.returnReasons.map((returnReason, i) => {
                            return (<MenuItem key={i}
                                              value={returnReason.idreturn_reasons}>{returnReason.return_reason_name}</MenuItem>)
                        })}
                    </Select>
                </TableCell>
                <TableCell>
                    {Boolean(Number(this.state.orderInfo.delivered)) === true ?
                        this.state.isReturned === false ? <Button onClick={() => this.returnOrder()}>Return order</Button>
                            : <p>Order is already returned</p>
                            : <p>You can't return undelivered order.</p>
                    }
                    <Button onClick={() => this.handleOpen()}>Show details</Button>
                </TableCell>
                {this.state.orderLines.length > 0 &&
                <Modal open={this.state.openModal} onClose={this.handleClose.bind(this)}>
                    <div style={{width: '50%', height: 'auto', backgroundColor: 'white', margin: '0 auto'}}>
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
                                        <TableRow key={i}>
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