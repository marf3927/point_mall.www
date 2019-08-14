import axios from 'axios';
import {reaction} from 'mobx';

class HttpService {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.authStore = rootStore.authStore;

        this.clientID = 'q3lcLkv9AKycjIR7EQ8DMwAWdDaFDipiT78CiFvx'
        this.refreshSubscribers = [];
        this.isRefreshingToken = false;

        axios.defaults.baseURL = 'http://localhost:8003'
        axios.defaults.headers.common['Authorization'] = this.authStore.authToken
        reaction(()=>this.authStore.authToken, () =>{
            axios.defaults.headers.common['Authorization'] = this.authStore.authToken
        });

        axios.interceptors.response.use(response => {
            return response;
        }, originalError => {
            const { config, response } = originalError;
            const originalRequest = config;
            if (originalError.response.status === 401){
                if (this.authStore.refresh_token == null) {
                    alert('로그인이 필요한 서비스입니다.');
                    this.rootStore.history.push('/login');
                } else {
                    if (!this.isRefreshingToken) {
                        this.isRefreshingToken = true;
                        return new Promise((resolve, reject) => {
                            this.refreshToken().then(token => {
                                originalRequest.headers.Authorization = this.authStore.authToken
                                resolve(axios(originalRequest));
                                for(let subscriber of this.refreshSubscribers){
                                    subscriber(token);
                                }
                            }).catch(error => {
                                this.authStore.deleteToken();
                                reject(originalError);
                                alert('로그인이 필요한 서비스입니다.');
                                this.rootStore.history.push('/login');
                                for(let subscriber of this.refreshSubscribers){
                                    subscriber(null);
                                }
                            }).finally(()=>{
                                this.refreshSubscribers = [];
                                this.isRefreshingToken = false;
                            })
                        });
                    }
                    return new Promise((resolve, reject) =>{
                        this.refreshSubscribers.push((token) =>{
                            if(token ==null){
                                reject(originalError);
                            }else{
                                originalRequest.headers.Authorization = this.authStore.authToken
                                resolve(axios(originalRequest));
                            }
                            resolve(123);
                        })
                    })
                }
            }
            return Promise.reject(originalError);
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
            console.log(response);
            return response.data
        });
    }

    indexMyItems(){
        return axios.get('/me/items/')
        .then((response) => {
            console.log(response);
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
            client_id : this.clientID,
            username : username,
            password : password
        })
        .then((response) => {
            const token = response.data;
            this.authStore.setToken(token)
            return token;
        });
    }

    refreshToken(){
        return axios.post('/o/token/',
        {
            grant_type : "refresh_token",
            client_id : this.clientID,
            refresh_token : this.authStore.refresh_token
        })
        .then((response) => {
            const token = response.data;
            this.authStore.setToken(token)
            return token;
        });
    }
    
}

export default HttpService;