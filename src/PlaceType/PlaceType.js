import React, { Component } from 'react';

class PlaceType extends Component {
    render() {
        return (
            <div className="place-type">
                <button onClick={() => this.props.filterByPlaceType(this.props.placeType.id)} className="place-type__title">{ this.props.placeType.name }</button>
            </div>
        );
    }
}

export default PlaceType;
