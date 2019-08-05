import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import DataHelper from '../DataHelper';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user : 'null',
            categories : []
        }
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

    render() {
        const categories = this.state.categories.map((category) => {
            return(
                <Link key = {category.id} to = {'/categories/' + category.id}>{category.title}</Link>
            );
        });
        const auth = DataHelper.getAuthToken();
        if (auth != null) {
            return(
            <header>
                <Link to="/">PointMall</Link>
                {categories}
                <div className="header-right">
                    <Link to="/login">Login</Link>
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
                    </header>
                );
            }
    }
}

export default Header
