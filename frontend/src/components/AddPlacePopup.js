import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

 
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName('');
    setLink('');
}, [isOpen]);


  return (
    <PopupWithForm
      isOpen={isOpen}
      name="add"
      title="Новое место"
      buttonText={isLoading ? "Сохранение..." : "Создать"}
      onClose={onClose}
      onSubmit={handleSubmit}      
    >
      <div className="popup__input-container">
        <input
          value={name || ""}
          onChange={handleNameChange}
          id="imagename"
          className="popup__input popup__input_type_imagename"
          type="text"
          name="imagename"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span
          id="error-imagename"
          className="error-imagename  error-message"
        ></span>
      </div>
      <div className="popup__input-container">
        <input
          value={link || ""}
          onChange={handleLinkChange}
          id="imagelink"
          className="popup__input popup__input_type_imagelink"
          type="url"
          name="imagelink"
          placeholder="Ссылка на картинку"
          required
        />
        <span
          id="error-imagelink"
          className="error-imagelink  error-message"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
