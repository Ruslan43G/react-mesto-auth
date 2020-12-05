import React from 'react';
import { Route, Switch, Redirect, useHistory } from 'react-router-dom';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import ImagePopup from './ImagePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmDeletePopup from "./ConfirmDeletePopup";
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import auth from '../utils/Auth';

function App() {
  // [переменные состояния]
  const [currentUser, setCurrentUser] = React.useState({name: '', about: '', avatar: '', _id: ''}); // переменная состояния пользователя
    const [deleteCard, setDeleteCard] = React.useState({});
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

  // Запрос данных о юзере и карточках при монтировании, выполняется 1 раз
  React.useEffect(() => {
    const token = localStorage.getItem('jwt');
    api.setHeaders(token);

    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        setCurrentUser({name: userInfo.user.name || 'Жак-Ив Кусто', about: userInfo.user.about || 'Исследователь океана', avatar: userInfo.user.avatar, _id: userInfo.user._id});
        setCards([...initialCards]);
      })
      .catch(err => console.log(err));

  }, [loggedIn]);

  // Проверка токена и его валидности
  React.useEffect(() => {
    auth.checkToken()
      .then((res) => {
        res.user ? setLoggedIn(true) : setLoggedIn(false);
        setEmail(res.user.email);
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

  // обновить профиль юзера
  function handleUpdateUser(data) {
    setIsLoading(true);
    api.setUserInfo(data)
      .then((res) => {
        setCurrentUser({...currentUser, name: res.name, about: res.about});
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }
  // Обновить аватар юзера
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.setUserAvatar(data)
      .then((res) => {
        setCurrentUser({...currentUser, avatar: res.avatar});
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => setIsLoading(false))
  }
  //функция снять поставить лайк
  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item === currentUser._id);
    api.handleLike(card._id, isLiked)
        .then((newCard) => {
            const newCards = cards.map(item => item._id === card._id ? newCard : item);
            setCards(newCards);
        })
        .catch(err => console.log(err));
}
  // функция открыть попап удаления
  function handleCardDelete (card) {
      setDeleteIsOpen(true);
      setDeleteCard({...card});
  }
  // сабмит удаления карточки
  function deleteCardSubmit () {
      setIsLoading(true)
      api.deleteCard(deleteCard._id)
          .then(() => {
              closeAllPopups();
              const newCards = cards.filter(item => item._id !== deleteCard._id);
              setCards(newCards);
          })
          .catch(err => console.log(err))
          .finally(() => setIsLoading(false))
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
      .finally(() => setIsLoading(false))
  }

  //обработчик сабмита входа пользователя
  function handleLogin (data) {
    setIsLoading(true);
    auth.login({
        password: data.password,
        email: data.email
    })
    .then((res) => {
        localStorage.setItem('jwt', res.token);
        setLoggedIn(true);
        history.push('/')
    })
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false))
}
  // обработчика сабмита выхода пользователя
  function handleLogout () {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
    history.push('/signin');
  }

  // обработчик сабмита регистрации
  function handleRegister (data) {
    setIsLoading(true);
    auth.register({
      password: data.password,
      email: data.email
    })
    .then((res) => {
        setTooltip({
            isOpen: true,
            title: 'Вы успешно зарегистрировались!',
            success: true
        });
        history.push('/');
    })
    .catch((err) => {
        console.log(err);
        setTooltip({
            isOpen: true,
            title: 'Что-то пошло не так! Попробуйте ещё раз.',
            success: false
        });
    })
    .finally(() => setIsLoading(false))
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
            <Login isLoading={isLoading} onSubmit={handleLogin} setLink={setHeaderLink}/>
          </Route>
          <Route path='/signup'>
            <Register isLoading={isLoading} onSubmit={handleRegister} setLink={setHeaderLink}/>
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
        <ConfirmDeletePopup isOpen={deleteIsOpen} onClose={closeAllPopups} isLoading={isLoading} onSubmit={deleteCardSubmit}/>
        <InfoTooltip options={tooltip} onClose={closeAllPopups}/>
      </CurrentUserContext.Provider>
      </div>
  );
}

export default App;
