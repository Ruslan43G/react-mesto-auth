import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
//компонент карточки
export default function Card (props) {                                                                       // создаём класс для карточки
    //подписываемся на контекс юзера
    const user = React.useContext(CurrentUserContext);
    //определяем отображение иконки удаления
    const isOwn = props.card.owner === user._id;
    const trashButtonClassName = `${isOwn ? 'elements__trash' : 'elements__trash elements__trash_hidden' }`;
    //определяем отображение лайка
    const isLiked = props.card.likes.some(item => item === user._id);
    const likeButtonClassName = `${isLiked ? 'elements__like elements__like_active' : 'elements__like'}`;
    //хэндлер клика по картинке для открытия попапа
    function handleClick() {
        props.onClick(props.card);
    }
    function handleLikeOnClick () {
        props.onLikeClick(props.card);
    }
    function handleTrashClick() {
        props.onTrashClick(props.card);
    }

    // отрисовка компонента
    return (
        <div className="elements__item" data-owner="">
            <img className="elements__img" onClick={handleClick} src={props.card.link} alt={props.card.name} />
            <button className={trashButtonClassName} onClick={handleTrashClick} type="button"></button>
            <h3 className="elements__title">{props.card.name}</h3>
            <button className={likeButtonClassName} onClick={handleLikeOnClick} type="button"></button>
            <p className="elements__like-counter">{props.card.likes.length}</p>
        </div>
    )

}