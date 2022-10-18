import React from "react";

function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  children,
  buttonText,
  onSubmit,  
}) {
  return (
    <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <form
        className="popup__container popup__container_type_edit"
        name={name}
        onSubmit={onSubmit}
      >
        <button
          type="button"
          className="popup__close popup__close_type_edit"
          onClick={onClose}
          />
        <h3 className="popup__title">{title}</h3>
        {children}
        <button
          className="popup__submit popup__submit_edit"          
          type="submit"
        >
          {buttonText}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
