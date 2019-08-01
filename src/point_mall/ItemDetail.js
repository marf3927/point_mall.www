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
                    <img width="50" src={process.env.PUBLIC_URL + '/image/다운로드.png'} onClick={this.purchase}/>  
                </div>
            </div>
        );
    }
}

export default withRouter(ItemDetail);
