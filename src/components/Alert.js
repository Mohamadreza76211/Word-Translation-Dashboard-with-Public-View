import React from "react";
import "./styles/Alert.scss";

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert ${type}`} onClick={onClose}>
      <div className="alert-content">
        <span className="alert-message">{message}</span>
        <span className="alert-close">X</span>
      </div>
    </div>
  );
};

export default Alert;
