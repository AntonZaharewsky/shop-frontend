import React, { Component } from 'react';
import axios from "axios";
import PlaceType from "./PlaceType";

class PlaceTypeList extends Component {
    state = {
        placeTypes: []
    };

    componentDidMount() {
        axios
            .get("http://localhost:8000/placetype")
            .then(response => {
                let placeTypes = JSON.parse(response.data);

                const newPlaceTypes = placeTypes.map(p => {
                    return {
                        id: p.id,
                        name: p.placeTypeName
                    };
                });

                const newState = Object.assign({}, this.state, {
                    placeTypes: newPlaceTypes
                });

                this.setState(newState);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                {this.state.placeTypes.map((place, i) => {
                    return (<PlaceType filterByPlaceType={ this.props.filterByPlaceType } key={place.id}  placeType={place} />)
                })}
            </div>
        );
    }
}

export default PlaceTypeList;
