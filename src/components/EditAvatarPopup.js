import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup (props) {
    const avatarRef = React.useRef();

    function handleSubmit (evt) {
        evt.preventDefault();
        props.onSubmit({avatar: avatarRef.current.value});
    }

    //  стейт переменные для валидации
    const [inputError, setInputError] = React.useState(false);
    const [spanText, setSpanText] = React.useState('');
    const [buttonState, setButtonState] = React.useState(true); 

    function onChangeValidation (evt) {
        if (!evt.target.validity.valid) {
            setInputError(true);
            setSpanText(evt.target.validationMessage);
            checkButtonState(evt);
        } else {
            setInputError(false);
            setSpanText('');
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

    function close () {
        props.onClose();
        setSpanText('');
        setInputError(false);
        setButtonState(true);
    }

    return (
        <PopupWithForm buttonState={buttonState} name='popup_avatar' buttonText='Сохранить' onSubmit={handleSubmit} title='Обновить аватар' isOpen={props.isOpen} onClose={close} isLoading={props.isLoading}>
            <>
                <input ref={avatarRef} onChange={onChangeValidation} className={inputError ? `popup__input popup__input_type_error` : `popup__input`} id="avatar-url-input" name="avatar" type="url" placeholder="Введите url" required />
                <span className={inputError ? 'popup__error popup__error_visible' : 'popup__error'} id="avatar-url-input-error">{spanText}</span>
            </>
        </PopupWithForm>  
    )
}