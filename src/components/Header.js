import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/header/Vector.svg'
//компонент хидер
export default function Header (props) {
    return (
        <header className="header">
          <img className="header__logo" src={logo} alt="логотип сервиса"/>
          {props.loggedIn ? '' : <Link className='header__link' to={`/${props.setLink.link ? 'signin' : 'signup'}`} >{props.setLink.title}</Link>}
          <div className={`header__container ${props.loggedIn ? '' : 'header__container_hidden'}`}>
            <p className='header__email'>{props.email}</p>
            <button className='header__button' type='button' onClick={props.onClick}>Выйти</button>
          </div>
       </header>
    )
}