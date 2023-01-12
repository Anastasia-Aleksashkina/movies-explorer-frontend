import './Profile.css';
import { useFormWithValidation } from '../../hooks/useFormValidation';
import { VALIDATION_ATTRIBUTES } from '../../utils/constants';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useEffect } from 'react';
import { VALIDATION_CONFIG } from '../../utils/constants';

function Profile({ onUpdateUser, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, isValid, errors, handleChange, resetForm } = useFormWithValidation(VALIDATION_CONFIG.REGISTER_DATA);

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {}, true);
    }
  }, [currentUser, resetForm]);

  const validUpdateUser =
    (values.name !== currentUser.name || values.email !== currentUser.email) &&
    VALIDATION_ATTRIBUTES.REGEX.NAME.test(values.name) &&
    VALIDATION_ATTRIBUTES.REGEX.EMAIL.test(values.email);

  function clickUpdateButton(e) {
    e.preventDefault();
    if (!isValid) return;
    onUpdateUser(values);
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <form onSubmit={clickUpdateButton} className="profile__form">
          <label className="profile__label">
            Имя
            <input
              className={`profile__input ${errors.name ? 'profile__input_error' : ''}`}
              required
              type="text"
              name="name"
              minLength="2"
              value={values.name || ''}
              onChange={handleChange}
            />
            <span className="profile__text-error">{errors.name || ''}</span>
          </label>
          <label className="profile__label">
            E-mail
            <input
              className={`profile__input ${errors.email ? 'profile__input_error' : ''}`}
              required
              type="email"
              name="email"
              value={values.email || ''}
              onChange={handleChange}
            />
            <span className="profile__text-error">{errors.email || ''}</span>
          </label>
          <button
            className={isValid ? 'profile__button' : 'profile__button profile__button_disabled'}
            type="submit"
            disabled={!validUpdateUser}
          >
            Редактировать
          </button>
        </form>
        <div className="profile__control">
          <button className="profile__button profile__button_red" type="button" onClick={onLogout}>
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
