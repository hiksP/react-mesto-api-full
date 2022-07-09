import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import React from "react";
import { useContext, useEffect, useState } from "react";
import { PopupWithForm } from './PopupWithForm.js';

export function EditProfilePopup({isOpen, onClose, onUpdateUser}) {

    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description , setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, isOpen]); 

    const handleChagneName = (e) => {
        setName(e.target.value);
    }

    const handleChangeAbout = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
      // Запрещаем браузеру переходить по адресу формы
      e.preventDefault();

      // Передаём значения управляемых компонентов во внешний обработчик
      onUpdateUser({
        name,
        about: description,
      });
    }

    return (
      <PopupWithForm
       name="edit"
       isOpen={isOpen}
       onClose={onClose}
       title="Редактировать профиль"
       onSubmit={handleSubmit}
       children={
          <ul className="popup__list">
              <li className="popup__list-element">
              <input type="text" value={name || ''} onChange={handleChagneName} className="popup__data-box" required minLength="2" maxLength="40" name="name" placeholder="Имя пользователя"/>
              <span className="popup__input-error" id="name-error"></span>
              </li>
              <li className="popup__list-element">
              <input type="text" value={description || ''} onChange={handleChangeAbout} className="popup__data-box" required minLength="2" maxLength="200" name="status" placeholder="Профессиональная деятельность"/>
              <span className="popup__input-error" id="status-error"></span>
              </li>
          </ul>
  }/>
    )
}