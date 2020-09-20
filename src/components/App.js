import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
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
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/Auth';

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
  const [deleteIsOpen, setDeleteIsOpen] = React.useState(false);
  const [tooltip, setTooltip] = React.useState({
    isOpen: false,
    title: '',
    success: true
  }); // попап с сообщением о регистрации
  const [cards, setCards] = React.useState([]); //массив картчоек
  const [isLoading, setIsLoading] = React.useState(false); //стейт индикатора загрузки
  const [loggedIn, setLoggedIn] = React.useState(false); // стейт авторизации
  const [email, setEmail] = React.useState('');
  const [headerLink, setHeaderLink] = React.useState({title: '', link: true});

  const history = useHistory();

  //эффект при монтировании
  React.useEffect(() => {

    Promise.all([api.getUserInfo(), api.getInitialCards(), auth.checkToken()])
      .then(([userInfo, initialCards, token]) => {
        setCurrentUser({name: userInfo.name, about: userInfo.about, avatar: userInfo.avatar, _id: userInfo._id});
        setCards([...initialCards]);
        token.data ? setLoggedIn(true) : setLoggedIn(false);
        setEmail(token.data.email);
        history.push('/');
      })
      .catch(err => console.log(err));

  }, [loggedIn])

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
    setTooltip({
      ...tooltip,
      isOpen: false
    });
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

  function handleLogout () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }
  // рендер основной страницы
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header email={email} loggedIn={loggedIn} setLink={headerLink} onClick={handleLogout}/>
        <Switch>
          <ProtectedRoute exact path='/' 
            loggedIn={loggedIn}
            component={Main} 
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete} 
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick} 
          />
          <Route path='/signin'>
            <Login setloggedIn={setLoggedIn} setLink={setHeaderLink}/>
          </Route>
          <Route path='/signup'>
            <Register infoTool={setTooltip} setLink={setHeaderLink}/>
          </Route>
          <Route>
            <Redirect to={`/${loggedIn ? '' : 'signin'}`} />
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup isOpen={profileIsOpen} onClose={closeAllPopups} onSubmit={handleUpdateUser} isLoading={isLoading}/>
        <AddPlacePopup isOpen={addCardIsOpen} onClose={closeAllPopups} onSubmit={handleCardSubmit} isLoading={isLoading}/>
        <EditAvatarPopup isOpen={avatarIsOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar} isLoading={isLoading}/>
        <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
        <PopupWithForm name='popup_delete' buttonText='Да' title='Вы уверены?' isOpen={deleteIsOpen} onClose={closeAllPopups} isLoading={isLoading}/>
        <InfoTooltip options={tooltip} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
      </div> 
  );
}

export default App;
