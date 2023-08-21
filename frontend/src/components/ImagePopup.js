function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_img ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container-img">
                <button className="popup__close-icon" type="button" onClick={onClose} />
                <img className="popup__image"
                    src={card?.link}
                    alt={card?.name} />
                <p className="popup__text">{card?.name}</p>
            </div>
        </div>
    )
}

export default ImagePopup;