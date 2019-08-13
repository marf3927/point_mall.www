import React from 'react';
import {withRouter} from 'react-router-dom';
import { observable, action} from 'mobx'
import { observer, inject } from 'mobx-react'


@inject('authStore', 'httpService')
@observer
class Register extends React.Component{
    @observable username = ''
    @observable password = ''

    
    register = () => {
        const {httpService, history} = this.props;
        httpService.register(
            this.username, this.password
        ).then((response) => {
            history.push('/login');
        }); 
    }


    render() {
        const {username, password} = this;
        return(
            <div>
                <div id="container">
                <p>
                    <input name="username" placeholder="username" onChange={this.onChange} value={username} fluid='true' />
                </p>
                <p>
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.onChange}
                        value={password}
                        fluid='true'
                    />
                </p>
                    <button onClick = {this.register}>회원가입</button>
                </div>
            </div>
        );
    }
    
    @action.bound
    onChange(event) {
      const { name, value } = event.target;
      this[name] = value;
    }

}


export default withRouter(Register)
