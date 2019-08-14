import axios from 'axios';
import {reaction} from 'mobx';

class HttpService {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authStore = rootStore.authStore;
        axios.defaults.baseURL = 'http://localhost:8003'
        axios.defaults.headers.common['Authorization'] = this.authStore.authToken
        reaction(()=>this.authStore.authToken, () =>{
            axios.defaults.headers.common['Authorization'] = this.authStore.authToken
        });

        axios.interceptors.response.use(response => {
            return response;
        }, error => {
            if (error.response.status === 401){
                alert('로그인이 필요한 서비스입니다.');
                this.rootStore.history.push('/login');
            }
            return Promise.reject(error);
        })
    }

    indexItems (extraUrl) {
        return axios.get(extraUrl)
        .then((response) => {
            return response.data
        });
    }

    getMe() {
        return axios.get('/me/')
        .then((response) => {
            return response.data
        });
    }

    indexMyItems(){
        return axios.get('/me/items/')
        .then((response) => {
            return response.data
        });
    }

    purchaseItems(items){
        return axios.post('/items/purchase/', {items}
        ).then((response) => {
            return response.data
        })
        .catch(error => {
            if (error.response.status === 401) {
                alert('로그인이 필요한 서비스입니다.')
            }
        });
    }

    IndexCategories() {
        return axios.get('/categories/')
        .then((response) => {
            return response.data
        });
    }

    purchaseItem(itemId) {
       return axios.post('/items/' + itemId + '/purchase/',{});
    }

    register(username, password) {
        return axios.post(('/users/'),
        {
            username,
            password
        });
    }

    login(username, password){
        return axios.post('/o/token/',
        {
            grant_type : "password",
            client_id : "q3lcLkv9AKycjIR7EQ8DMwAWdDaFDipiT78CiFvx",
            username : username,
            password : password
        })
        .then((response) => {
            const token = response.data;
            this.authStore.setToken(token)
            return token;
        });
    }
    
}

export default HttpService;