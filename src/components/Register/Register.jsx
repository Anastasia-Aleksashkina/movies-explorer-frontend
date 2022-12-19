import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Register.css";

function Register() {
  return (
    <section className="auth">
      <div className="auth__header">
        <Logo />
        <h1 className="auth__title">Добро пожаловать!</h1>
      </div>
      <form className="form">
        <label className="form__label">
          Имя
          <input
            type="text"
            className="form__input"
            placeholder="Имя"
            value="Настя"
          />
        </label>
        <label className="form__label">
          E-mail
          <input
            type="text"
            className="form__input"
            placeholder="E-mail"
            value="aleksashkina@yandex.ru"
          />
        </label>
        <label className="form__label" placeholder="Пароль">
          Пароль
          <input
            type="password"
            className="form__input form__input_error"
            value="123456789"
            placeholder="Пароль"
          />
          <span className="form__text-error">Что-то пошло не так...</span>
        </label>
        <button className="form__button" type="submit">
          Зарегистрироваться
        </button>
        <p className="form__text">
          Уже зарегистрированы?
          <Link className="form__link" to="/signin">Войти</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
