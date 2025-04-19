export default class Login {
    constructor(login) {
        this.email = login !== undefined && login.email !== undefined ? login.email : '';
        this.password = login !== undefined && login.password !== undefined ? login.password : '';
        this.rememberMe = login !== undefined && login.rememberMe !== undefined ? login.rememberMe : true;
    }
}