import React from 'react';
import logo from '../images/header/Vector.svg'
//компонент хидер
export default function Header () {
    return (
        <header className="header">
           <img className="header__logo" src={logo} alt="логотип сервиса"/>
       </header>
    )
}