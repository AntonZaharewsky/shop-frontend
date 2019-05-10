import React, { Component } from 'react';
import axios from 'axios';
import PlaceList from './PlaceList.js';
import PlaceTypeList from '../PlaceType/PlaceTypeList.js';

class Places extends Component {
    state = {
        places: []
    };

    filterByPlaceType(placeTypeId) {
        axios
            .get("http://localhost:8000/place/placetype/" + placeTypeId)
            .then(response => {
                let products = JSON.parse(response.data);
                const newPlaces = products.map(p => {
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

                const newState = Object.assign({}, this.state, {
                    places: newPlaces
                });

                this.setState(newState);
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        axios
            .get("http://localhost:8000/api/place")
            .then(response => {
                let products = JSON.parse(response.data);
                const newPlaces = products.map(p => {
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

                const newState = Object.assign({}, this.state, {
                    places: newPlaces
                });

                this.setState(newState);
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div>
                <PlaceTypeList filterByPlaceType={ this.filterByPlaceType.bind(this) }/>
                <PlaceList places={this.state.places}/>
            </div>
        );
    }
}

export default Places;
