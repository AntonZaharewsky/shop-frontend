import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import axios from "axios";

export default class PlaceEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            smallDescription: "",
            description: "",
            placeTypeId: "",
            addressId: ""
        };
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.smallDescription.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/admin/place',
                data: {
                    name: this.state.name,
                    smallDescription: this.state.smallDescription,
                    description: this.state.description,
                    placeTypeId: this.state.placeTypeId,
                    addressId: this.state.addressId
                }
            });
            console.log(response);
        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        return (
            <div className="place-edit">
                <form onSubmit={this.handleSubmit}>
                    <FormGroup controlId="name" bsSize="large">
                        <label>Name</label>
                        <FormControl
                            autoFocus
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="smallDescription" bsSize="large">
                        <label>Small description</label>
                        <FormControl
                            value={this.state.smallDescription}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="description" bsSize="large">
                        <label>Description</label>
                        <FormControl
                            value={this.state.description}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="placeTypeId" bsSize="large">
                        <label>Place Type ID</label>
                        <FormControl
                            value={this.state.placeTypeId}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </FormGroup>
                    <FormGroup controlId="addressId" bsSize="large">
                        <label>Address ID</label>
                        <FormControl
                            value={this.state.addressId}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </FormGroup>
                    <Button
                        block
                        bsSize="large"
                        disabled={!this.validateForm()}
                        type="submit"
                    >
                        Login
                    </Button>
                </form>
            </div>
        );
    }
}