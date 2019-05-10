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
        newBasket[productId] = { name: this.props.product.name, cost: this.props.product.cost, image: this.props.product.image, quantity: 1 };

        return newBasket;
    }

    addToBasket(productId) {
        if (localStorage.getItem("basket") === null) {
            const basket = this.setItem({}, productId);
            localStorage.setItem('basket', JSON.stringify(basket));

            return;
        }

        let basket = JSON.parse(localStorage.getItem("basket"));
        localStorage.setItem('basket', JSON.stringify(this.setItem(basket, productId)));
    }

    render() {
        return (
            <div className="product-grid__product-wrapper">
                <div className="product-grid__product">
                    <div className="product-grid__img-wrapper">
                        <img src={`/images/` + this.props.product.image}
                             alt="Img" className="product-grid__img"/>
                    </div>
                    <span className="product-grid__title">{this.props.product.name}</span>
                    <span className="product-grid__price">{this.props.product.cost} rub.</span>
                    <div className="product-grid__extend-wrapper">
                        <div className="product-grid__extend">
                            <p className="product-grid__description">{this.props.product.description}</p>
                            <span className="product-grid__btn product-grid__add-to-cart" onClick={() => this.addToBasket(this.props.product.id)}><i
                                className="fa fa-cart-arrow-down"></i> Add to cart</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
