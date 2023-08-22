import { Link } from 'react-router-dom';

// Общий компонент для формы входа и регистрации

function UserForm({ name, title, buttonText, children, text, textLink, onSubmit, isSubmitEnable }) {
    return (
        <form className="form" name={name} noValidate="" onSubmit={onSubmit}>
            <h2 className="form__title">{title}</h2>
            {children}
            <button className={`form__button ${isSubmitEnable ? "" : "form__button_disabled"}`}
                type="submit" disabled={isSubmitEnable ? "" : "disabled"}>
                {buttonText}
            </button>
            <p className="form__text">{text}
                <Link className="form__link-text" to="/signin" >{textLink}</Link>
            </p>
        </form>
    )
}

export default UserForm;
