import React from 'react';
import {withRouter} from 'react-router-dom';
import DataHelper from '../DataHelper';


class ItemBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            className : "item-container"
        }
    }

    hover = () => {
        const classname = 'item-highlight-container'
        this.setState({
            className : classname
        });
    }

    unhover = () => {
        const classname = 'item-container'
        this.setState({
            className : classname
        });
    }

    goToItem = () => {
        const item = this.props.item;
        this.props.history.push('/items/' + item.id);   
    }

    render() {
        const item = this.props.item;
        const count = this.props.count;
        const className = this.state.className
        let image = item.image;
        if (!image.startsWith('http')) {
            image = DataHelper.baseUrl() + image;
        }
        if (count != null) {
            return(
                <div className= {className} 
                onClick = {this.goToItem}
                onMouseOver = {this.hover}
                onMouseOut = {this.unhover}>
                <img src={image} alt="" />
                <p className="item-title">{item.title}</p>
                <p className="item-price">개수 : {count}개</p>
                
            </div>
            );
        }
        return(
            <div className={className}
                onClick = {this.goToItem}
                onMouseOver = {this.hover}
                onMouseOut = {this.unhover}>
                <img src={image} alt="" />
                <p className="item-title">${item.title}</p>
                <p className="item-price">가격 : ${item.price}</p>
            </div>
        );
    }
}
    
export default withRouter(ItemBox);