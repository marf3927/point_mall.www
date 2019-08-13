import React from 'react';
import {withRouter} from 'react-router-dom';
import { inject } from 'mobx-react';

@inject('authStore', 'itemStore', 'httpService')
class ItemDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            item : null,
        }
    }

    componentDidMount() {
        this.indexItems();
    }
        
    indexItems() {
        const itemId = this.props.match.params.itemId;
        const extraUrl = '/items/' + itemId
        this.props.httpService.indexItems(extraUrl)
        .then(item => {
            this.setState({
                item : item
            });
        });
    }

    purchaseItem = () => {
        const itemId = this.state.item.id
        this.props.httpService.purchaseItem(itemId)
        .then((response) => {
            this.props.history.push('/me/items')
        });
    }

    addToCart = () => {
        const {itemStore} = this.props;
        const item = this.state.item;
        itemStore.addItemToCart(item);
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
                    <button onClick={this.purchaseItem}>구입</button>
                    <button onClick={this.addToCart}>장바구니 담기</button>
                </div>
            </div>
        );
    }
}

export default withRouter(ItemDetail);
