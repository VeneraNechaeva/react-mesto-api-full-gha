class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Послать запрос
  _sendRequest(url, options) {

    return fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  // Получить информацию о пользователе с сервера
  getUserInformation() {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers
    })
  }

  // Получить начальные карточки с сервера
  getInitialCards() {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers
    })
  }

  // Сохранить информацию о пользователе на сервере
  savetUserInformation(name, about) {
    return this._sendRequest(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: { ...this._headers, ...{ 'Content-Type': 'application/json' } },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
  }

  // Добавить на сервер новую карточку
  addNewCard(name, link) {
    return this._sendRequest(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: { ...this._headers, ...{ 'Content-Type': 'application/json' } },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
  }

  // Удаление карточки
  deletCard(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // Отвечает за статус лайка
  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) { return this.setLike(cardId); }
    else { return this.deletLike(cardId); }
  }

  // Постановка и снятие лайка
  // Постановка лайка
  setLike(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
  }
  // Снятие лайка
  deletLike(cardId) {
    return this._sendRequest(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
  }

  // Обновление аватара пользователя
  changeAvatar(avatar) {
    return this._sendRequest(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: { ...this._headers, ...{ 'Content-Type': 'application/json' } },
      body: JSON.stringify({
        avatar: avatar,
      })
    })
  }
}

// Создание экземпляров класса Api
export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: 'e9c671c4-c4d8-4942-9020-977fdfc1a3d7',
    'Content-Type': 'application/json'
  }
});