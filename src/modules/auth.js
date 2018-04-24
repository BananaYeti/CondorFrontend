class Auth{
    static authenticateUser(token){
        if(!token){
            localStorage.setItem('token', null);            
        }
        localStorage.setItem('token', token);
    }

    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static deauthenticateUser() {
        localStorage.removeItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }
}

export default Auth;