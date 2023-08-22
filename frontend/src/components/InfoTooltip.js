import React from 'react';
import Popup from "./Popup";

function InfoTooltip({ popupName, isOpen, onClose, classIcon, classText, title }) {
    return (
        <Popup isOpen={isOpen} popupName={popupName} onClose={onClose}>
            <div className={`popup__${classIcon}`} />
            <h2 className={`popup__${classText}`}>{title}</h2>
        </Popup>
    )
}

export default InfoTooltip;