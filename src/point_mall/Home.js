import React from 'react';
import ItemBox from './itemBox';
import { inject } from 'mobx-react';


@inject('httpService')
class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            items : []
        }
    }

    componentDidMount(){
        this.indexItems()
    }

    indexItems(){
        const extraUrl = '/items/'
        this.props.httpService.indexItems(extraUrl)
        .then(items => {
            this.setState({
                items : items
            });
        });
    } 


    render () {
        const items = this.state.items.map((item) => {
            return (
                <ItemBox key={item.id} item = {item}/>
            );
        })
        return(
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

export default Home;