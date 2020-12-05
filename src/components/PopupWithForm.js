import React from 'react';

export default function PopupWithForm (props) {

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
        <section className={props.isOpen ? `popup ${props.name} popup_opened` : `popup ${props.name}`} onClick={overlayClickHandler}>
            <form onSubmit={props.onSubmit} className='popup__container' id={props.name} noValidate>
                <button className="popup__icon-close" onClick={props.onClose} type="reset"></button>
                <h3 className="popup__title popup__title_form">{props.title}</h3>
                {props.children}
                <button disabled={props.buttonState} className={props.buttonState ? 'popup__button popup__button_form popup__button_disabled' : 'popup__button popup__button_form'} id="profile-save-button" type="submit" aria-label="Сохранить">{props.isLoading ? 'Загрузка...' : props.buttonText}</button>
            </form>
        </section>
    )
}