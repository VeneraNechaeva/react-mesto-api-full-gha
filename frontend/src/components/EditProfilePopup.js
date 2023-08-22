import React, { useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

function EditProfilePopup({ onUpdateUser, isOpen, onClose }) {

    // Подписка на контекст
    const currentUser = React.useContext(CurrentUserContext);

    // Запуск валидации
    const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation()

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onUpdateUser({
            name: values.name ?? '',
            about: values.info ?? '',
        });
    }

    // Хук для заполнения полей формы текущими значениями при открытии (после успешной отправки запроса)
    useEffect(() => {
        if (!isOpen) {
            resetForm({ name: currentUser.name, info: currentUser.about });
        } else setValues({ name: currentUser.name, info: currentUser.about })

    }, [isOpen]);

    return (
        <PopupWithForm popupName="edit" classText="title"
            title="Редактировать профиль" name="edit-profile" buttonText="Сохранить"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isSubmitEnable={isValid}>
            <div className="popup__label">
                <input id="name"
                    className="popup__field popup__field_text_name"
                    type="text"
                    name="name"
                    placeholder="Имя"
                    minLength={2}
                    maxLength={40}
                    required
                    value={values.name ?? ''}
                    onChange={handleChange}
                />
                <span className={`popup__error name-error  ${errors?.name ? "popup__error_visible" : ""}`}>{errors?.name}</span>
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
                    value={values.info ?? ''}
                    onChange={handleChange}
                />
                <span className={`popup__error info-error ${errors?.info ? "popup__error_visible" : ""}`}>{errors?.info}</span>
            </div> </PopupWithForm>
    )
}

export default EditProfilePopup;