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

class AdminPlace extends Component {
    constructor(props) {
        super(props);
console.log(props.placeTypes)
console.log(props.place.placeType)
        this.state = {
            id: props.place.id,
            name: props.place.name,
            smallDescription: props.place.smallDescription,
            description: props.place.description,
            image: props.place.image,
            placeTypes: props.placeTypes,
            placeType: props.place.placeType,
            openModal: false
        };
    }

    validateForm() {
        return this.state.name.length > 0 && this.state.description.length > 0;
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
                url: 'http://localhost:8000/admin/place/' + this.state.id,
                data: {
                    name: this.state.name,
                    description: this.state.description,
                    image: this.state.image,
                    smallDescription: this.state.smallDescription,
                    placeTypeId: this.state.placeType
                }
            });

            if (response.status === 200) {
                alert("Place with id: " + this.state.id + " is updated")
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    async removePlace() {
        try {
            const response = await axios({
                method: 'DELETE',
                url: 'http://localhost:8000/admin/place/' + this.state.id
            });

            if (response.status === 200) {
                alert("Place with id: " + this.state.id + " is deleted")
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    render() {
        const classes = this.props;

        return (
            <TableRow hover={true} onClick={this.handleOpen.bind(this)}>
                <TableCell>{this.state.name}</TableCell>
                <TableCell>{this.state.smallDescription}</TableCell>
                <TableCell>{this.state.description}</TableCell>
                <TableCell>{this.state.image}</TableCell>
                <TableCell>{this.state.placeTypes.find(obj => +obj.id === +this.state.placeType).name}</TableCell>
                <TableCell><Button onClick={() => this.removePlace()}>Remove</Button></TableCell>
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
                            id="smallDescription"
                            value={this.state.smallDescription}
                            onChange={this.handleChange}
                            type="text"
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
                        <FormControl>
                            <Select id="placeType" onChange={this.handleSelectChange}
                                    value={this.state.placeType}
                                    inputProps={{
                                        name: 'placeType',
                                        id: 'placeType',
                                    }}>
                                {this.state.placeTypes.map((placeType, i) => {
                                    return (<MenuItem key={i} selected={this.state.placeType === placeType.id}
                                                      value={placeType.id}>{placeType.name}</MenuItem>)
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

const AdminPlaces = withStyles(styles)(AdminPlace);

export default AdminPlaces;