import Axios from "axios";
import Token from "./Token.js"
import AppStorage from "./AppStorage.js"

class User {
    register(data) {
        let uri = 'http://localhost:8000/api/auth/register';
        let self = this;
        Axios.post(uri, data).then((res) => {
            this.responseAfterLogin(res)
        }).catch( (error) => {
            console.log(error);
        });
    }

    login(data) {
        let uri = 'http://localhost:8000/api/auth/login';
        Axios.post(uri, data)
            .then(res => this.responseAfterLogin(res))
            .catch(error => console.log(error.response.data))
    }

    responseAfterLogin(res) {
        const access_token = res.data.access_token
        const username = res.data.user
        let self = this;

        if (Token.isValid(access_token)) {
            AppStorage.store(username, access_token)
            window.location = '/index'
        }
    }

    hasToken() {
        const storedToken = AppStorage.getToken();
        if (storedToken) {
            return Token.isValid(storedToken) ? true : this.logout()
        }
        return false
    }

    loggedIn() {
        return this.hasToken()
    }

    logout() {
        let uri = 'http://localhost:8000/api/auth/logout';
        let data = { token: localStorage.getItem('token') }
        Axios.post(uri, data)
            .then(res => console.log(res.data))
            .catch(error => console.log(error.response.data))
        AppStorage.clear()
    }

    name() {
        if (this.loggedIn()) {
            return AppStorage.getUser()
        }
    }

    id() {
        if (this.loggedIn()) {
            const payload = Token.payload(AppStorage.getToken())
            return payload.sub
        }
    }

    own(id) {
        return this.id() == id
    }

    admin() {
        return this.id() == 1
    }
}
export default User = new User();