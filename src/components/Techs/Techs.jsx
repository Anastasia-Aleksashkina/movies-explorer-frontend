import "./Techs.css";

function Techs() {
  return (
    <section className="technology">
      <div className="technology__container">
        <h3 className="technology__title">Технологии</h3>
        <h2 className="technology__subtitle">7 технологий</h2>
        <p className="technology__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="technology__list">
          <li className="technology__value">HTML</li>
          <li className="technology__value">CSS</li>
          <li className="technology__value">JS</li>
          <li className="technology__value">React</li>
          <li className="technology__value">Git</li>
          <li className="technology__value">Express.js</li>
          <li className="technology__value">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
