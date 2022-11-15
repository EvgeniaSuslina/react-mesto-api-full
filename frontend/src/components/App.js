import React, { useEffect, useState } from "react";
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';

import api from "../utils/Api.js";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupDeleteConfirm from "./PopupDeleteConfirm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login.js";
import Register from "./Register.js";
import InfoTooltip from "./InfoTooltip.js";
import * as auth from '../utils/auth';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isFullImageOpen, setFullImageOpen] = React.useState(false);
  const [cards, setCards] = useState([]);

  const [currentUser, setCurrentUser] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [messageInfoTooltip, setMessageInfoTooltip] = useState({});
  const history = useHistory();

  useEffect(() => {
    checkToken();
}, []);

useEffect(() => {
  if (!loggedIn) {
      return;
  }

  api.updateTokenInHeaders();

  Promise.all([
    api.getInitialCards(),
    api.getUserInfo()
  ])
    .then((result) => {
      const [cards, user] = result;
      setCurrentUser(user);
      setCards(cards);
    })
    .then( 
      console.log("initial data is complited")
    )
    .catch ((error) => {
      console.log(error)
    }) 
 }, [loggedIn]);


  function handleInfoTooltipClick(login){
   login ? setLoggedIn(true) : setLoggedIn(false);
   setIsInfoTooltipOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setFullImageOpen(true);
    setSelectedCard(card);
  }

  function handleDeleteCardClick(card) {
    setIsDeletePopupOpen(true);
    setSelectedCard(card);   
  }
  
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setFullImageOpen(false);
    setSelectedCard({});
    setIsDeletePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  const popupIsOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(popupIsOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [popupIsOpen]) 

function handleCathErr(err){
  console.log('К сожалению, запрос не выполнен: ', err);
}

//регистрация пользователя
  function handleRegister(email, password){

     auth.register(email, password)
     .then(() => {
        history.push('/sign-in')
        handleInfoTooltipClick(true)
      })     
     .catch((err)=>{
      handleCathErr(err);
      handleInfoTooltipClick(false);
      setMessageInfoTooltip('Что-то пошло не так! Попробуйте ещё раз.');
     })
  }

  //вход в систему
  function handleLogin(email, password){
    setIsLoading(true);

    auth.authorize(email, password)
    .then((res)=>{
      if(res.token){        
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        setUserEmail(email);        
      }
    })    
    .catch((err)=>{
      handleCathErr(err);
      handleInfoTooltipClick(false);
      setMessageInfoTooltip(err);
     })
     .finally(()=>{
      setIsLoading(false);
      history.push('/');
     })
  }

//проверка токена
function checkToken() {
  if (localStorage.getItem('token')) {
    const token = localStorage.getItem('token');
    auth.getContent(token)
    .then((res) => {
      setLoggedIn(true);
      setUserEmail(res.email);
      history.push('/');
    })
    .catch(err => {
      handleCathErr(err);
    });
  }
}

  //выход из системы
  function handleLogout(){
    localStorage.removeItem('token');
    setLoggedIn(false);
    setUserEmail('');
    setCurrentUser({});
    setCards([]);
    history.push('/sign-in')
  }

  function handleUpdateUser({name, about}) {
    setIsLoading(true);
    api
      .editUserInfo(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        handleCathErr(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoading(true);
    api
      .editUserAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((error) => {
        handleCathErr(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({name, link}) {
    setIsLoading(true);
    api
      .setNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }  

  function handleCardLike(card) {
    const isLiked = card.likes.some(like => like === currentUser._id);

    if (!isLiked) {
      api
        .addLike(card._id)
        .then((res) => {
          setCards((state) =>
            state.map((c) => c._id === card._id ? res : c)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      api
        .removeLike(card._id)
        .then((res) => {
          setCards((state) =>
            state.map((c) => c._id === card._id ? res : c)
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }

  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      
        <div className="page">
          <div className="page__contents">
          <Header email={userEmail} onLogout={handleLogout}/>
          <Switch>                
            <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            replace
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteCardClick}
            />
            <Route path="/sign-up" replace>
              <Register onRegister={handleRegister}/>
            </Route>
            <Route path="/sign-in" replace>
              <Login onLogin={handleLogin}/>
            </Route>
            <Route>
              <Redirect to="/" replace/>
            </Route>
            <Footer />
           </Switch>
           
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlaceSubmit}
              isLoading={isLoading}
            />
            <PopupDeleteConfirm
              isOpen={isDeletePopupOpen}
              onClose={closeAllPopups}
              onCardDelete={handleCardDelete}
              card={selectedCard}
              isLoading={isLoading}
            />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />
            <ImagePopup
              isOpen={isFullImageOpen}
              onClose={closeAllPopups}
              card={selectedCard}
            />
            <InfoTooltip
            name="infoTooltip"
            isOpen={isInfoTooltipOpen}
            onClose={closeAllPopups}
            loggedIn={loggedIn}
            messageError={messageInfoTooltip}
            />
          </div>
        </div>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
