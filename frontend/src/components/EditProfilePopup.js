import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm.js';

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // Стейт переменные, в которых содержатся значения инпутов
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Обработчики изменения инпута, обновляет стейт 
    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangAbout(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: name,
            about: description,
        });
    }

    // Хук для заполнения полей формы текущими значениями при открытии (после успешной отправки запроса)
    useEffect(() => {
        if (!isOpen) {
            setName(currentUser.name);
            setDescription(currentUser.about);
        }
    }, [isOpen]);

    return (
        <PopupWithForm popupName="edit" classText="title"
            title="Редактировать профиль" name="edit-profile" buttonText="Сохранить"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="popup__label">
                <input id="name"
                    className="popup__field popup__field_text_name"
                    type="text"
                    name="name"
                    placeholder="Имя"
                    minLength={2}
                    maxLength={40}
                    required
                    value={name ?? ''}
                    onChange={handleChangeName}
                />
                <span className="popup__error name-error" />
            </div>
            <div className="popup__label">
                <input
                    id="info"
                    className="popup__field popup__field_text_info"
                    type="text"
                    name="info"
                    placeholder="О себе"
                    minLength={2}
                    maxLength={200}
                    required
                    value={description ?? ''}
                    onChange={handleChangAbout}
                />
                <span className="popup__error info-error" />
            </div> </PopupWithForm>
    )
}

export default EditProfilePopup;