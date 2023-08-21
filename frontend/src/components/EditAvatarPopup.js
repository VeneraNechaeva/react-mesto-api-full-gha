import React, { useState, useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {

    // Стейт переменные, в которых содержатся значения инпутов
    const [avatar, setAvatar] = useState('');

    // записываем объект, возвращаемый хуком, в переменную
    const avatarRef = useRef();

    // Обработчик изменения инпута, обновляет стейт
    function handleChangeAvatar(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения инпута, полученное с помощью рефа
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm popupName="avatar" classText="title" title="Обновить аватар" name="update-avatar" buttonText="Сохранить"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <div className="popup__label">
                <input
                    id="avatar"
                    className="popup__field popup__field_text_avatar"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка"
                    required
                    value={avatar ?? ''}
                    onChange={handleChangeAvatar}
                    ref={avatarRef}
                />
                <span className="popup__error avatar-error" />
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;