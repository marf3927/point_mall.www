import React from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { inject } from 'mobx-react';
import DataHelper from '../DataHelper';

@inject('authStore')
class Login extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state= {
            username : 'admin',
            password : 'admin'
        }
        this.onInputChanged = this.onInputChanged.bind(this);
    }

    onInputChanged(event) {
        const target = event.target;
        if (target.name == 'username') {
            this.setState({
                username : target.value
            });
        } else if (target.name == 'password') {
            this.setState({
                password : target.value
            });
        }
    }

    login = () => {
        axios.post(DataHelper.baseUrl() + '/o/token/',
        {
            grant_type : "password",
            client_id : "q3lcLkv9AKycjIR7EQ8DMwAWdDaFDipiT78CiFvx",
            username: this.state.username,
            password : this.state.password
        }
        ).then ((response) => {
            const token  = response.data;
            const {authStore, history} = this.props;
            authStore.setToken(token);
            DataHelper.setAuthToken(token);
        });
        this.props.history.push('/');
        localStorage.removeItem('cart_items');
    }


    render() {
        return(
            <div>
                <div id="container">
                    <p>
                        <label>아이디</label>
                        <input type="text" 
                            value={this.state.username} 
                            onChange = {this.onInputChanged}
                            name = 'username'/>
                    </p>
                    <p>
                        <label>비밀번호</label>
                        <input type="password" 
                            value={this.state.password} 
                            onChange = {this.onInputChanged}
                            name = 'password'/>
                    </p>
                    <button onClick = {this.login}>로그인</button>
                </div>
            </div>
        )
    }
}


export default withRouter(Login)