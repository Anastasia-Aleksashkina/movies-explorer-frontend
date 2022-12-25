import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Login.css";
import { useFormWithValidation } from "../../hooks/useFormValidation";
import { VALIDATION_CONFIG } from "../../utils/constants";

function Login({ onLogin }) {
  const { values, errors, isValid, handleChange } = useFormWithValidation(
    { email: "", password: "" },
    VALIDATION_CONFIG.LOGIN_DATA
  );

  function handleSubmitForm(e) {
    e.preventDefault();
    onLogin(values);
  }
  return (
    <section className="auth">
      <div className="auth__header">
        <Logo />
        <h1 className="auth__title">Рады видеть!</h1>
      </div>
      <form onSubmit={handleSubmitForm} className="form">
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
          Войти
        </button>
        <p className="form__text">
          Еще не зарегистрированы?
          <Link className="form__link" to="/signin">
            Регистрация
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;
