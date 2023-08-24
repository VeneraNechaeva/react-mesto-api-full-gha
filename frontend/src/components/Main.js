import React from 'react';
import Card from '../components/Card.js';

// Импортируем объект контекста 
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

    // Подписываемся на контекст CurrentUserContext
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile page__padding">
                <button className="profile__avatar-button" type="button"
                    onClick={onEditAvatar}
                >
                    <img
                        className="profile__avatar"
                        src={currentUser.avatar}
                        alt="Аватар пользователя"
                    />
                </button>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <p className="profile__subtitle">{currentUser.about}</p>
                    <button className="profile__edit-button" type="button"
                        onClick={onEditProfile}
                    />
                </div>
                <button className="profile__add-button" type="button"
                    onClick={onAddPlace}
                />
            </section>
            <section className="elements page__padding">
                {cards.map((card) => <Card {...card} key={card._id}
                    onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />)}
            </section>
        </main>
    )
}

export default Main;