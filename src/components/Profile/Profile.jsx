import "./Profile.css";

function Profile() {
  return (
    <>
      <section className="profile">
        <div className="profile__container">
          <h2 className="profile__title">Привет, Настя!</h2>
          <form className="profile__form">
            <label className="profile__label">
              Имя
              <input
                className="profile__input"
                type="text"
                name="name"
                value="Настя"
                required
              />
            </label>
            <label className="profile__label">
              E-mail
              <input
                className="profile__input"
                type="email"
                name="email"
                value="aleksashkina@yandex.ru"
                required
              />
            </label>
          </form>
          <div className="profile__control">
            <button className="profile__button" type="button">
              Редактировать
            </button>
            <button
              className="profile__button profile__button_red"
              type="button"
            >
              Выйти из аккаунта
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
