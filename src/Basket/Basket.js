import React, { Component } from 'react';
import BasketProductList from "./BasketProductList";
import './Basket.css';
import Checkout from "../Checkout/Checkout";

class Basket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            basket: {}
        };
    }

    componentDidMount() {
        this.updateBasket(JSON.parse(localStorage.basket));
    }

    updateBasket(basket) {
        let newBasket = [];
        for (const [key, value] of Object.entries(basket)) {
            newBasket.push({
                productId: key,
                productInfo: value
            })
        }

        this.setState(prevState => ({...prevState.basket, basket: newBasket}));
    }

    removeProduct(productId) {
        let basket = JSON.parse(localStorage.basket);
        delete basket[productId];
        localStorage.basket = JSON.stringify(basket);
        this.updateBasket(basket);
    }

    render() {
        return (
            <div className="base">
                <div className="base-container">
                    <div className="form-side">
                        <div className="basket-wrapper">
                            <div className="form-title">
                                <h2 className="main-title">Customer Information</h2>
                            </div>
                            <Checkout/>
                        </div>
                    </div>
                    <div className="cart-side">
                        <div className="form-title--side">
                            <h2 className="card-side__title">Shopping Cart</h2>
                            <a href="#" className="btn-round">{this.state.basket.length}</a>
                        </div>
                        <div className="main-side">
                            <BasketProductList removeProduct={this.removeProduct.bind(this)} basket={ this.state.basket }/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Basket;
