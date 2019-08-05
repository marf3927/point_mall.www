import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';

class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item : null,
        }
    }

    componentDidMount() {
        this.getItem();
    }
        

    getItem() {
        const itemId = this.props.match.params.itemId;
        axios.get('http://localhost:8003/items/' + itemId)
        .then((response) => {
            const item = response.data;
            this.setState({
                item : item
            });
        });
    }

    purchase = () => {
        const itemId = this.state.item.id
        axios.post(
            'http://localhost:8003/items/' + itemId + '/purchase/',
            {},
            {
                headers: {
                    'Authorization': localStorage.getItem('authorization')
                }
            }
        ).then((response) => {
            this.props.history.push('/me/items')
        });
    }

    addToCart = () =>{
        const item = this.state.item;
        let cartItems = localStorage.getItem('cart_items');
        if (cartItems == null || cartItems.lenght < 1){
            cartItems = [];
        } else {
            cartItems = JSON.parse(cartItems)
        }
        let isAdded = false;
        for (let cartItem of cartItems) {
            if (cartItem.item.id === item.id) {
                cartItem.count++;
                isAdded = true;
                break;
            }
        }
        if (!isAdded) {
            cartItems.push({
                item : item,
                count : 1
            });
        }
        localStorage.setItem('cart_items', JSON.stringify(cartItems));
    }

    render() {
        const item = this.state.item;
        const title = item ? item.title : '';
        const decs = item ? item.description : '';
        const image = item ? item.image : null;
        return (
            <div id="container">
                <div className="item-image-container">
                    <img src={image} alt="" />
                </div>
                <div className="item-detail-container">
                    <p>
                        <b>{title}</b>
                    </p>
                    <p>{decs}</p>
                    <button onClick={this.purchase}>구입</button>
                    <button onClick={this.addToCart}>장바구니 담기</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ItemDetail);
