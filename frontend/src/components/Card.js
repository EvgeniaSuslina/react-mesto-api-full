import React, { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete}) {

const currentUser = useContext(CurrentUserContext);

const isOwn = card.owner === currentUser._id;
const cardDeleteButtonClassName = (`group__element-trash ${!isOwn && 'group__element-trash-hide'}`);  
const isLiked = card.likes.some(i => i === currentUser._id);

const cardLikeButtonClassName =  isLiked ? 'group__element-like_liked' : '';

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
          <button className={`group__element-like ${ cardLikeButtonClassName }`} onClick={handleLikeClick} type="button"></button>
          <h3 className="group__like-counter">{card.likes.length}</h3>
        </div>
      </div>
    </li>
  );
}

export default Card;
