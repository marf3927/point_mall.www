import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import ItemBox from './itemBox';
import DataHelper from '../DataHelper';

class CategoyDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category : null,
            items : []
        }
    }


    componentDidMount() {
            this.getItem();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.categoryId !== prevProps.match.params.categoryId) {
            this.getItem();
        }
      }
    
    

    getItem() {
        const categoryId = this.props.match.params.categoryId;
        axios.get(DataHelper.baseUrl() +'/categories/' + categoryId + '/items/')
        .then((response) => {
            const item = response.data;
            this.setState({
                items : item
            });
        });
    }

    render() {
        const items = this.state.items.map((item) => {
            return (
                <ItemBox key={item.id} item = {item}/>
            );
        })
        return (
            <div>
                <div id="container">
                    <div id="item-list-container">
                        {items}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CategoyDetail);