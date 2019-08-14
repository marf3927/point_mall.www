import React from 'react';
import ItemBox from './itemBox';
import { inject } from 'mobx-react';

@inject('httpService')
class MyItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user : null,
            userItems : []
        }
    }

    componentDidMount(){
        this.getMe();
        this.indexMyItems();
    }

    getMe = () =>{
        const {httpService} = this.props;
        httpService.getMe()
        .then(user => {
            this.setState({
                user : user
            });
        });
    }

    indexMyItems = () => {
        const {httpService} = this.props;
        httpService.indexMyItems()
            .then(userItems => {
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

