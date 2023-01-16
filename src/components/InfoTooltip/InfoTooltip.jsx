import "./InfoTooltip.css";

const InfoTooltip = ({ isOpen, onClose, resStatus, resMessage }) => {
  return (
    <div className={`popup ${isOpen ? "popup_visible" : ""}`} onClick={onClose}>
      <div
        className="popup__container"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          className="popup__button-close"
          type="button"
        />
        <div
          className={`popup__res-status ${
            resStatus && "popup__res-status_ok"
          }`}
        />
        <p className="popup__message">{resMessage}</p>
      </div>
    </div>
  );
};

export default InfoTooltip;
