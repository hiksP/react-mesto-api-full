import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export function Main({cards, onEditAvatar, onEditProfile, onAddPlace}) {

  // подписка на контекст с текущим пользователем 
  
  const currentUser = React.useContext(CurrentUserContext);

  // разметка
    return(
        <main>
        <section className="profile">
          <a className="profile__avatar-hover" href="#" onClick={onEditAvatar}><img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля"/></a>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit-button" type="button" onClick={onEditProfile}></button>
            <p className="profile__status">{currentUser.about}</p>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}></button>
        </section>
        <section className="elements">
          <ul className="elements__list">
            {cards}
          </ul>
        </section>
        </main>
    );
};