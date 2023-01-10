import "./AboutMe.css";
import photo from "../../images/photo.jpeg";
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <div className="about-me__container">
        <h3 className="about-me__title">Студент</h3>
        <div className="about-me__wrapper">
          <div className="about-me__description">
            <p className="about-me__name">Анастасия</p>
            <p className="about-me__profession">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__text">
              Я родилась в небольшом городе Брянской области, с 2009 года живу в
              Москве, где закончила факультет государственного и муниципального
              управления в ГУУ. С 2020 года я работаю продакт менеджером в IT.
              Последние пару лет мне было очень интересно самой разобраться в
              разработке веб-сайтов, изучить работу разработчиков изнутри,
              начать говорить с ними на одном языке, поэтому я прошла курс по
              веб-разработке в Яндекс Практикуме.
            </p>
            <a
              className="about-me__link"
              href="https://github.com/Anastasia-Aleksashkina"
              target="#_blank"
            >
              Github
            </a>
          </div>
          <img className="about-me__photo" src={photo} alt="Моя фотограяи" />
        </div>
        <Portfolio />
      </div>
    </section>
  );
}

export default AboutMe;
