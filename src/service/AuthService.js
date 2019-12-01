const API_URL = 'http://localhost:8000';


class AuthService {

    options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }

    login(credentials) {
        let options = this.options;
        options.body = JSON.stringify(credentials);

        return fetch(API_URL + '/auth/login', options);
    }

    getUserInfo() {
        return JSON.parse(localStorage.getItem('userInfo'));
    }

    getAuthHeader() {
        return {Authorization: 'Bearer ' + this.getUserInfo().token };
    }

    logOut() {
        localStorage.removeItem("userInfo");
    }
}


export default new AuthService();