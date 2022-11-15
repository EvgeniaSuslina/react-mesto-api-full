import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({name, isOpen, onClose, loggedIn, messageError }){


    return(
        <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
        <div className="popup__container" name={name}>    
        <button type="button" className="popup__close" onClick={onClose}></button>
        <img className="popup__image-auth" src={`${loggedIn ? success : fail}`} alt="состояние регистрации"/>
        <h2 className="popup__text-auth">{`${loggedIn ? "Вы успешно зарегистрировались!" : messageError}`}</h2>            
      </div>
    </section>
    )
}
export default InfoTooltip