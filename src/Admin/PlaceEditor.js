import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import {MenuItem, Paper, Select, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@material-ui/core";
import AdminPlace from "./AdminPlace";

export default class PlaceEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            smallDescription: "",
            description: "",
            placeType: "",
            addressId: "",
            image: "",
            placeTypes: [],
            places: []
        };
    }

    getPlaceTypes() {
        return axios({
            method: 'GET',
            url: 'http://localhost:8000/placetype'
        })
    }

    handleSelectChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    getPlaces() {
        return axios({
            method: 'GET',
            url: 'http://localhost:8000/place'
        })
    }

    async componentDidMount() {
        let [placeTypes, places] = await Promise.all([
            this.getPlaceTypes(),
            this.getPlaces()
        ]);

        placeTypes = JSON.parse(placeTypes.data);
        places = JSON.parse(places.data);
        console.log(places);

        const newPlaces = places.map(p => {
            return {
                id: p.id,
                name: p.placeName,
                description: p.description,
                adressId: p.adressId,
                placeType: p.placeTypes,
                smallDescription: p.smallDescription,
                image: p.image
            };
        });

        const newPlaceTypeState = placeTypes.map(p => {
            return {
                id: p.id,
                name: p.placeTypeName,
            };
        });

        this.setState({
            placeTypes: newPlaceTypeState,
            places: newPlaces
        })
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
                    placeTypeId: this.state.placeType,
                    image: this.state.image,
                    addressId: this.state.addressId
                }
            });

            if (response.status === 200) {
                alert("Place added");
            }
        } catch (e) {
            alert("Error: Try later");
            console.log(e.message);
        }
    }

    render() {
        return (
            <Paper className="place-edit">
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Small Description</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Place Type</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <TextField
                                    id="name"
                                    autoFocus
                                    type="text"
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="smallDescription"
                                    value={this.state.smallDescription}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="description"
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="image"
                                    value={this.state.image}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </TableCell>
                            <TableCell>
                                <Select id="placeType" onChange={this.handleSelectChange}
                                        value={this.state.placeType}
                                        inputProps={{
                                            name: 'placeType',
                                            id: 'placeType',
                                        }}>
                                    {this.state.placeTypes.map((placeType, i) => {
                                        return (<MenuItem key={i}
                                                          value={placeType.id}>{placeType.name}</MenuItem>)
                                    })}
                                </Select>
                            </TableCell>
                            <TableCell>
                                <Button
                                    onClick={this.handleSubmit}
                                    block
                                    bsSize="large"
                                    disabled={!this.validateForm()}
                                    type="submit"
                                >
                                    Add
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.places.map((place, i) => {
                            return (<AdminPlace key={i} place={place} placeTypes={this.state.placeTypes}/>)
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}