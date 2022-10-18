import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <section className={`popup popup_type_image ${isOpen && "popup_opened"}`}>
      <div className="popup__image-container">
        <button
          type="button"
          className="popup__close popup__close_type_image"
          onClick={onClose}
        ></button>
        <img className="popup__image" src={card.link} alt={card.name} />
        <h2 className="popup__caption">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
