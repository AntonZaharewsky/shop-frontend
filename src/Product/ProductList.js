import React, { Component } from 'react';
import Product from './Product.js';
import './Products.css';

class ProductList extends Component {
    render() {
        return (
            <div className="product-grid product-grid--flexbox">
                <h2>Products</h2>
                <div className="product-grid__wrapper">
                    {this.props.products.map((product, i) => {
                        return (<Product key={i} product={product} />)
                    })}
                </div>
            </div>
        );
    }
}

export default ProductList;
