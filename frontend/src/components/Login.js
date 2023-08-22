import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as auth from '../auth.js';
import UserForm from './UserForm.js';
import { useFormAndValidation } from '../hooks/useFormAndValidation.js';

// Компонент для входа
function Login({ handleLogin, handleFailLogin }) {

    // Запуск валидации
    const { values, handleChange, errors, isValid, resetForm } = useFormAndValidation();

    // Хук возвращает функцию, которая позволяет рограммно перемещаться
    const navigate = useNavigate();

    // Очистка полей от ошибок
    useEffect(() => {
        resetForm();
    }, []);

    // Обработчик авторизации
    const onLogin = (e) => {
        e.preventDefault();

        if (!values.email || !values.password) {
            return;
        }
        auth.login(values.email, values.password)
            .then((data) => {
                try {
                    localStorage.setItem('jwt', data.token);
                    resetForm();
                    handleLogin(e);
                    navigate('/users/me', { replace: true });
                } catch (err) {
                    handleFailLogin({ body: { message: err } })
                }
            })
            .catch(err => {
                err.then(errMsg => {
                    handleFailLogin(errMsg)
                    console.log(errMsg)
                }
                )
            });
    }

    return (
        <UserForm name="login" title="Вход" buttonText="Войти" text="" textLink=""
            onSubmit={onLogin} isSubmitEnable={isValid}>
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

export default Login;