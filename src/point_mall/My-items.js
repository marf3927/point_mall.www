import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import ItemBox from './itemBox';
import DataHelper from '../DataHelper';
import { inject } from 'mobx-react';

@inject('authStore')
class MyItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user : null,
            userItems : []
        }
    }

    componentDidMount(){
        this.getUser();
        this.indexItems();
    }

    getUser = () =>{
        const {authStore} = this.props
        axios.get(
            DataHelper.baseUrl() +'/me/',
            {
                headers: {
                    'Authorization' : authStore.authToken
                }
            }
        ).then((response) => {
            const user = response.data;
            this.setState({
                user : user
            });
        });
    }

    indexItems = () => {
        const {authStore} = this.props
        axios.get(
            DataHelper.baseUrl() + '/me/items/',
            {
                headers : {
                    'Authorization' : authStore.authToken
                }
            }
            ).then((response) => {
                const userItems = response.data;
                this.setState({
                    userItems : userItems
                });
            });
    }

    render() {
        const user = this.state.user;
        const point = user ? user.point : 0;
        const items = this.state.userItems.map((userItem) => {
            const item = userItem.item;
            return (
                <ItemBox key = {item.id} item = {item} count = {userItem.count}/>
            );
        })
        return (
            <div id="container">
                <h1>내 아이템 목록</h1>
                <h2>잔고 : {point}원</h2>
                <div id="item-list-container">
                    {items}
                </div>
            </div>
        );
    }
}

export default MyItems;

