import React, { Component } from 'react';
import axios from "axios";
import ProductList from "../Product/ProductList";
import PlaceMenuList from "./PlaceMenuList";

class DetailPlace extends Component {
    state = {
        place: [],
        menu: [],
        products: []
    };

    filterProductsByMenu(menuId) {
        axios
            .get("http://localhost:8000/product/menu/" + menuId)
            .then(response => {
                let products = JSON.parse(response.data);
                const newProductsState = products.map(p => {
                    return {
                        id: p.id,
                        name: p.product_name,
                        description: p.description,
                        image: p.image,
                        menuId: p.menu_id
                    }

                });

                const newState = Object.assign({}, this.state, {
                    products: newProductsState
                });

                this.setState(newState);
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        axios
            .get("http://localhost:8000/place/" + this.props.match.params.placeId)
            .then(response => {
                let place = JSON.parse(response.data);

                const newState = Object.assign({}, this.state, {
                    place: {
                        id: place.id,
                        name: place.placeName,
                        description: place.description,
                        adressId: place.adressId,
                        placeType: place.placeTypes,
                        smallDescription: place.smallDescription
                    }
                });

                this.setState(newState);
            })
            .catch(error => console.log(error));

        axios
            .get("http://localhost:8000/place/" + this.props.match.params.placeId + "/details")
            .then(response => {
                let menus = JSON.parse(response.data.menus);

                const newMenusState = menus.map(m => {
                    return {
                        id: m.id,
                        name: m.menuName
                    };
                });

                const newProductsState = response.data.products.map(p => {
                    return {
                        id: p.id,
                        name: p.product_name,
                        description: p.description,
                        image: p.image,
                        menuId: p.menu_id
                    }

                });

                this.setState({ menu: newMenusState, products: newProductsState })

            })
            .catch(error => console.log(error));
    }

    render() {
        return (
            <div className="detail-place">
                <p className="detail-place__title">{ this.state.place.name }</p>
                <p className="detail-place__description">{ this.state.place.description }</p>
                <p className="detail-place__description">{ this.state.place.smallDescription }</p>
                <PlaceMenuList filterProductsByMenu={ this.filterProductsByMenu.bind(this) } menus={this.state.menu}/>
                <ProductList products={this.state.products}/>
            </div>
        );
    }
}

export default DetailPlace;
