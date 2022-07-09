import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

// создание экземляра карточки
export function Card({card, selectedCard, onCardLike, onCardDelete}) {

    // подписка на контекст с пользователем 
  
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Создаём переменную, которую после зададим в `className` для кнопки удаления
    const cardDeleteButtonClassName =  isOwn ? 'elements__delete-button' : 'elements__delete-button_inactive'

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = isLiked ? 'elements__like-button elements__like-button_active' : 'elements__like-button'

    // функции по клику на карточку

    const handleLike = () => {
        onCardLike(card); 
    }

    const handleOpenCardPopup = () => {
        selectedCard(card);
    }

    const handleDeleteCard = () => {
        onCardDelete(card);
    }


    return (
            <li className="elements__box">
                <button className={cardDeleteButtonClassName} onClick={handleDeleteCard} type="button"></button>
                <img className="elements__image" onClick={handleOpenCardPopup} src={card.link} alt={card.name}/>
                <div className="elements__name-box">
                    <h2 className="elements__title">{card.name}</h2>
                    <div className="elements__like">
                        <button className={cardLikeButtonClassName} onClick={handleLike} type="button"></button>
                        <p className="elements__likes-count">{card.likes.length}</p>
                    </div>
                </div>
            </li>
    );
}