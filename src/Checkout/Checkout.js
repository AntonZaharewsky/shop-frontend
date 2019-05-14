import React, {Component} from 'react';
import axios from "axios";
import {Button, FormControl, FormGroup} from "react-bootstrap";
import {MenuItem, Select} from "@material-ui/core";

class Checkout extends Component {
    constructor(props) {
        super(props);

        this.state = {
            city: "",
            street: "",
            home_number: "",
            entrance_number: "",
            flat_number: "",
            use_current_address: false,
            paymentMethods: [],
            selectedPaymentMethod: ""
        };
    }

    validateForm() {
        return this.state.city.length > 0 && this.state.street.length > 0;
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

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };

    handleSelectChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    handleAddressChange() {
        this.setState({
            use_current_address: !this.state.use_current_address
        })
    }

    handleSubmit = async event => {
        event.preventDefault();

        const user = localStorage.getItem('user') === null ? {} : JSON.parse(localStorage.getItem('user'));

        if (Object.keys(user).length === 0) {
            alert("Please login");
            return;
        }

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/order',
                data: {
                    email: user.email,
                    basket: localStorage.basket,
                    city: this.state.city,
                    street: this.state.street,
                    home_number: this.state.home_number,
                    entrance_number: this.state.entrance_number,
                    flat_number: this.state.flat_number,
                    use_current_address: this.state.use_current_address,
                    selected_payment_method: this.state.selectedPaymentMethod
                }
            });

            if (response.status === 200) {
                alert("Thank you for your order.");
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    render() {
        const content = !this.state.use_current_address
            ? <div className="my-form">
                <FormGroup className="group" controlId="city" bsSize="large">
                    <label htmlFor="city">City</label>
                    <FormControl
                        autoFocus
                        type="text"
                        value={this.state.city}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup className="group" controlId="street" bsSize="large">
                    <label htmlFor="street">Street</label>
                    <FormControl
                        value={this.state.street}
                        onChange={this.handleChange}
                        type="text"
                    />
                </FormGroup>
                <FormGroup className="group" controlId="home_number" bsSize="large">
                    <label htmlFor="home_number">Home Number</label>
                    <FormControl
                        value={this.state.home_number}
                        onChange={this.handleChange}
                        type="text"
                    />
                </FormGroup>
                <FormGroup className="group" controlId="entrance_number" bsSize="large">
                    <label htmlFor="entrance_number">Entrance Number</label>
                    <FormControl
                        value={this.state.entrance_number}
                        onChange={this.handleChange}
                        type="text"
                    />
                </FormGroup>
                <FormGroup className="group" controlId="flat_number" bsSize="large">
                    <label htmlFor="flat_number">Flat Number</label>
                    <FormControl
                        value={this.state.flat_number}
                        onChange={this.handleChange}
                        type="text"
                    />
                </FormGroup>
                <FormGroup className="group">
                    <label htmlFor="selectedPaymentMethod">Payment method</label>
                    <Select id="selectedPaymentMethod" onChange={this.handleSelectChange}
                            value={this.state.selectedPaymentMethod}
                            inputProps={{
                                name: 'selectedPaymentMethod',
                                id: 'selectedPaymentMethod',
                            }}>
                        {this.state.paymentMethods.map((paymentMethod, i) => {
                            return (<MenuItem key={i}
                                              value={paymentMethod.id}>{paymentMethod.payment_method_name}</MenuItem>)
                        })}
                    </Select>
                </FormGroup>
            </div>
            : null;

        return (
            <div className="checkout">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <label>Use previous address</label>
                        <FormControl
                            type="checkbox"
                            checked={this.state.use_current_address}
                            onChange={this.handleAddressChange.bind(this)}
                        />
                    </FormGroup>
                    { content }
                    <div className="btn-group-wrap">
                        <div className="btn-group">
                            <Button type="submit" className="btn-large">Order</Button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Checkout;
