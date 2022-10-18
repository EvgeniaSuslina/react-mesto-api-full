import React, { useEffect, useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState("");

  function handleChangeName(e) {
    setUserName(e.target.value);
  }

  function handleChangeAbout(e) {
    setUserInfo(e.target.value);
  }

  useEffect(() => {
    setUserName(currentUser.name);
    setUserInfo(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      name: userName,
      about: userInfo,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name="edit"
      title="Редактировать профиль"
      buttonText={isLoading ? "Сохранение..." : "Сохранить"}
      onClose={onClose}
      onSubmit={handleSubmit}      
    >
      <div className="popup__input-container">
        <input
          value={userName || ""}
          onChange={handleChangeName}
          id="username"
          className="popup__input popup__input_type_username"
          type="text"
          name="username"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          required
        />
        <span
          id="error-username"
          className="error-username  error-message"
        ></span>
      </div>
      <div className="popup__input-container">
        <input
          value={userInfo || ""}
          onChange={handleChangeAbout}
          id="userinfo"
          className="popup__input popup__input_type_userinfo"
          type="text"
          name="userinfo"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          required
        />
        <span
          id="error-userinfo"
          className="error-userinfo  error-message"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
