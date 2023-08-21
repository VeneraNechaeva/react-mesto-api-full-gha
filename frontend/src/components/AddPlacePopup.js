import React, { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {

    // Стейт переменные, в которых содержатся значения инпутов
    const [place, setPlace] = useState('');
    const [link, setLink] = useState('');

    // Обработчики изменения инпута, обновляет стейт 
    function handleChangePlace(e) {
        setPlace(e.target.value);
    }

    function handleChangLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: place,
            link: link,
        });
    }

    // Хук для очистки полей формы при открытии (после успешной отправки запроса)
    useEffect(() => {
        if (!isOpen) {
            setPlace('');
            setLink('');
        }
    }, [isOpen]);

    return (
        <PopupWithForm popupName="add" classText="title" title="Новое место" name="new-place" buttonText="Создать"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} >
            <div className="popup__label">
                <input
                    id="place"
                    className="popup__field popup__field_text_name-place"
                    type="text"
                    name="name"
                    placeholder="Название"
                    minLength={2}
                    maxLength={30}
                    required
                    value={place ?? ''}
                    onChange={handleChangePlace}
                />
                <span className="popup__error place-error" />
            </div>
            <div className="popup__label">
                <input
                    id="link"
                    className="popup__field popup__field_text_link"
                    type="url"
                    name="link"
                    placeholder="Ссылка"
                    required
                    value={link ?? ''}
                    onChange={handleChangLink}
                />
                <span className="popup__error link-error" />
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;