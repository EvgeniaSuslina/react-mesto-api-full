export const BASE_URL = 'https://api.evgenias.mesto.nomoredomains.icu';

 function checkResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  export function register(email, password){
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {          
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          "password": password,
          "email": email
        })
    })
    .then(checkResult);
  }

  
  export function authorize(email, password){
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {          
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "password": password,
            "email": email
        })
    })
    .then(checkResult)  
    
  } 


  export function getContent(token){
    return fetch(`${BASE_URL}/users/me`,{
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    } 
    })
    .then(checkResult)
  }