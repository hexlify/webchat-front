import decode from 'jwt-decode';


class AuthService {

    constructor(domain) {
        this.domain = domain || 'http://localhost:8000';
        this.fetch = this.fetch.bind(this);
        this.login = this.login.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
    }

    login(username, password) {
        return this.fetch(`/auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password
            })
        }).then(res => {
            this.saveUserInfo(res)
            return Promise.resolve(res);
        });
    }

    register(username, email, password) {
        return this.fetch('/auth/register',{
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
                email: email
            })
        });
    }

    loggenIn() {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            }
            else
                return false;
        }
        catch (err) {
            return false;
        }
    }

    saveUserInfo(userInfo) {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    getUserInfo() {
        return JSON.parse(localStorage.getItem('userInfo'));
    }

    getToken() {
        const userInfo = this.getUserInfo();
        if (userInfo == null) {
            return null;
        }
        return this.getUserInfo().token;
    }

    logOut() {
        localStorage.removeItem("userInfo");
    }

    fetch(path, options) {
        const url = this.domain + path;
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }

        if (this.loggenIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
            .then(resp => this._checkStatus(resp))
            .then(resp => resp.json());
    }

    _checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.status)
            error.response = response
            throw error
        }
    }
}


export default new AuthService('https://webchat-backend.herokuapp.com');