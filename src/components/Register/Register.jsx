import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Register.css";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import { VALIDATION_CONFIG } from "../../utils/constants";

function Register({ onRegister }) {
  const { values, handleChange, errors, isValid } = useFormWithValidation(
    { name: "", email: "", password: "" },
    VALIDATION_CONFIG.REGISTER_DATA
  );

  function handleSubmitForm(e) {
    e.preventDefault();

    const { name, email, password } = values;
    if (!isValid) return;
    onRegister(name, email, password);
  }

  return (
    <section className="auth">
      <div className="auth__header">
        <Logo />
        <h1 className="auth__title">Добро пожаловать!</h1>
      </div>
      <form onSubmit={handleSubmitForm} className="form">
        <label className="form__label">
          Имя
          <input
            className={`form__input ${errors.name ? "form__input_error" : ""}`}
            placeholder="Имя"
            required
            type="text"
            name="name"
            minLength="2"
            value={values.name || ""}
            onChange={handleChange}
          />
          <span className="form__text-error">{errors.name || ""}</span>
        </label>
        <label className="form__label">
          E-mail
          <input
            className={`form__input ${errors.email ? "form__input_error" : ""}`}
            placeholder="E-mail"
            required
            type="email"
            name="email"
            value={values.email || ""}
            onChange={handleChange}
          />
          <span className="form__text-error">{errors.email || ""}</span>
        </label>
        <label className="form__label" placeholder="Пароль">
          Пароль
          <input
            className={`form__input ${errors.password ? "form__input_error" : ""}`}
            placeholder="Пароль"
            required
            type="password"
            name="password"
            minLength="6"
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="form__text-error">{errors.password || ""}</span>
        </label>
        <button
          className={
            isValid ? "form__button" : "form__button form__button_disabled"
          }
          type="submit"
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
        <p className="form__text">
          Уже зарегистрированы?
          <Link className="form__link" to="/signin">
            Войти
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
