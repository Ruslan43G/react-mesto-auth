import React from 'react';
import { Link } from 'react-router-dom';

export default function FormAuth (props)  {
    function handleEmailInput (evt) {
        props.setEmail(evt.target.value);
    }

    function handlePasswordInput (evt) {
        props.setPassword(evt.target.value);
    }

    function submitHandler (evt) {
        evt.preventDefault();
        props.onSubmit();
    }

    return (
        <form className='form' onSubmit={submitHandler}>
            <h3 className='form__title'>{props.title}</h3>
            <div className='form__input-raw'>
                <input onChange={handleEmailInput} type='email' className='form__input' placeholder='Email' required></input>
                <input onChange={handlePasswordInput} type='password'className='form__input' placeholder='Пароль' required></input>
            </div>
            <button className='form__submit' type='submit'>{props.isLoading ? `Загрузка...` : props.buttonText}</button>
            <Link className='form__link' to={props.route}>
                {props.linkText}
            </Link>
        </form>
    )
} 