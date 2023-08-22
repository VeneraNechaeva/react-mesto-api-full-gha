import React, { useEffect, useRef } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose }) {

    // записываем объект, возвращаемый хуком, в переменную
    const avatarRef = useRef();

    // Запуск валидации
    const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation()

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения инпута, полученное с помощью рефа
        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    // Хук для очистки полей формы при открытии (после успешной отправки запроса)
    useEffect(() => {
        if (!isOpen) {
            resetForm({ avatar: '' });
        } else setValues({ avatar: '' });
    }, [isOpen]);

    return (
        <PopupWithForm popupName="avatar" classText="title" title="Обновить аватар" name="update-avatar" buttonText="Сохранить"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isSubmitEnable={isValid}>
            <div className="popup__label">
                <input
                    id="avatar"
                    className="popup__field popup__field_text_avatar"
                    type="url"
                    name="avatar"
                    placeholder="Ссылка"
                    required
                    value={values.avatar ?? ''}
                    onChange={handleChange}
                    ref={avatarRef}
                />
                <span className={`popup__error avatar-error  ${errors?.avatar ? "popup__error_visible" : ""}`}>{errors?.avatar}</span>
            </div>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;