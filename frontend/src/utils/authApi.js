class AuthApi {
    constructor({baseUrl}) {
        this._baseUrl = baseUrl;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`) 
        }
        return res.json();
    } 

    //регистрация
    signUp(email, password) {
        console.log(email)
        return fetch(`${this._baseUrl}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({email, password})
        }).then((res) => this._getResponseData(res))
    }

    // авторизация
    signIn(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({email, password})
        }) .then((res) => this._getResponseData(res))
    }

    tokenCheck(token) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${token}`
            }
        }) .then(this._getResponseData)
    }


}

export const authApi = new AuthApi({
    baseUrl: 'https://auth.nomoreparties.co'
})