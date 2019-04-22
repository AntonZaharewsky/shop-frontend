import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Place extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="place">
                <Link to={`/place/${this.props.place.id}`}>{ this.props.place.name }</Link>
                <p className="place__description">{ this.props.place.description }</p>
            </div>
        );
    }
}

export default Place;
