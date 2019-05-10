import React, { Component } from 'react';
import { Link } from "react-router-dom";


class Place extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="place">
                <div className="product-grid__product-wrapper">
                    <div className="product-grid__product">
                        <div className="product-grid__img-wrapper">
                            <img src={`/images/` + this.props.place.image}
                                 alt="Img" className="product-grid__img"/>
                        </div>
                        <Link className="product-grid__title" to={`/place/${this.props.place.id}`}>{ this.props.place.name }</Link>
                        <div className="product-grid__extend-wrapper">
                            <div className="product-grid__extend">
                                <p className="product-grid__description">{this.props.place.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Place;
