import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete}) {

const currentUser = useContext(CurrentUserContext);

// Определяем, являемся ли мы владельцем текущей карточки
const isOwn = card.owner._id === currentUser._id;
// Создаём переменную, которую после зададим в `className` для кнопки удаления
const cardDeleteButtonClassName = (
  `group__element-trash ${isOwn ? 'group__element-trash' : 'group__element-trash-hide'}`); 
 
// Определяем, есть ли у карточки лайк, поставленный текущим пользователем
const isLiked = card.likes.some(i => i._id === currentUser._id);
// Создаём переменную, которую после зададим в `className` для кнопки лайка
const cardLikeButtonClassName = (
`group__element-like ${isLiked ? 'group__element-like_liked': 'group__element-like'}`); 

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick(){
    onCardLike(card)
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }  

  return (
    <li className="group__element card">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
      <img
        className="group__element-img"
        src={card.link}
        alt={card.name}
        onClick={handleCardClick}

      />
      <div className="group__element-caption">
        <h2 className="group__element-text">{card.name}</h2>
        <div className="group__like">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <h3 className="group__like-counter">{card.likes.length}</h3>
        </div>
      </div>
    </li>
  );
}

export default Card;
