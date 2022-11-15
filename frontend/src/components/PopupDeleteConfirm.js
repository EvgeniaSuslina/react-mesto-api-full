import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleteConfirm({ isOpen, onClose, onCardDelete, card, isLoading}) {

  function handleSubmit(e) {
    e.preventDefault();
    onCardDelete(card)
  }

  return (
    <PopupWithForm
      name="del"
      title="Вы уверены?"   
      isOpen={isOpen}
      onClose={onClose}
      buttonText={isLoading ? 'Удаляем...' : 'Да'}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

export default PopupDeleteConfirm;
