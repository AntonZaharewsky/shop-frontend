import React, { Component } from 'react';
import PlaceEditor from "./PlaceEditor";

class AdminPanel extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Admin</h1>
                <PlaceEditor/>
            </div>
        );
    }
}

export default AdminPanel;
