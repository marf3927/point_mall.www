import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { observer} from 'mobx-react'
import DataHelper from '../DataHelper';
import { inject } from 'mobx-react';

@inject('authStore')
@observer
class Header extends React.Component {
    helper = new DataHelper();
    constructor(props) {
        super(props);
        this.state = {
            categories : []
        };
    }
    

    componentDidMount(){
        this.getCategory() 
    }

    getCategory = () => {
        axios.get(DataHelper.baseUrl() + '/categories/')
        .then((response) => {
            const categories = response.data;
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
        const {authStore} = this.props
        if (authStore.isLoggedIn) {
            return(
            <header>
                <Link to="/">PointMall</Link>
                {categories}
                <div className="header-right">
                    <Link to='/' onClick = {this.logout}>Logout</Link>
                </div>
                <div className="header-right">
                    <Link to='/me/:items'>My Items</Link>
                </div>
                <div className="header-right">
                    <Link to='/cart/items'>My Cart</Link>
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
                            <Link to='/cart/items'>My Cart</Link>
                        </div>
                    </header>
                );
            }
    }
}

export default Header
