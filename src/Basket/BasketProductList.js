import React, {Component} from 'react';
import BasketProduct from "./BasketProduct";

class BasketProductList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {

    }

    displayProducts() {
        let products = [];
        for (const key in Object.entries(this.props.basket)) {
            products.push(<BasketProduct productId={this.props.basket[key].productId}
                                         quantity={this.props.basket[key].productInfo.quantity}
                                         cost={this.props.basket[key].productInfo.cost}
                                         name={this.props.basket[key].productInfo.name}
                                         image={this.props.basket[key].productInfo.image}
                                         removeProduct={this.props.removeProduct}/>);
        }

        return products;
    }

    displayTotal() {
        let total = 0;

        for (const key in Object.entries(this.props.basket)) {
            total += +this.props.basket[key].productInfo.cost * +this.props.basket[key].productInfo.quantity;
        }

        return <p className="descr__price">{total} rub.</p>;
    }

    render() {
        return (
            <div>
                {this.displayProducts()}
                <section className="price">
                    <div className="descr">
                        <p className="descr__small">Total</p>
                        {this.displayTotal()}
                    </div>
                </section>
            </div>
        );
    }
}

export default BasketProductList;
