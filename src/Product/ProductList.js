import React, { Component } from 'react';
import Product from './Product.js';

class ProductList extends Component {
    render() {
        return (
            <div className="product-container">
                <h2>Products</h2>
                {this.props.products.map((product, i) => {
                    return (<Product key={i} product={product} />)
                })}
            </div>
        );
    }
}

export default ProductList;
