import "./NavTab.css";

function NavTab() {
  return (
    <nav className="project-nav">
      <div className="project-nav__container">
        <div className="project-nav__list">
          <a className="project-nav__link" href="#about-project">
            О проекте
          </a>
          <a className="project-nav__link" href="#techs">
            Технологии
          </a>
          <a className="project-nav__link" href="#about-me">
            Студент
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavTab;
