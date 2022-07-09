import React from "react";
import { useRef } from "react";
import { PopupWithForm } from './PopupWithForm.js';

export function AddPlacePopup({isOpen, onClose, onAddPlace}) {

    const placeRef = useRef();
    const placeUrlRef = useRef();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        onAddPlace({
          placeName: placeRef.current.value,
          placeUrl: placeUrlRef.current.value
        });
    }

    return(
        <PopupWithForm
        name="add"
        children={
            <ul className="popup__list">
              <li className="popup__list-element">
                <input type="text" ref={placeRef} defaultValue={''} className="popup__data-box" name="place-name" required minLength="2" maxLength="30" placeholder="Название"/>
                <span className="popup__input-error" id="place-name-error"></span>
              </li>
              <li className="popup__list-element">
                <input type="url" ref={placeUrlRef} defaultValue={''} className="popup__data-box" name="place-link" required placeholder="Сылка на картинку"/>
                <span className="popup__input-error" id="place-link-error"></span>
              </li>
            </ul>
        }
        onSubmit={handleSubmit}
        isOpen={isOpen}
        onClose={onClose}
        title="Новое место"/>
    )
}