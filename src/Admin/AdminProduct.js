import React, {Component} from 'react';
import axios from "axios";
import {
    FormControl,
    Select,
    Button,
    MenuItem,
    TableCell,
    TableRow,
    Modal,
    TextField,
    withStyles
} from '@material-ui/core';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        margin: '0 auto',
        width: '50%',
        backgroundColor: 'white'
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});

class AdminProduct extends Component {
    constructor(props) {
        super(props);
        const menuId = props.menuAndPlace.find(obj => +obj.id === +props.product.menu_name).menus_id;
        const placeId = props.menuAndPlace.find(obj => +obj.id === +props.product.menu_name).Places_id;

        this.state = {
            id: props.product.id,
            name: props.product.name,
            description: props.product.description,
            image: props.product.image,
            cost: props.product.cost,
            selectedMenu: props.menus.find(obj => +obj.id === +menuId).name,
            menus: props.menus,
            places: props.places,
            selectedPlace: props.places.find(obj => +obj.id === + placeId).name,
            openModal: false
        };
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

    handleOpen() {
        this.setState({
            openModal: true
        })
    }

    handleClose() {
        this.setState({
            openModal: false
        })
    }

    handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios({
                method: 'PATCH',
                url: 'http://localhost:8000/admin/product',
                data: {
                    id: this.state.id,
                    name: this.state.name,
                    description: this.state.description,
                    image: this.state.image,
                    cost: this.state.cost,
                    menu_name: this.state.selectedMenu,
                    place_name: this.state.selectedPlace
                }
            });
            console.log(response);
        } catch (e) {
            console.log(e.message);
        }
    }

    async removeProduct() {
        try {
            const response = await axios({
               method: 'DELETE',
               url: 'http://localhost:8000/admin/product/' + this.state.id
            });

        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        const classes = this.props;

        return (
            <TableRow hover={true} onClick={this.handleOpen.bind(this)}>
                <TableCell>{this.state.name}</TableCell>
                <TableCell>{this.state.description}</TableCell>
                <TableCell>{this.state.image}</TableCell>
                <TableCell>{this.state.cost}</TableCell>
                <TableCell>{this.state.selectedMenu}</TableCell>
                <TableCell>{this.state.selectedPlace}</TableCell>
                <TableCell><Button onClick={() => this.removeProduct(this.state.id)}>Remove</Button></TableCell>
                <Modal open={this.state.openModal} onClose={this.handleClose.bind(this)}>
                    <form onSubmit={this.handleSubmit} style={getModalStyle()} className={classes.paper}>
                        <TextField
                            autoFocus
                            id="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                        <TextField
                            id="description"
                            value={this.state.description}
                            onChange={this.handleChange}
                            type="text"
                        />
                        <TextField
                            id="image"
                            value={this.state.image}
                            onChange={this.handleChange}
                            type="text"
                        />
                        <TextField
                            id="cost"
                            value={this.state.cost}
                            onChange={this.handleChange}
                            type="text"
                        />
                        <FormControl>
                            <Select id="selectedMenu" onChange={this.handleSelectChange}
                                    value={this.state.selectedMenu}
                                    inputProps={{
                                        name: 'selectedMenu',
                                        id: 'selectedMenu',
                                    }}>
                                {this.state.menus.map((menu, i) => {
                                    return (<MenuItem key={i} selected={this.state.selectedMenu === menu.name}
                                                      value={menu.name}>{menu.name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <Select id="selectedPlace" onChange={this.handleSelectChange}
                                    value={this.state.selectedPlace}
                                    inputProps={{
                                        name: 'selectedPlace',
                                        id: 'selectedPlace',
                                    }}>
                                {this.state.places.map((place, i) => {
                                    return (<MenuItem key={i} selected={this.state.selectedPlace === place.name}
                                                      value={place.name}>{place.name}</MenuItem>)
                                })}
                            </Select>
                        </FormControl>
                        <Button
                            block
                            bsSize="large"
                            disabled={!this.validateForm()}
                            type="submit"
                        >
                            Update
                        </Button>
                    </form>
                </Modal>
            </TableRow>
        )
    }
}

const AdminProducts = withStyles(styles)(AdminProduct);

export default AdminProducts;