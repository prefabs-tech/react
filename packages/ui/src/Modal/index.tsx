import React from "react";

import { Button } from "../Buttons";

interface ModalProperties {
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  header?: string | JSX.Element;
  onHide: () => void;
  size?: "medium" | "large";
  visible: boolean;
}

const Modal: React.FC<ModalProperties> = ({
  children,
  className = "",
  footer,
  header,
  onHide,
  size = "medium",
  visible = false,
}) => {
  if (!visible) {
    return null;
  }

  const modalClassName = ["dz-modal", className, size].join(" ");

  return (
    <div role="dialog" className="dz-modal-overlay">
      <div className={modalClassName}>
        <div className="dz-modal-header">
          {typeof header === "string" ? (
            <span role="heading">{header}</span>
          ) : (
            header
          )}
          <Button
            className="dz-close-button"
            onClick={onHide}
            rounded
            severity="secondary"
            variant="textOnly"
          >
            <i className="pi pi-times"></i>
          </Button>
        </div>

        <div className="dz-modal-content">{children}</div>
        {footer && <div className="dz-modal-footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
