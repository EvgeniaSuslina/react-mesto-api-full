import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarUrl = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarUrl.current.value,
    });
  }

  useEffect(() => {
    avatarUrl.current.value = '';
}, [isOpen])

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="ava"
      title="Обновить аватар"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      onSubmit={handleSubmit}
      
    >
      <div className="popup__input-container">
        <input
          ref={avatarUrl}
          id="avalink"
          className="popup__input popup__input_type_avalink"
          type="url"
          name="avalink"
          placeholder="Ссылка"
          required
        />
        <span
          id="error-avalink"
          className="error-avalink  error-message"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
