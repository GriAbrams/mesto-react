class Api {
  constructor (config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  _sendRequest(link, params) {
    return fetch(link, params)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'GET',
      headers: this._headers
    });
  }

  getInitialCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'GET',
      headers: this._headers
    });
  }

  setUserInfo(data) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    });
  }

  addNewCard(data) {
    return this._sendRequest(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    });
  }

  deleteCard(cardId) {
    return this._sendRequest(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    });
  }

  changeLikeCardStatus(card, like) {
    if (like) {
      return this._sendRequest(`${this._url}/cards/likes/${card}`, {
        method: 'DELETE',
        headers: this._headers
      });
    } else {
      return this._sendRequest(`${this._url}/cards/likes/${card}`, {
        method: 'PUT',
        headers: this._headers
      });
    }
  }

  editUserAvatar(data) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(data)
    });
  }
}

export const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-16',
  headers: {
    authorization: 'cff0131c-0138-49c4-8a3e-05b81096baf4',
    'content-type': 'application/json'
  }
});