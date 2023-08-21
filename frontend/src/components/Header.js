import React from 'react';
import headerLogo from '../images/Vector.svg';

function Header() {
    return (
        <header className="header page__margin">
            <img
                className="header__logo"
                src={headerLogo}
                alt="сервис Mesto"
            />
        </header>
    )
}

export default Header;

