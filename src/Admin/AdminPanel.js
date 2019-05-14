import React, { Component } from 'react';
import { Link } from "react-router-dom";


class AdminPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                <Link to={`/admin/place`}>Place</Link>
                <Link to={`/admin/product`}>Product</Link>
                <Link to={`/admin/sql`}>SQL</Link>
                <Link to={`/admin/orders`}>Orders</Link>
                <Link to={`/admin/images`}>Upload Image</Link>
                <Link to={`/admin/payment-methods`}>Payment Methods</Link>
                <Link to={`/admin/users`}>Users</Link>
            </div>
        );
    }
}

export default AdminPanel;
