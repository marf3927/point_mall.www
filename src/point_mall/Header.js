import React from 'react';
import {Link} from 'react-router-dom';
import { observer} from 'mobx-react'
import { inject } from 'mobx-react';

@inject('authStore', 'itemStore', 'httpService')
@observer
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories : []
        };
    }
    

    componentDidMount(){
        this.IndexCategories() 
    }

    IndexCategories = () => {
        this.props.httpService.IndexCategories()
        .then((categories) => {
            this.setState({
                categories : categories
            }); 
        })
    }

    logout = () => {
        const {authStore} = this.props;
        authStore.deleteToken();
    }

    render() {
        const categories = this.state.categories.map((category) => {
            return(
                <Link key = {category.id} to = {'/categories/' + category.id}>{category.title}</Link>
            );
        });
        const {authStore, itemStore} = this.props
        if (authStore.isLoggedIn) {
            return(
            <header>
                <Link to="/">PointMall</Link>
                {categories}
                <div className="header-right">
                    <Link to='/' onClick = {this.logout}>Logout</Link>
                </div>
                <div className="header-right">
                    <Link to='/cart/items'>My Cart {itemStore.cartItemsCount}</Link>
                </div>
                <div className="header-right">
                    <Link to='/me/:items'>My Items</Link>
                </div>
            </header>
            );
            } else {
                return(
                    <header>
                        <Link to="/">PointMall</Link>
                        {categories}
                        <div className="header-right">
                            <Link to="/login">Login</Link>
                        </div>
                        <div className="header-right">
                            <Link to='/cart/items'>My Cart {itemStore.cartItemsCount}</Link>
                        </div>
                    </header>
                );
            }
    }
}

export default Header
