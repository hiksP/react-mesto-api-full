import React from "react";
import { useRef, useEffect } from "react";
import { PopupWithForm } from './PopupWithForm.js';

export function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

    // создаем реф
    const avatarRef = useRef();

    // передаем адрес аватара в пропс
    const handleSubmit = (e) => {
        e.preventDefault();

        onUpdateAvatar({
          avatar: avatarRef.current.value
        });
    }

    useEffect(() => {
      avatarRef.current.value = ''
    }, [isOpen])

    return (
        <PopupWithForm
         name="avatar"
         isOpen={isOpen}
         onClose={onClose}
         title="Обновить аватар"
         onSubmit={handleSubmit}
         children={
          <ul className="popup__list">
            <li className="popup__list-element">
              <input type="url" ref={avatarRef} defaultValue={''} className="popup__data-box" name="avatar" required placeholder="Сылка на аватар"/>
              <span className="popup__input-error" id="avatar-error"></span>
            </li>
          </ul>
    }/>
      )
}