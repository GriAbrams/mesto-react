import React from 'react';
import PopupWithForm from './PopupWithForm';

export default function EditAvatarPopup(props) {
  const avatarRef = React.useRef('');
  const [buttonText, setButtonText] = React.useState('');

  React.useEffect(() => {
    avatarRef.current.value = '';
    setButtonText('Сохранить');
  }, [props.isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    setButtonText('Сохранение...');
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      buttonText={buttonText}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onOverlayClick={props.onOverlayClick}
      onSubmit={handleSubmit}
      children={
        <>
        <label className="popup__label">
          <input type="url" className="popup__input" id="link" name="link" placeholder="Ссылка на картинку" required ref={avatarRef} />
          <span className="popup__input-error" id="link-error"></span>
        </label>
        </>
      }
    />
  )
}
