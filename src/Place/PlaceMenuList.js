import React, { Component } from 'react';

class PlaceMenuList extends Component {
    render() {
        return (
            <div className="menu-container">
                <h2>Menus</h2>
                {this.props.menus.map((menu, i) => {
                    return (
                        <div className="place-menu">
                            <button onClick={() => this.props.filterProductsByMenu(menu.id)} className="place-menu__title">{ menu.name }</button>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default PlaceMenuList;
