import AuthService from './AuthService'


class ApiService {

    authService = new AuthService();

    getUserInfo() {
        return this.authService.fetch('/user');
    }
}

export default new ApiService();