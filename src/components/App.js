import React from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup.js';
import ImagePopup from './ImagePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';

function App() {
  // [переменные состояния]
  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: '', _id: ''}); // переменная состояния пользователя
  const [profileIsOpen, setProfileIsOpen] = React.useState(false); // попап профиля
  const [avatarIsOpen, setAvatarIsOpen] = React.useState(false); // попап авата
  const [addCardIsOpen, setAddCardIsOpen] = React.useState(false); // попап добавления карточки
  const [selectedCard, setSelectedCard] = React.useState({        // попап картинки
    isOpen: true,
    link: '',
    name: ''
  });
  const [cards, setCards] = React.useState([]); //массив картчоек
  const [isLoading, setIsLoading] = React.useState(false);

  //эффект при монтировании
  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser({name: userInfo.name, about: userInfo.about, avatar: userInfo.avatar, _id: userInfo._id});
        setCards([...initialCards]);
      })
      .catch(err => console.log(err))
  }, [])
  const [deleteIsOpen, setDeleteIsOpen] = React.useState(false);
  // функция закрытия всех попапов. Переводит переменные состояния в необходимые значения
  function closeAllPopups() {
    setProfileIsOpen(false);
    setAvatarIsOpen(false);
    setAddCardIsOpen(false);
    setDeleteIsOpen(false);
    setSelectedCard({
      ...selectedCard,
      isOpen: true,
    });
    setIsLoading(false);
  }
 // Хэндлеры для открытия попапов
  function handleEditAvatarClick () {
    setAvatarIsOpen(true);
  }

  function handleEditProfileClick () {
    setProfileIsOpen(true);
  }

  function handleAddPlaceClick () {
    setAddCardIsOpen(true);
  }

  function handleCardClick (props) {
    setSelectedCard({
      isOpen: false,
      link: props.link,
      name: props.name
    });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser({...currentUser, name: res.name, about: res.about});
        closeAllPopups();  
      })
      .catch(err => console.log(err));
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser({...currentUser, avatar: res.avatar});
        closeAllPopups();
      })
      .catch(err => console.log(err));
  }
  //функция снять поставить лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api.handleLike(card._id, isLiked)
        .then((newCard) => {
            const newCards = cards.map(item => item._id === card._id ? newCard : item);
            setCards(newCards);
        })
        .catch(err => console.log(err));    
}
  //функция уалить карточку
  function handleCardDelete (card) {
      api.deleteCard(card._id)
          .then(() => {
              const newCards = cards.filter(item => item._id !== card._id);
              setCards(newCards);
          })
          .catch(err => console.log(err))
  }
  //обработчик сабмит добавления карточки
  function handleCardSubmit(data) {
    setIsLoading(true);
    api.postNewCard(data)
      .then((newCard) => {
        setCards([...cards, newCard]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
  }
  // рендер основной страницы
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header />
        <Main
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete} 
        onEditAvatar={handleEditAvatarClick} 
        onEditProfile={handleEditProfileClick} 
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        />
        <Footer />
        <EditProfilePopup isOpen={profileIsOpen} onClose={closeAllPopups} onSubmit={handleUpdateUser} isLoading={isLoading}/>
        <AddPlacePopup isOpen={addCardIsOpen} onClose={closeAllPopups} onSubmit={handleCardSubmit} isLoading={isLoading}/>
        <EditAvatarPopup isOpen={avatarIsOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar} isLoading={isLoading}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <PopupWithForm name='popup_delete' buttonText='Да' title='Вы уверены?' isOpen={deleteIsOpen} onClose={closeAllPopups} isLoading={isLoading}/>
      </CurrentUserContext.Provider>
      </div> 
  );
}

export default App;
