import React, { useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

function AddPlacePopup({ onAddPlace, isOpen, onClose }) {

// Запуск валидации
const { values, handleChange, errors, isValid, setValues, resetForm } = useFormAndValidation()

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();

        // Передаём значения управляемых компонентов во внешний обработчик
        onAddPlace({
            name: values.place ?? '',
            link: values.link ?? '',
        });
    }

    // Хук для очистки полей формы при открытии (после успешной отправки запроса)
    useEffect(() => {
        if (!isOpen) {
            resetForm({name: '', link: ''});
        } else setValues({name: '', link: ''});
    }, [isOpen]);

    return (
        <PopupWithForm popupName="add" classText="title" title="Новое место" name="new-place" buttonText="Создать"
            isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} isSubmitEnable={isValid}>
            <div className="popup__label">
                <input
                    id="place"
                    className="popup__field popup__field_text_name-place"
                    type="text"
                    name="place"
                    placeholder="Название"
                    minLength={2}
                    maxLength={30}
                    required
                    value={values.place ?? ''}
                    onChange={handleChange}
                />
                <span className={`popup__error place-error  ${errors?.place ? "popup__error_visible" : ""}`}>{errors?.place}</span>
            </div>
            <div className="popup__label">
                <input
                    id="link"
                    className="popup__field popup__field_text_link"
                    type="url"
                    name="link"
                    placeholder="Ссылка"
                    required
                    value={values.link ?? ''}
                    onChange={handleChange}
                />
                <span className={`popup__error link-error  ${errors?.link ? "popup__error_visible" : ""}`}>{errors?.link}</span>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;