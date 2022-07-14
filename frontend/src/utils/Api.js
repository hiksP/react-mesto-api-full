class Api {
    constructor({adress, headers}) {
        this._adress = adress;
        this._headers = headers;
    }


    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка ${res.status}`) 
        }
        return res.json();
    } 

    // загрука информации пользователя

    getUserInfo() {
        return fetch(`${this._adress}/users/me`, {
            headers: this._headers,
            credentials: 'include',
        }).then(this._getResponseData)
    }

    // загрузка карточек

    getCards() {
        return fetch(`${this._adress}/cards`, {
            headers: this._headers,
            credentials: 'include',
        }).then(this._getResponseData)
    }
  
    // отправка информации о пользователе на сервер

    editInfo(name, status) {
        return fetch(`${this._adress}/users/me`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: status
            })
        }).then(this._getResponseData)
    }

    // загрузка карточки на сервер

    uploadCard(cardName, cardLink) {
        return fetch(`${this._adress}/cards`, {
            method: "POST",
            headers: this._headers,
            credentials: 'include',
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        }).then(this._getResponseData)
    }

    // удаление карточки

    deleteCard(cardId, isMine) {
        if(isMine) {
                return fetch(`${this._adress}/cards/${cardId}`, {
                method: "DELETE",
                credentials: 'include',
                headers: this._headers,
            }).then(this._getResponseData)
        }
    }

    // изменение лайка (добавление или удаление)
    changeLikeCardStatus(cardId, isLiked) {
        if(isLiked) {
            return fetch(`${this._adress}/cards/${cardId}/likes`, {
                method: "DELETE",
                credentials: 'include',
                headers: this._headers,
            }).then(this._getResponseData)
        } else {
            return fetch(`${this._adress}/cards/${cardId}/likes`, {
                method: "PUT",
                credentials: 'include',
                headers: this._headers,
            }).then(this._getResponseData)
        }
    } 
    
    // изминение аватарка пользователя

    changeAvatar(link) {
        return fetch(`${this._adress}/users/me/avatar`, {
            method: "PATCH",
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                avatar: link
            })
        }).then(this._getResponseData)
    }
}
    // создание класса АПИ и его экспорт

export const api = new Api({
    adress: 'https://plavskikh.mesto.nomorepartiesxyz.ru',
    headers: { "Content-Type": "application/json" },
})