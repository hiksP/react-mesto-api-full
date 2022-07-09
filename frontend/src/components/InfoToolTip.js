import { useEffect } from "react";
import Success from "../images/RegisterSuccess.svg";
import Fail from "../images/RegisterFail.svg";

export function InfoToolTip({isOpen, onClose}) {

  useEffect(() => {
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
  
    document.addEventListener("keydown", handleEscClose);
  
    return () => document.removeEventListener("keydown", handleEscClose);
  }, []); 
  
    return (
      <div className={isOpen.opened ? `popup popup_sign popup_opened` : `popup popup_sign`}>
        <div className="popup__overlay"></div>
        <div className="popup__container popup__container_registration">
          <button className="popup__close" onClick={onClose} type="button"></button>
          <img className="popup__registration-image" src={isOpen.status ? Success : Fail}/>
          <a className="popup__registration-message">{isOpen.status ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте ещё раз.`}</a>
        </div>
      </div>
    )
}