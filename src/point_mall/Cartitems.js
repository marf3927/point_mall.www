import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import ItemBox from './itemBox';


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
        const itemsQueue = [];
        for (let cartItem of this.state.cartItems) {
            for(let i = 0; i<cartItem.count; i++){
                itemsQueue.push(cartItem.item.id);
            }    
        }
        this.purchaseNextItem(itemsQueue);
    }

    purchaseNextItem(itemsQueue) {
        console.log(itemsQueue);
        if (itemsQueue.length < 1) {
            localStorage.setItem('cart_items', '[]');
            this.props.history.push('/me/items');  
        } else {
            const itemid = itemsQueue.shift();
            axios.post(
                'http://localhost:8003/items/' + itemid + '/purchase/',
                {},
                {
                    headers: {
                        'Authorization': localStorage.getItem('authorization')
                    }
                }
        ).then((response) => {
            this.purchaseNextItem(itemsQueue);
        });
        }
        
        
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

