import React from 'react'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import SubmitPopup from './SubmitPopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

export default function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  const [selectedCard, setSelectedCard] = React.useState('');

  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  const [isSubmitPopupOpen, setSubmitPopupOpen] = React.useState(false);
  function handleDeleteClick(card) {
    setSelectedCard(card);
    setSubmitPopupOpen(true);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard('');
    setImagePopupOpen(false);
    setSubmitPopupOpen(false);
  }

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cards]) => {
      setCurrentUser(userData);
      setCards(cards);
    }).catch((err) => console.log(err));
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, isLiked)
    .then((newCard) => {
      const newCards = cards.map((c) => c._id === card._id ? newCard : c);
      setCards(newCards);
    }).catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
    .then(() => {
      const newCards = cards.filter((c) => c !== card);
      setCards(newCards);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function handleUpdateUser(inputValues) {
    api.setUserInfo(inputValues)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function handleUpdateAvatar(userLink) {
    api.editUserAvatar(userLink)
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    }).catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit(inputValues) {
    api.addNewCard(inputValues)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => console.log(err))
  }

  function handleCloseOverlayClick(evt) {
    if (evt.target === evt.currentTarget) { 
      closeAllPopups(); 
    } 
  }

  React.useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups(); 
      }
    }
    document.addEventListener('keydown', handleEscClose);
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    }
  })

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header />
          <Main
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleDeleteClick}
            />
          <Footer />
        </div>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlayClick={handleCloseOverlayClick}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          onOverlayClick={handleCloseOverlayClick}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClick={handleCloseOverlayClick}
        />
        <SubmitPopup 
          card={selectedCard}
          isOpen={isSubmitPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          onOverlayClick={handleCloseOverlayClick}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
          onOverlayClick={handleCloseOverlayClick}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}