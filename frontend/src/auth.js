// Аутентификация пользователя

import { request } from './utils/apiHelper.js';

export const BASE_URL = 'https://api.mesto.nechaeva.nomoredomainsicu.ru';

// Функция для регистрации пользователя
export const register = (email, password) => {

    return request(`${BASE_URL}/signup`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }
    )

};

// Функция, которая проверяет логин и пароль пользователя на 
// соответствие какому-либо профилю, хранящемуся в базе данных.
export const login = (email, password) => {

    return request(`${BASE_URL}/signin`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }),
            withCredntials: true,
            credentials: 'include',
        }
    )

};
// Функция, которая проверяет логин и пароль пользователя на 
// соответствие какому-либо профилю, хранящемуся в базе данных.
export const getContent = () => {

    return request(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredntials: true,
        credentials: 'include'
    })
};