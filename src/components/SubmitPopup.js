import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function SubmitPopup(props) {
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    setButtonText('Да');
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonText('Удаление...');
    props.onCardDelete(props.card);
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      buttonText={buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onCardDelete={props.onCardDelete}
      onSubmit={handleSubmit}
    />
  )
}