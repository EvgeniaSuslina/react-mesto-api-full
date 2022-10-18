import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupDeleteConfirm() {
  return (
    <PopupWithForm
      name="del"
      title="Вы уверены?"
      buttonText="Удалить"
    ></PopupWithForm>
  );
}

export default PopupDeleteConfirm;
