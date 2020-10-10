import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function ConfirmDeletePopup (props) {

    function submitHandler (evt) {
        evt.preventDefault();
        props.onSubmit()
    }

    return (
        <PopupWithForm name='popup_delete' buttonState={true} buttonText='Да' title='Вы уверены?' isOpen={props.isOpen} onClose={props.onClose} isLoading={props.isLoading} onSubmit={submitHandler}/>
    )
}
