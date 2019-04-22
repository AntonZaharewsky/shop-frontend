import React, { Component } from 'react';


class Product extends Component {
    constructor(props) {
        super(props);

    }

    setItem(basket, productId) {
        const newBasket = { ...basket };
        if (newBasket[productId]) {
            newBasket[productId].quantity++;

            return newBasket;
        }
        newBasket[productId] = { quantity: 1 };

        return newBasket;
    }

    addToBasket(productId) {
        if (localStorage.getItem("basket") === null) {
            const basket = this.setItem({}, productId, { quantity: 1 });
            localStorage.setItem('basket', JSON.stringify(basket));

            return;
        }

        let basket = JSON.parse(localStorage.getItem("basket"));
        localStorage.setItem('basket', JSON.stringify(this.setItem(basket, productId)));
    }

    render() {
        return (
            <div className="place">
                <p className="place__description">{ this.props.product.name }</p>
                <button onClick={() => this.addToBasket(this.props.product.id)}>Add to basket</button>
            </div>
        );
    }
}

export default Product;
