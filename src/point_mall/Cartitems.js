import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import ItemBox from './itemBox';
import DataHelper from '../DataHelper';
import { inject } from 'mobx-react';

@inject('authStore')
class CartItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cartItems : [],
        }
    }

    componentDidMount(){
        this.indexItems();
    }

    purchase = () => {
        const items = [];
        const {authStore} = this.props
        for (let cartItem of this.state.cartItems) {
            items.push({
                item_id : cartItem.item.id,
                count : cartItem.count
            }) 
        }
        axios.post(
            DataHelper.baseUrl() +'/items/purchase/',
            {
                items
            },
            {
                headers: {
                    'Authorization': authStore.authToken
                }
            }
        ).then((response) => {
            localStorage.removeItem('cart_items');
            this.props.history.push('/me/items');
        });
    }

    indexItems = () => {
        let cartItems = localStorage.getItem('cart_items');
        if (cartItems == null || cartItems.lenght < 1){
            cartItems = [];
        } else {
            cartItems = JSON.parse(cartItems)
        }
        this.setState({
            cartItems : cartItems
        })
    }

    render() {
        const items = this.state.cartItems.map((cartItem) => {
            const item = cartItem.item;
            return (
                <ItemBox key = {item.id} item = {item} count = {cartItem.count}/>
            );
        })
        return (
            <div id="container">
                <h1>장바구니</h1>
                <button onClick = {this.purchase}>구입</button>
                <div id="item-list-container">
                    {items}
                </div>
            </div>
        );
    }
}

export default withRouter(CartItems);

