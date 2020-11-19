import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img src={currentUser.avatar} alt="Аватар пользователя" className="profile__avatar" />
          <button className="profile__avatar-btn" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__job">{currentUser.about}</p>
          <button className="profile__btn profile__btn_action_edit" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__btn profile__btn_action_add" aria-label="Добавить новую карточку" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {props.cards.map(card =>
          <Card
            card={card}
            key={card._id}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
        )}
      </section>
    </main>
  )
}