import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
//основной компонент. Содержит секцию с профилем и карточками.
export default function Main (props) {
    //подписка на контекст юзера
    const user = React.useContext(CurrentUserContext);
    
    //Отрисовка компонента
    return (
        <> 
            <section className="profile">
                <img className="profile__img" src={user.avatar} alt="автар пользователя"/>
                <div className="profile__img-hover" onClick={props.onEditAvatar}></div>
                <div className="profile__info">
                    <h1 className="profile__name">{user.name}</h1>
                    <button className="profile__edit-btn" onClick={props.onEditProfile} type="button"></button>
                    <p className="profile__about">{user.about}</p>
                </div>
                <button className="profile__add-btn" onClick={props.onAddPlace} type="button"></button>
            </section>
            <main className="elements">
                {props.cards.map(item => <Card key={item._id} card={item} onTrashClick={props.onCardDelete} onLikeClick={props.onCardLike} onClick={props.onCardClick} />)}
            </main>
        </>
    )
}

