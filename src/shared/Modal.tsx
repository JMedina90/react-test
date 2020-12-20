import React, {
  useState,
  forwardRef,
  useImperativeHandle,
} from "react";
import ReactDom from "react-dom";

const Modal: React.FC<any> = forwardRef(({ children }, ref) => {
  const el = document.getElementById("modal-root"); // The modal is injected in the index.html file. #modal-root div
  const [display, setDisplay] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      openModal: open,
      closeModal: close,
    };
  });

  const open = () => {
    setDisplay(true);
  };

  const close = () => {
    setDisplay(false);
  };

  if (!display) {
    return null;
  }

  return el
    ? ReactDom.createPortal(
        <div className="modal-container">
          <div className="modal-backdrop" onClick={close}></div>
          <div className="modal-box">{children}</div>
        </div>,
        el
      )
    : null;
});

export default Modal;
