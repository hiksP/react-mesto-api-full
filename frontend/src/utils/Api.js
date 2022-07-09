class Api {
    constructor({adress, token}) {
        this._adress = adress;
        this._token = token;
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
            headers: {
                authorization: this._token
            }
        }) .then(this._getResponseData)
    }

    // загрузка карточек

    getCards() {
        return fetch(`${this._adress}/cards`, {
            headers: {
                authorization: this._token
            }
        }) .then(this._getResponseData)
    }
  
    // отправка информации о пользователе на сервер

    editInfo(name, status) {
        return fetch(`${this._adress}/users/me`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: status
            })
        }) .then(this._getResponseData)
    }

    // загрузка карточки на сервер

    uploadCard(cardName, cardLink) {
        return fetch(`${this._adress}/cards`, {
            method: "POST",
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: cardName,
                link: cardLink
            })
        }) .then(this._getResponseData)
    }

    // удаление карточки

    deleteCard(cardId, isMine) {
        if(isMine) {
                return fetch(`${this._adress}/cards/${cardId}`, {
                method: "DELETE",
                headers: {
                    authorization: this._token,
                }
            }) .then(this._getResponseData)
        }
    }

    // изменение лайка (добавление или удаление)
    changeLikeCardStatus(cardId, isLiked) {
        if(isLiked) {
            return fetch(`${this._adress}/cards/${cardId}/likes`, {
                method: "DELETE",
                headers: {
                    authorization: this._token,
                }
            }) .then(this._getResponseData)
        } else {
            return fetch(`${this._adress}/cards/${cardId}/likes`, {
                method: "PUT",
                headers: {
                    authorization: this._token,
                }
            }) .then(this._getResponseData)
        }
    } 
    
    // изминение аватарка пользователя

    changeAvatar(link) {
        return fetch(`${this._adress}/users/me/avatar`, {
            method: "PATCH",
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: link
            })
        }) .then(this._getResponseData)
    }
}
    // создание класса АПИ и его экспорт

export const api = new Api({
    adress: 'https://mesto.nomoreparties.co/v1/cohort-35',
    token: 'd4eb43b8-f03a-4178-a37e-1c688ba22106'
})