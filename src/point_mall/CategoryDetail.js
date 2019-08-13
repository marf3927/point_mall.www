import React from 'react';
import {withRouter} from 'react-router-dom';
import ItemBox from './itemBox';
import { inject } from 'mobx-react';



@inject('httpService')
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
        const extraUrl = '/categories/' + categoryId + '/items/'
        this.props.httpService.indexItems(extraUrl)
        .then(item => {
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