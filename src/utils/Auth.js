// Модуль для работы с регистрацией и авторизацией
class Auth {
    constructor (options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    register (data) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        }
        )
        .then((res) => res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`));
    }

    login (data) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                password: data.password,
                email: data.email
            })
        })
        .then((res) => res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`));
    }

    checkToken () {
        const jwt = localStorage.getItem('jwt');
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                ...this._headers,
                "Authorization": `Bearer ${jwt}`
            }
        })
        .then(res => res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`));
    }
}

const auth = new Auth({
    baseUrl: 'https://api.ruslan43g.students.nomoreparties.xyz',
    headers: {
        "Content-Type": "application/json"
    }
})

export default auth;
