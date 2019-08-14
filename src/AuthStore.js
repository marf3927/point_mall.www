import { observable, action, computed } from 'mobx'

export default class AuthStore {
    BASE_URL = 'http://localhost:8003';

    @observable authToken = null;

    constructor(rootStore) {
        this.authToken = localStorage.getItem('auth_token');
        this.rootStore = rootStore;
    }

    @action setToken(token) {
        this.authToken = token.token_type + ' ' + token.access_token;
        localStorage.setItem('auth_token', this.authToken);
        localStorage.setItem('refresh_token', token.refresh_token);
    }
    
    @action deleteToken() {
        this.rootStore.itemStore.clearCart();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
        this.authToken = null;
    }

    @computed get isLoggedIn() {
        return this.authToken != null;
    }

    get refresh_token() {
        return localStorage.getItem('refresh_token')
    }

}

