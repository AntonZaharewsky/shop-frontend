import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class BasketProduct extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card-side">
                <img src={`/images/` + this.props.image}
                     alt="backpack" className="card-side__img" />
                <div className="card-side__content">
                    <p className="text">{this.props.name}</p>
                    <p className="small-price">Cost: {this.props.cost} rub</p>
                    <p className="small-price">Quantity: {this.props.quantity}</p>
                </div>
                <Button onClick={() => this.props.removeProduct(this.props.productId)} className="basket__product-remove-button">Remove</Button>
            </div>
        );
    }
}

export default BasketProduct;
