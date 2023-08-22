import React, { useState, useEffect } from 'react';
import { useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import { api } from '../utils/Api.js';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import * as auth from '../auth.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

// Импортируем компоненты приложения, которые используем в Роутах
import Register from './Register.js';
import Login from './Login.js';
import ProtectedRoute from './ProtectedRoute.js';
import InfoTooltip from './InfoTooltip.js';


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


  // Стейты для модальных окон регистрации (информационная подсказка)
  // Для успешной регистрации
  const [isSuccessRegistrPopupOpen, setIsSuccessRegistrPopupOpen] = useState(false);
  
  // Для неуспешного входа и регистрации
  const [isFailPopupOpen, setIsFailPopupOpen] = useState(false);

   // Стейт с текстом ошибки
   const [popupErrorMessage, setPopupErrorMessage] = useState('Что-то пошло не так! Попробуйте ещё раз.');

  // Стейт для контекста текущего пользователя
  const [currentUser, setCurrentUser] = useState({});

  // Стейт статуса пользователя — вошёл он в систему или нет
  const [loggedIn, setLoggedIn] = useState(false);

  // Стейт информации от пользователя
  const [userInfo, setUserInfo] = useState({});

  // Хук возвращает функцию, которая позволяет рограммно перемещаться
  const navigate = useNavigate();

  // Эффект при монтровании, который проверяет токен
  useEffect(() => {
    tokenCheck();
  }, [])


  // Если у пользователя есть токен в localStorage, 
  // эта функция проверит, действующий он или нет (валидность токена)
  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      // проверим токен
      auth.getContent(jwt).then((res) => {
        if (res) {
          // авторизуем пользователя
          setUserInfo(() => res.data);
          setLoggedIn(true);
          navigate("/users/me", { replace: true })
        }
      })

        .catch((err) => {
          console.log(err); // выведем ошибку в консоль
        });
    }
  }

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

  // Метод, который поменяет статус пользователя
  function handleLogin(e) {
    e.preventDefault();
    tokenCheck();
    setLoggedIn({
      loggedIn: true
    })
  }

  // Обратчик для открытия попапа "успешной регистрации"
  function handleSuccessRegistr() {
    setIsSuccessRegistrPopupOpen(() => true);
  }

  // Обратчик для открытия попапа "неудачной регистрации"
  function handleFailRegister(err) {
    setPopupErrorMessage(() => `Ошибка: ${err.body.error}`);
    setIsFailPopupOpen(() => true);
  }

  // Обратчик для открытия попапа "неудачного входа"
  function handleFailLogin(err) {
    setPopupErrorMessage(() => `Ошибка: ${err.body.message}`);
    setIsFailPopupOpen(() => true);
  }

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
    setIsFailPopupOpen(false);
    setPopupErrorMessage(() => "Что-то пошло не так! Попробуйте ещё раз.");
  }

  // Закрытие попапа SuccessRegistr
  function closeSuccessRegistr() {
    setIsSuccessRegistrPopupOpen(false);
    navigate('/signin', { replace: true })
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


          <InfoTooltip isOpen={isSuccessRegistrPopupOpen} popupName="success" classIcon="success-icon" classText="title-success" title="Вы успешно зарегистрировались!"
            onClose={closeSuccessRegistr} />
          <InfoTooltip isOpen={isFailPopupOpen} popupName="fail" classIcon="fail-icon" classText="title-fail" title={popupErrorMessage}
            onClose={closeAllPopups} />

          <Header userInfo={userInfo} />

          <Routes>

            <Route path="/" element={loggedIn ? <Navigate to="/users/me" replace /> : <Navigate to="/signin" replace />} />

            <Route path="/signup" element={<Register onSuccessRegister={handleSuccessRegistr} onFailRegister={handleFailRegister}/>} />
            <Route path="/signin" element={<Login handleLogin={handleLogin} handleFailLogin={handleFailLogin} />} />

            {/* Защищённый маршрут */}
            <Route path="/users/me" element={<ProtectedRoute element={Main} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} onCardLike={handleCardLike}
              onCardDelete={handleCardDelete} cards={cards} loggedIn={loggedIn} />} />

          </Routes>

          <Footer />

        </div></div>
    </CurrentUserContext.Provider>
  );
}

export default App;