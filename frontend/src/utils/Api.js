class Api {
    constructor({url, headers}) {
      this._url =  url;
      this._headers = headers;      
    }

    _checkResult(res) {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Ошибка: ${res.status}`);
      }
    }

    getUserInfo(){
      return fetch(`${this._url}/users/me`,{
        method: 'GET', 
        headers: this._headers
      })
      .then(this._checkResult);
      
    }
   
 
    getInitialCards() {
       return fetch(`${this._url}/cards`, {
        method: 'GET', 
        headers: this._headers
      })
      .then(this._checkResult);
    }

    editUserInfo(name, description){
      return fetch(`${this._url}/users/me`,{
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name: name,
          about: description
        })
      })
      .then(this._checkResult);
    }
    
    setNewCard(setName, setLink){
      return fetch(`${this._url}/cards`, {
        method: 'POST', 
        headers: this._headers,
        body: JSON.stringify({
          name: setName,
          link: setLink
        })
      })
      .then(this._checkResult);
    }

    
    deleteCard(cardId){
      return fetch(`${this._url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(this._checkResult);
    }

    addLike(cardId){
      return fetch(`${this._url}/cards/${cardId}/likes`,{
        method: 'PUT',
        headers: this._headers,
      })
      .then(this._checkResult);
    }


    removeLike(cardId){
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE', 
        headers: this._headers,
      })
      .then(this._checkResult);
    }

    changeLikeCardStatus(data, isLiked) {
      return fetch(`${this._url}cards/${data._id}/likes`,{
        method: isLiked ? "PUT" : "DELETE",
        headers: this._headers,
      })
      .then(this._checkResult);
    }

    editUserAvatar(link){
      return fetch(`${this._url}/users/me/avatar`, {
        method: 'PATCH', 
        headers: this._headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(this._checkResult);
    }
    
  }  

//создание экземпляра класса Api
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-40',
    headers: {
      authorization: '9484ac81-4ff0-44be-950c-3006408ead7d',
      'Content-type': 'application/json'
    }
  });

export default api