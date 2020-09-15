import React from 'react';
// компонент попапа с картинкой
export default function ImagePopup(props) {
    return (
        <section className={props.card.isOpen ? `popup popup_image` : `popup popup_image popup_opened`}>
           <div className="popup__image-container">
                <button className="popup__icon-close popup__icon-close_image" id="close-img-popup" onClick={props.onClose} type="button"></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <p className="popup__img-text">{props.card.name}</p>
            </div>
        </section>
    )
}