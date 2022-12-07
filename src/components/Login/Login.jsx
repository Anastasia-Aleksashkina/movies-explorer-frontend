import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Login.css";

function Login() {
  return (
    <section className="auth">
      <div className="auth__header">
        <Logo />
        <h1 className="auth__title">Рады видеть!</h1>
      </div>
      <form className="form">
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
            className="form__input"
            value="123456789"
            placeholder="Пароль"
          />
        </label>
        <button className="form__button" type="submit">
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
