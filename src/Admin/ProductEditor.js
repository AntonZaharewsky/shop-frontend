import React, {Component} from "react";
import {Button, FormGroup, FormControl} from "react-bootstrap";
import axios from "axios";
import AdminProduct from "./AdminProduct";
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

export default class ProductEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            name: "",
            description: "",
            image: "",
            cost: "",
            menu_name: "",
            products: [],
            menus: [],
            places: [],
            menuAndPlace: [],
            place: ""
        };
    }

    getProducts() {
        return axios({
            method: 'GET',
            url: 'http://localhost:8000/product'
        });
    }

    getMenus() {
        return axios({
            method: 'GET',
            url: 'http://localhost:8000/menu'
        });
    }

    getPlaces() {
        return axios({
            method: 'GET',
            url: 'http://localhost:8000/api/place'
        });
    }

    getMenuAndPlace() {
        return axios({
            method: 'GET',
            url: 'http://localhost:8000/menuandplace'
        })
    }

    async componentDidMount() {
        let [products, menus, places, menuAndPlace] = await Promise.all([
            this.getProducts(),
            this.getMenus(),
            this.getPlaces(),
            this.getMenuAndPlace()
        ]);
        products = JSON.parse(products.data);
        menus = JSON.parse(menus.data);
        places = JSON.parse(places.data);

        const newProductsState = products.map(p => {
            return {
                id: p.id,
                name: p.productName,
                description: p.description,
                image: p.image,
                cost: p.cost,
                menu_name: p.menuId
            };
        });

        const newMenusState = menus.map(m => {
            return {
                id: m.id,
                name: m.menuName,
            };
        });

        const newPlacesState = places.map(p => {
            return {
                id: p.id,
                name: p.placeName
            };
        });

        const newMenuAndPlaceState = menuAndPlace.data.map(m => {
            return {
                id: m.id,
                Places_id: m.Places_id,
                menus_id: m.menus_id
            }
        });

        this.setState({menus: newMenusState, products: newProductsState, places: newPlacesState, menuAndPlace: newMenuAndPlaceState})
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.cost.length > 0;
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSelectChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            const product = {
                name: this.state.name,
                description: this.state.description,
                image: this.state.image,
                cost: this.state.cost,
                menu_name: this.state.menu_name,
                placeId: this.state.place
            };

            const response = await axios({
                method: 'POST',
                url: 'http://localhost:8000/admin/product',
                data: product
            });

            if (response.status === 200) {
                const responseInfo = response.data;
                product.id = responseInfo.productId;
                product.menu_name = responseInfo.menuAndPlaceId;
                const joinedProduct = this.state.products.concat(product);

                const joinedMenuAndPlace = this.state.menuAndPlace.concat({
                    id: responseInfo.menuAndPlaceId,
                    Places_id: responseInfo.placeId,
                    menus_id: responseInfo.menuId
                });

                const joinedMenu = this.state.menus.concat({
                    id: responseInfo.menuId,
                    name: product.menu_name
                });


                this.setState({
                    products: joinedProduct,
                    menus: joinedMenu,
                    menuAndPlace: joinedMenuAndPlace
                })
            }
        } catch (e) {
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
                            <TableCell>Description</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Cost</TableCell>
                            <TableCell>Menu Name</TableCell>
                            <TableCell>Place</TableCell>
                            <TableCell>Action</TableCell>
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
                                <TextField
                                    id="cost"
                                    value={this.state.cost}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </TableCell>
                            <TableCell>
                                <TextField
                                    id="menu_name"
                                    value={this.state.menu_name}
                                    onChange={this.handleChange}
                                    type="text"
                                />
                            </TableCell>
                            <TableCell>
                                <Select id="selectedMenu" onChange={this.handleSelectChange}
                                        value={this.state.place}
                                        inputProps={{
                                            name: 'place',
                                            id: 'place',
                                        }}>
                                    {this.state.places.map((place, i) => {
                                        return (<MenuItem key={i}
                                                          value={place.id}>{place.name}</MenuItem>)
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
                        {this.state.products.map((product, i) => {
                            return (<AdminProduct key={i} product={product} places={this.state.places}
                                                  menus={this.state.menus} menuAndPlace={this.state.menuAndPlace}/>)
                        })}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}