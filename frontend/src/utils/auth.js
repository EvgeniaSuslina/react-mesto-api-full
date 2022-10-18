export const BASE_URL = 'https://auth.nomoreparties.co';

 function checkResult(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }



  export function register(password, email){
    return fetch(`${BASE_URL}/signup`,{
        method: 'POST',
        headers: {
          
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({password, email})
    })
    .then(checkResult);
  }


  
  export function authorize(password, email){
    return fetch(`${BASE_URL}/signin`,{
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