import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project">
      <div className="project__container">
        <h3 className="project__title">О проекте</h3>
        <div className="project__description">
          <div className="project__description-block">
            <h4 className="project__description-title">
              Дипломный проект включал 5 этапов
            </h4>
            <p className="project__description-text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="project__description-block">
            <h4 className="project__description-title">
              На выполнение диплома ушло 5 недель
            </h4>
            <p className="project__description-text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="project__scheme">
          <div className="project__scheme-block">
            <div className="project__scheme-progress project__scheme-progress_green">
              1 неделя
            </div>
            <p className="project__scheme-test">Back-end</p>
          </div>
          <div className="project__scheme-block">
            <div className="project__scheme-progress">4 недели</div>
            <p className="project__scheme-test">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
