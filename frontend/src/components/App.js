import React, { useState, useEffect } from 'react';
import { api } from '../utils/Api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

// Импортируем объект контекста 
import { CurrentUserContext } from '../contexts/CurrentUserContext';

// Функциональный компонент App
function App() {
  // Хук, управляющий внутренним состоянием.(Переменные состояния)
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);
  // Стейт для контекста текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Эффект при монтровании, вызывает запрос и обновляет стейт-переменную
  // из полученного значения
  useEffect(() => {
    api.getUserInformation()

      .then((userData) => {
        setCurrentUser(userData);
      })

      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      })

      api.getInitialCards()
      .then((cardsData) => {
        setCards(cardsData);
      })

      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      }) 
  }, []);


  // Обработчики событий: изменяют внутреннее состояние
  // Для попапа редактирования профиля
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  // Для попапа добавления места
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // Для попапа редактирования аватара
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  // Для попапа с картинкой
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // Закрытие попапов
  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  // Для лайка карточки
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }) 
  }

  // Для удаления карточки
  function handleCardDelete(delCard) {
    api.deletCard(delCard._id).then(() => {
      setCards((state) => state.filter(card => card._id !== delCard._id))
    })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }) 
  }

  // Для формы редактирования профиля
  function handleUpdateUser(userData) {
    api.savetUserInformation(userData.name, userData.about).then(() => {
      const updatedUserData = Object.assign({}, currentUser);  
      updatedUserData.name = userData.name;
      updatedUserData.about = userData.about;
      setCurrentUser(updatedUserData);
      closeAllPopups();
    })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }) 
  }

  // Для формы редактирования аватара
  function handleUpdateAvatar(userData) {
    api.changeAvatar(userData.avatar).then(() => {
      const updatedUserData = Object.assign({}, currentUser);  
      updatedUserData.avatar = userData.avatar;
      setCurrentUser(updatedUserData);
      closeAllPopups();
    })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }) 
  }

  // Для формы добавления карточки
  function handleAddPlaceSubmit(newCard) {
    api.addNewCard(newCard.name, newCard.link).then((savedNewCard) => {
      setCards([savedNewCard, ...cards]);
      closeAllPopups();
    })

    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    }) 
  }

  return (

    // Используем провайдер контекста текущего пользователя
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__container">

          <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

          <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

          <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm popupName="confirm" classText="title-confirm" title="Вы уверены?"
            name="confirm" buttonText="Да"
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <Header />
          <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} cards={cards} />
          <Footer />

        </div></div>
    </CurrentUserContext.Provider>
  );
}

export default App;