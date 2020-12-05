import React from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

export default function EitProfilePopup (props) {
    const user = React.useContext(CurrentUserContext);
    
    const [name, setName] = React.useState(user.name);
    const [description, setDescription] = React.useState(user.about);
     //  стейт переменные для валидации
     const [inputNameError, setInputNameError] = React.useState(false);
     const [spanNameText, setSpanNameText] = React.useState('');
     const [inputAboutError, setInputAboutError] = React.useState(false);
     const [spanAboutText, setSpanboutText] = React.useState('');
     const [buttonState, setButtonState] = React.useState(true); 

    React.useEffect(() => {
        setName(user.name);
        setDescription(user.about)
    }, [user])

    function handleNameInput(evt) {
        setName(evt.target.value);
        if (!evt.target.checkValidity()) {
            setInputNameError(true);
            setSpanNameText(evt.target.validationMessage);
            checkButtonState(evt);
        } else {
            setInputNameError(false);
            setSpanNameText('');
            checkButtonState(evt);
        }
    }

    function handleAboutInput(evt) {
        setDescription(evt.target.value);
        if (!evt.target.validity.valid) {
            setInputAboutError(true);
            setSpanboutText(evt.target.validationMessage);
            checkButtonState(evt);
        } else {
            setInputAboutError(false);
            setSpanboutText('');
            checkButtonState(evt);
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onSubmit({
            name: name,
            about: description
        })
    }

    function checkButtonState (evt) {
        if (!evt.target.closest('form').checkValidity()) {
            setButtonState(true);
            return;
        } else {
            setButtonState(false);
        }
    }

    function close () {
        props.onClose();
        setInputAboutError(false);
        setSpanboutText('');
        setInputNameError(false);
        setSpanNameText('');
        setButtonState(true);
        setName(user.name);
        setDescription(user.about);
    }

    return (
        <PopupWithForm name='popup_profile' buttonText='Сохранить' buttonState={buttonState} onSubmit={handleSubmit} title='Редактировать профиль' isOpen={props.isOpen} onClose={close} isLoading={props.isLoading}>
            <>
                <input value={name} onChange={handleNameInput} className={inputNameError ? `popup__input popup__input_type_error` : `popup__input`} id="profile-input-name" name="name" type="text" placeholder="Имя" minLength="2" maxLength="40" pattern="^[А-Яа-яЁёA-Za-z\s-]+$" required />
                <span className={inputNameError ? 'popup__error popup__error_visible' : 'popup__error'} id="profile-input-name-error">{spanNameText}</span>
                <input value={description} onChange={handleAboutInput} className={inputAboutError ? `popup__input popup__input_type_error` : `popup__input`} id="profile-input-about" name="job" type="text" placeholder="О себе" minLength="2" maxLength="200" required />
                <span className={inputAboutError ? 'popup__error popup__error_visible' : 'popup__error'} id="profile-input-about-error">{spanAboutText}</span>
            </>
        </ PopupWithForm>
    )
}