import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

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
        axios.get('http://localhost:8003/categories/')
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
        const auth = localStorage.getItem('authorization');
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
