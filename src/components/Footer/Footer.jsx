import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__wrapper">
          <p className="footer__copyright">© 2022</p>
          <ul className="footer__menu">
            <li className="footer__links"></li>
            <a
              href="https://practicum.yandex.ru/"
              target="#_blank"
              className="footer__link"
            >
              Яндекс.Практикум
            </a>
            <li className="footer__links">
              <a
                href="https://github.com/Anastasia-Aleksashkina"
                target="#_blank"
                className="footer__link"
              >
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
