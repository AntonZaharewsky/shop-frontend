import React, { Component } from 'react';
import BasketProductList from "./BasketProductList";

class Basket extends Component {
    state = {
        basket: {}
    };

    componentDidMount() {
        const newState = {...this.state};
        newState.basket = [JSON.parse(localStorage.getItem('basket'))];
        this.setState({basket: JSON.parse(localStorage.getItem('basket'))[1]});
        // this.setState(prevState => ({
        //     jasper: {
        //         ...prevState.jasper,
        //         name: 'something'
        //     }
        // }))
        // this.setState({ basket: JSON.parse(localStorage.getItem('basket')) });
        // console.log(JSON.parse(localStorage.getItem('basket'))[1]);
        console.log(this.state.basket);
    }

    render() {
        return (
            <div>
                <h2>Basket</h2>
                <BasketProductList basket={ this.state.basket }/>
            </div>
        );
    }
}

export default Basket;
