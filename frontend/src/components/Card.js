import React from 'react';
// Импортируем объект контекста 
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ link, name, likes, owner, _id, onCardClick, onCardLike, onCardDelete }) {

    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = likes.some(i => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = (
        `element__icon-like ${isLiked && 'element__icon-like_active'}`
    );

    return (
        <article className="element">
            {isOwn && <button className="element__delete-button" type="button"
                onClick={() => onCardDelete({ "_id": _id })} />}

            <img className="element__image" src={link} alt={name}
                onClick={() => onCardClick({ "link": link, "name": name })} />

            <div className="element__items">
                <h2 className="element__text">{name}</h2>
                <div className="element__like-container">

                    <button className={cardLikeButtonClassName} type="button"
                        onClick={() => onCardLike({ "likes": likes, "_id": _id })} />

                    <p className="element__counter">{likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;