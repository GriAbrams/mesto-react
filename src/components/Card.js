export default function Card(props) {
  
  function handleClick() {
    props.onCardClick(props.card);
  }

  return (
    <div className="card">
      <button className="card__btn card__btn_action_delete" aria-label="Удалить карточку"></button>
      <img className="card__img" src={props.card.link} alt={props.card.name} onClick={handleClick} />
      <div className="card__descr">
        <h2 className="card__title">{props.card.name}</h2>
        <div className="card__like-wrapper">
          <button className="card__btn card__btn_action_like" aria-label="Поставить лайк"></button>
          <p className="card__like-counter">{props.card.likes.lenght}</p>
        </div>
      </div> 
    </div>
  );
}