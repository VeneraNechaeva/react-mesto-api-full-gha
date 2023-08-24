import Popup from "./Popup";

function PopupWithForm({ popupName, isOpen, onClose, classText, title, name, children, buttonText, onSubmit, isSubmitEnable }) {
    
    return (
        <Popup isOpen={isOpen} popupName={popupName} onClose={onClose} children={children}>
                <h2 className={`popup__${classText}`}>{title}</h2>
                <form className="popup__form" name={name} noValidate="" onSubmit={onSubmit} >
                    {children}
                    <button className={`popup__button ${isSubmitEnable ? "" : "popup__button_disabled"}`}
                     type="submit" disabled={isSubmitEnable ? "" : "disabled"}>
                        {buttonText}
                    </button >
                </form>
        </Popup>
    )
}

export default PopupWithForm;