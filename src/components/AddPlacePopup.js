import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup (props) {
    const [newCard, setNewCard] = React.useState({name: '', link: ''});

    function handleNameinput(evt) {
        setNewCard({...newCard, name: evt.target.value});
        if (!evt.target.validity.valid) {
            setInputNameError(true);
            setSpanNameText(evt.target.validationMessage);
            setButtonState(false);
        } else {
            setInputNameError(false);
            setSpanNameText('');
            setButtonState(true);
        }
    }

    function handleLinkInput(evt) {
        setNewCard({...newCard, link: evt.target.value});
        if (!evt.target.validity.valid) {
            setInputUrlError(true);
            setSpanUrlText(evt.target.validationMessage);
            checkButtonState(evt);
        } else {
            setInputUrlError(false);
            setSpanUrlText('');
            checkButtonState(evt);
        }
    }

    function checkButtonState (evt) {
        if (!evt.target.closest('form').checkValidity()) {
            setButtonState(true);
            return;
        } else {
            setButtonState(false);
        }
    }


    function handleOnSubmit(evt) {
        evt.preventDefault();
        props.onSubmit(newCard);
        setNewCard({name: '', link: ''});
    }

    const [inputNameError, setInputNameError] = React.useState(false);
    const [spanNameText, setSpanNameText] = React.useState('');
    const [inputUrlError, setInputUrlError] = React.useState(false);
    const [spanUrlText, setSpanUrlText] = React.useState(''); 
    const [buttonState, setButtonState] = React.useState(true); 

    function close () {
        props.onClose();
        setInputUrlError(false);
        setSpanUrlText('');
        setInputNameError(false);
        setSpanNameText('');
        setButtonState(false);
    }

    return (
        <PopupWithForm buttonState={buttonState} name='popup_card' buttonText='Создать' onSubmit={handleOnSubmit} title='Новое место' isOpen={props.isOpen} onClose={close} isLoading={props.isLoading}>
            <>
                <input className={inputNameError ? `popup__input popup__input_type_error` : `popup__input`} onChange={handleNameinput} id="card-name-input" name="name" type="text" placeholder="Название" minLength="1" maxLength="30" required />
                <span className={inputNameError ? 'popup__error popup__error_visible' : 'popup__error'} id="card-name-input-error">{spanNameText}</span>
                <input className={inputUrlError ? `popup__input popup__input_type_error` : `popup__input`} onChange={handleLinkInput} id="card-url-input" name="link" type="url" placeholder="Ссылка на картинку"  required />
                <span className={inputUrlError ? 'popup__error popup__error_visible' : 'popup__error'} id="card-url-input-error">{spanUrlText}</span>
            </>
        </PopupWithForm>
    )
}