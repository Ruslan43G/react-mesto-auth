import React from 'react';
// компонент попапа с картинкой
export default function ImagePopup(props) {

    React.useEffect(() => {
        document.addEventListener('keydown', escCloseHandler)

        return () => document.removeEventListener('keydown', escCloseHandler)
    })

    const overlayClickHandler = (evt) => {
        if (evt.target === evt.currentTarget) {
            props.onClose();
        }
    }

    const escCloseHandler = (evt) => {
        if (evt.key === 'Escape') {
            props.onClose()
        }
    }

    return (
        <section className={props.card.isOpen ? `popup popup_image` : `popup popup_image popup_opened`} onClick={overlayClickHandler}>
           <div className="popup__image-container">
                <button className="popup__icon-close popup__icon-close_image" id="close-img-popup" onClick={props.onClose} type="button"></button>
                <img className="popup__image" src={props.card.link} alt={props.card.name} />
                <p className="popup__img-text">{props.card.name}</p>
            </div>
        </section>
    )
}