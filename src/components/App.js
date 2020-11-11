import React from 'react'
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

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

  const [selectedCard, setSelectedCard] = React.useState(null);
  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
        <Footer />
      </div>
      <PopupWithForm name='edit' title='Редактировать профиль' buttonText='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} children={
        <>
          <label className="popup__label">
            <input type="text" className="popup__input" id="user-name" name="name" placeholder="Ваше имя" minLength="2" maxLength="40" required />
            <span className="popup__input-error" id="user-name-error"></span>
          </label>
          <label className="popup__label">
            <input type="text" className="popup__input" id="about" name="about" placeholder="Расскажите о себе" minLength="2" maxLength="200" required />
            <span className="popup__input-error" id="about-error"></span>
          </label>
        </>
      } />
      <PopupWithForm name='add' title='Новое место' buttonText='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} children={
        <>
          <label className="popup__label">
            <input type="text" className="popup__input" id="place-name" name="name" placeholder="Название" minLength="1" maxLength="30" required />
            <span className="popup__input-error" id="place-name-error"></span>
          </label>
          <label className="popup__label">
            <input type="url" className="popup__input" id="link" name="link" placeholder="Ссылка на картинку" required />
            <span className="popup__input-error" id="link-error"></span>
          </label>
        </>
      } />
      <PopupWithForm name='avatar' title='Обновить аватар' buttonText='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} children={
        <>
        <label className="popup__label">
          <input type="url" className="popup__input" id="link" name="link" placeholder="Ссылка на картинку" required />
          <span className="popup__input-error" id="link-error"></span>
        </label>
        </>
      } />
      <PopupWithForm name='confirm' title='Вы уверены?' buttonText='Да' />
      {selectedCard && (<ImagePopup card={selectedCard} onClose={closeAllPopups} />)}
    </div>
  );
}