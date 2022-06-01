import { createPortal } from "react-dom";
import { useEffect } from "react";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#root");

const Modal = ({ showModal, children }) => {
  useEffect(() => {
    window.addEventListener("keydown", hendelClose);

    return () => {
      window.addEventListener("keydown", hendelClose);
    };
  }, []);

  const hendelClose = (e) => {
    if (e.code === "Escape") {
      return showModal();
    }
    if (e.currentTarget === e.target) {
      return showModal();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={hendelClose}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  showModal: PropTypes.func.isRequired,
};
export default Modal;
