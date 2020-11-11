import React from 'react';
import Card from './Card';
import { api } from '../utils/Api';

export default function Main(props) {
  const [userName,setUserName] = React.useState('');
  const [userDescription, setuserDescription] = React.useState('');
  const [userAvatar, setuserAvatar] = React.useState('');
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cards]) => {
        setUserName(userData.name);
        setuserDescription(userData.about);
        setuserAvatar(userData.avatar);
        setCards(cards);
      }).catch((err) => console.log(err));
    }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar-wrapper">
          <img src={userAvatar} alt="Аватар пользователя" className="profile__avatar" />
          <button className="profile__avatar-btn" onClick={props.onEditAvatar}></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <p className="profile__job">{userDescription}</p>
          <button className="profile__btn profile__btn_action_edit" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
        </div>
        <button className="profile__btn profile__btn_action_add" aria-label="Добавить новую карточку" onClick={props.onAddPlace}></button>
      </section>

      <section className="elements">
        {cards.map(card => <Card card={card} key={card._id} onCardClick={props.onCardClick} />)}
      </section>
    </main>
  )
}