import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import headerLogo from '../images/Vector.svg';

function Header({ userInfo }) {

    const location = useLocation();
    const [headerInfo, setHeaderInfo] = useState({});

    // Функция, которая отрисовывает текст ссылки и путь прехода по ней, 
    // в зависимости от url
    useEffect(() => {
        if (location) {
            if (location.pathname === "/signin") {
                setHeaderInfo({ textLink: "Регистрация", pathLink: "/signup", email: '' })
            }
            if (location.pathname === "/signup") {
                setHeaderInfo({ textLink: "Войти", pathLink: "/signin", email: '' })
            }
            if (location.pathname === "/users/me") {
                setHeaderInfo({ textLink: "Выйти", pathLink: "/signin", onClick: onSignOut, email: userInfo?.email || '' })
            }
        }
    }, [location])


    // Переход по кнопке "Выйти"
    // Удаляет JWT из localStorage
    function onSignOut(e) {
        localStorage.removeItem('jwt');
    }

    return (
        <header className="header page__margin">
            <img
                className="header__logo"
                src={headerLogo}
                alt="сервис Mesto"
            />
            <div className="header__tex-conteiner">
                <p className="header__email">{headerInfo.email}</p>
                <Link className="header__link" onClick={headerInfo?.onClick || ''} to={headerInfo?.pathLink || ''}>{headerInfo?.textLink}</Link>
            </div>
        </header>
    )
}

export default Header;

