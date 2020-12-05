# Проектная работа Место с использованием библиотеки React.


### Описание проекта
Данный проект представляет из себя сайт с профилем пользователя и галлереей изображений. На данный момент момент реализованы:
- Регистрация и авторизация пользователей
- Открытие и закрытие модальных окон.
- Редактирование информации о профиле (Имя, описание, Аватар)
- Добавление новых карточки с картинкой и подписью на страницу.
- Удаление карточек по кнопке с подтверждением в модальном окне.
- Лайки карточек.
- Валидация форм.
- Взаимодействие с сервером через API.


Приложение кроссбраузерное, адаптивное и подходит для использования на устрайствах с шириной экрана от 300px.


### Используемые технологии

- Для работы приложения используется React.
- React hooks (useState, useEffect, useContext).
- Для позиционирования элеменотв в основном используется **"Flex-Box"**.
Например блок с картинками. Он растягивается и сжимается, а элементы в нем автоматически переносятся на новые строки и центрируются.
- Для позиционирования попапов используется **"Фиксированное позиционирование"**. Чтобы он располгался поверх всего остального содержимого сайта и при прокутке всегда был по центру. А контейнер в нем позиционируется через **"Flex-Box"**.
- Открытие и закрытие модальных окон, первоначальная закрзука контена (карточек с фотографиями и подписью), добавление новых карточек, их удаление и возможность поставить "лайк", а также доабавление информации, введенной в текстовые поля, на страницу профиля и валидация введенных данных реализованы с помощью **"JavaScript"**.
- JavaScript код объектно ориентирован.
- Вся информация о профиле и о карточках приходит с сервера и обрабатывает JavaScript.
- Серверное API также написано мной на node.js (express, mongoose).
- Информация хранится в mongoDB

Для запуска проекта необходимо скачать все файлы из репозитория, установить node.js, в папке с проектом прописать команду npm install.
После установки пакетов запустить режим разработки командой npm start.
Готовую сборку можно получить командой npm run build.

### Ссылка на проект


