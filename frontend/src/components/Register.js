import React, { useEffect, } from 'react';
import * as auth from '../auth.js';
import UserForm from './UserForm.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

// Компонент для регистрации
function Register({ onSuccessRegister, onFailRegister }) {

    // Запуск валидации
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    // Очистка полей от ошибок
    useEffect(() => {
        resetForm();
    }, []);

    // Обработчик регистрации
    const onRegister = (e) => {
        e.preventDefault();

        auth.register(values.email, values.password)
            .then((res) => {
                try {
                    onSuccessRegister();
                } catch (err) {
                    onFailRegister({ body: { error: err } })
                }
            })
            .catch(err => {
                err.then(errMsg => {
                    onFailRegister(errMsg)
                    console.log(errMsg)
                }
                )
            });
    }

    return (
        <UserForm name="register" title="Регистрация" buttonText="Зарегистрироваться"
            text="Уже зарегистрированы?" textLink="Войти" onSubmit={onRegister} isSubmitEnable={isValid}>

            <div className="form__label">
                <input
                    id="email"
                    className="form__field form__field_text_email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    minLength={2}
                    maxLength={40}
                    required
                    value={values.email ?? ''}
                    onChange={handleChange}
                />
                <span className={`form__error email-error  ${errors?.email ? "form__error_visible-user" : ""}`}>
                    {errors?.email}</span>
            </div>
            <div className="form__label">
                <input
                    id="password"
                    className="form__field form__field_text_password"
                    type="password"
                    name="password"
                    placeholder="Пароль"
                    minLength={10}
                    maxLength={10}
                    required
                    value={values.password ?? ''}
                    onChange={handleChange}
                />
                <span className={`form__error password-error  ${errors?.password ? "form__error_visible-user" : ""}`}>
                    {errors?.password}</span>
            </div>
        </UserForm>
    )
}

export default Register;