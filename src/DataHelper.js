import { observable, computed } from 'mobx';

let instance;

class DataHelper {

    @observable authToken = null;
    
    constructor(){
        if (instance) return instance;
        instance=this;
    }

    baseUrl() {
        return 'http://localhost:8003';
    }

    setAuthToken(token) {
        this.authToken = token.token_type + ' ' + token.access_token;
        return localStorage.setItem('auth_token', this.authToken);
    }


    deleteToken() {
        localStorage.removeItem('cart_items');
        localStorage.removeItem('auth_token');
        this.authToken = null;
    }

    @computed
    get isLoggedIn() {
        return this.authToken != null || localStorage.getItem('auth_token') != null;
    }

    static baseUrl() {
        const dataHelper = new DataHelper();
        return dataHelper.baseUrl();
    }

    static setAuthToken(token) {
        const dataHelper = new DataHelper();
        dataHelper.setAuthToken(token);
    }

    static getAuthToken() {
        const dataHelper = new DataHelper();

    }

}


export default DataHelper;
