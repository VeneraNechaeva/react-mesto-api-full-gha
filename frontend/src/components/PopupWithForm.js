function PopupWithForm({ popupName, isOpen, onClose, classText, title, name, children, buttonText, onSubmit }) {
    
    return (
        <div className={`popup popup_${popupName} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__container">
                <button className="popup__close-icon" type="button" onClick={onClose} />
                <h2 className={`popup__${classText}`}>{title}</h2>
                <form className="popup__form" name={name} noValidate="" onSubmit={onSubmit} >
                    {children}
                    <button className="popup__button" type="submit">
                        {buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;