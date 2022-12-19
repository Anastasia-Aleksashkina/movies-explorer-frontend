import { useHistory } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  const history = useHistory();

  function handleClick() {
    history.goBack();
  }

  return (
    <div className="not-found">
      <div className="not-found__text">
        <p className="not-found__title">404</p>
        <p className="not-found__subtitle">Страница не найдена</p>
      </div>
      <button
        className="not-found__back-button"
        onClick={handleClick}
        type="button"
      >
        Назад
      </button>
    </div>
  );
}

export default NotFound;
