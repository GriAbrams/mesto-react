export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_action_${props.name} ${props.isOpen ? 'popup_action_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>
        <form action="#" className={`popup__form popup__form_${props.name}`} name={props.name} noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__btn popup__btn_action_save">{props.buttonText}</button>
        </form>
        <button className="popup__btn popup__btn_action_close" aria-label="Закрыть окно" onClick={props.onClose}></button>
      </div>
    </div>
  )
}