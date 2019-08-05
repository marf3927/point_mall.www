class DataHelper {
    static baseUrl() {
        return 'http://localhost:8003';
    }

    static setAuthToken(token) {
        return localStorage.setItem('auth_token', 'Bearer ' + token.access_token);
    }

    static getAuthToken(token) {
        return localStorage.getItem('auth_token');
    }

}

export default DataHelper;
