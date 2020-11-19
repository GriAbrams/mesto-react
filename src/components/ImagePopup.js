export default function ImagePopup(props) {
  return (
    <div className={`popup popup_action_opened-img ${props.isOpen ? 'popup_action_opened' : ''}`}>
      <div className="popup__container popup__container_opened-img">
        <img src={props.isOpen ? props.card.link : ''} alt={props.isOpen ? props.card.name : ''} className="popup__img" />
        <h2 className="popup__title popup__title_opened-img">{props.isOpen ? props.card.name : ''}</h2>
        <button className="popup__btn popup__btn_action_close" aria-label="Закрыть окно" onClick={props.onClose}></button>
      </div>
    </div>
  );
}