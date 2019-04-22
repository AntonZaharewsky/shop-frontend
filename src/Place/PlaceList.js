import React, { Component } from 'react';
import Place from './Place.js';

class PlaceList extends Component {
    render() {
        return (
            <div>
                <h2>Places</h2>
            {this.props.places.map((place, i) => {
                return (<Place key={i} place={place} />)
            })}
            </div>
        );
    }
}

export default PlaceList;
