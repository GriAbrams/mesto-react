import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleAddTitle(evt) {
    setName(evt.target.value);
  }

  function handleAddLink(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlace({
      name,
      link
    });
  }


  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      buttonText='Создать'
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <label className="popup__label">
            <input type="text" className="popup__input" id="place-name" name="name" placeholder="Название" minLength="1" maxLength="30" required value={name || ''} onChange={handleAddTitle} />
            <span className="popup__input-error" id="place-name-error"></span>
          </label>
          <label className="popup__label">
            <input type="url" className="popup__input" id="link" name="link" placeholder="Ссылка на картинку" required value={link || ''} onChange={handleAddLink} />
            <span className="popup__input-error" id="link-error"></span>
          </label>
        </>
      }
    />
  )
}