
class Api {
    constructor(options) {
        this._url = options.baseUrl;
        this._headers = options.headers;
    }

    setHeaders (token) {
        this._headers = {
            ...this._headers,
            authorization: `Bearer ${token}`,
        }
    }

    postNewCard (formData) {
        return fetch (`${this._url}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: formData.name,
                link: formData.link
            })
            }
        )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`${res.status} ${res.statusText}`);
        });
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`${res.status} ${res.statusText}`);
        });
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._headers,
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
            });
        
    }

    setUserInfo(newUserData) {
        return fetch (`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: newUserData.name,
                about: newUserData.about
            })
            }
        )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`${res.status} ${res.statusText}`);
        })
    }

    setUserAvatar (newUserData) {
        return fetch (`${this._url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: newUserData.avatar
            })
            }
        )
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        })
    }

    handleLike(cardId, boolean) {
        if (boolean) {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this._headers
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
                });
        } else {
            return fetch(`${this._url}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this._headers
                })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    }
                    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
                });
        }
    }

    deleteCard(cardId) {
        return fetch(`${this._url}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
        });
    }



}

const api = new Api({
    baseUrl: 'https://api.ruslan.mesto.students.nomoreparties.xyz',
    headers: {
      'Content-Type': 'application/json'
    }
})

export default api;
