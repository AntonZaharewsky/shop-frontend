import React, { Component } from 'react';

class BasketProductList extends Component {
    constructor(props) {
        super(props);
        console.log(props);
    }

    render() {
        return (
            <div>
                {/*{this.props.basket.map((place, i) => {*/}
                    {/*return (<h1>{ place }</h1>)*/}
                {/*})}*/}
            </div>
        );
    }
}

export default BasketProductList;
