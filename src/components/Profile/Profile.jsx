import "./Profile.css";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import { VALIDATION_ATTRIBUTES } from "../../utils/constants";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext, useEffect } from "react";
import { VALIDATION_CONFIG } from "../../utils/constants";

function Profile({ onUpdateUser, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  const initialValues = {
    name: currentUser.name,
    email: currentUser.email,
  };

  const { values, isValid, errors, handleChange, setIsValid } =
    useFormWithValidation(initialValues, VALIDATION_CONFIG.REGISTER_DATA);

  // Проверка изменения данных и их валидности
  useEffect(() => {
    function checkValidUpdateUser() {
      const isUpdateName = values.name !== currentUser.name;
      const isUpdateEmail = values.email !== currentUser.email;
      const isValidName = VALIDATION_ATTRIBUTES.REGEX.NAME.test(values.name);
      const isValidEmail = VALIDATION_ATTRIBUTES.REGEX.EMAIL.test(values.email);

      (isUpdateName || isUpdateEmail) && isValidName && isValidEmail
        ? setIsValid(true)
        : setIsValid(false);
    }
    checkValidUpdateUser();
  }, [currentUser.email, currentUser.name, setIsValid, values]);

  function clickUpdateButton() {
    onUpdateUser(values).then(() => setIsValid(false));
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <form className="profile__form">
          <label className="profile__label">
            Имя
            <input
              className={`profile__input ${
                errors.name ? "profile__input_error" : ""
              }`}
              required
              type="text"
              name="name"
              minLength="2"
              value={values.name || ""}
              onChange={handleChange}
            />
            <span className="profile__text-error">{errors.name || ""}</span>
          </label>
          <label className="profile__label">
            E-mail
            <input
              className={`profile__input ${
                errors.email ? "profile__input_error" : ""
              }`}
              required
              type="email"
              name="email"
              value={values.email || ""}
              onChange={handleChange}
            /> 
            <span className="profile__text-error">{errors.email || ""}</span>
          </label>
        </form>
        <div className="profile__control">
          <button
            className={
              isValid
                ? "profile__button"
                : "profile__button profile__button_disabled"
            }
            type="button"
            disabled={!isValid}
            onClick={clickUpdateButton}
          >
            Редактировать
          </button>
          <button
            className="profile__button profile__button_red"
            type="button"
            onClick={onLogout}
          >
            Выйти из аккаунта
          </button>
        </div>
      </div>
    </section>
  );
}

export default Profile;
