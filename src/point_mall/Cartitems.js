import React from 'react';
import {withRouter} from 'react-router-dom';
import ItemBox from './itemBox';
import { inject, observer } from 'mobx-react';

@inject('authStore', 'itemStore', 'httpService')
@observer
class CartItems extends React.Component {
    purchaseItems = () => {
        const items = [];
        const {httpService, itemStore} = this.props
        for (let cartItem of itemStore.cartItems) {
            items.push({
                item_id : cartItem.item.id,
                count : cartItem.count
            }) 
        }
        httpService.purchaseItems(items)
        .then(userItems=> {
            itemStore.clearCart();
            this.props.history.push('/me/items');
        });
    }

    clearItems = () => {
        const {itemStore} = this.props;
        itemStore.clearCart();
    }


    render() {
        const {itemStore} = this.props;
        const items = itemStore.cartItems.map((cartItem) => {
            const item = cartItem.item;
            return (
                <ItemBox key = {item.id} item = {item} count = {cartItem.count}/>
            );
        })
        return (
            <div id="container">
                <h1>장바구니</h1>
                <button onClick = {this.purchaseItems}>구입</button>
                <button onClick = {this.clearItems}>비우기</button>
                <div id="item-list-container">
                    {items}
                </div>
            </div>
        );
    }
}

export default withRouter(CartItems);

