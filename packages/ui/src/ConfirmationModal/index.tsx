import { DialogHTMLAttributes, ReactNode, useEffect, useRef } from "react";

import { Button, IButtonProperties } from "..";

export interface IModalProperties extends DialogHTMLAttributes<HTMLDialogElement> {
  accept?: () => void;
  acceptButtonOptions?: IButtonProperties;
  cancelButtonOptions?: IButtonProperties;
  closable?: boolean;
  closeIcon?: ReactNode | string;
  footer?: ReactNode | string;
  header?: ReactNode | string;
  icon?: ReactNode | string;
  message?: ReactNode | string;
  onHide?: () => void;
  reject?: () => void;
  visible?: boolean;
}

export const ConfirmationModal = ({
  accept,
  acceptButtonOptions,
  cancelButtonOptions,
  children,
  className = "",
  closable = true,
  closeIcon = "pi pi-times",
  footer,
  header,
  icon = "pi pi-exclamation-triangle",
  message,
  onHide,
  reject,
  visible,
  ...dialogOptions
}: IModalProperties) => {
  const dialogReference = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (visible) {
      dialogReference.current?.showModal();
    } else {
      dialogReference.current?.close();
    }
  }, [visible]);

  const renderHeader = () => {
    if (!header && !closable) {
      return null;
    }

    return (
      <div className="dz-dialog-header">
        {typeof header === "string" ? (
          <span className="title">{header}</span>
        ) : (
          header
        )}
        {closable && (
          <Button
            data-testid="close-button"
            iconLeft={
              typeof closeIcon === "string" ? (
                <i className={closeIcon} />
              ) : (
                closeIcon
              )
            }
            onClick={onHide}
            rounded
            severity="secondary"
            size="small"
            variant="textOnly"
          />
        )}
      </div>
    );
  };

  const renderFooter = () => {
    if (footer) {
      return footer;
    }

    return (
      <div className="dz-dialog-footer">
        <Button
          label="No"
          onClick={reject || onHide}
          severity="secondary"
          variant="outlined"
          {...cancelButtonOptions}
        />
        <Button
          label="Yes"
          onClick={accept || onHide}
          {...acceptButtonOptions}
        />
      </div>
    );
  };

  const renderContent = () => {
    return (
      <p className="dz-dialog-content">
        {typeof icon === "string" ? (
          <i className={icon} style={{ fontSize: "2rem" }} />
        ) : (
          icon
        )}
        {message}
      </p>
    );
  };

  return visible ? (
    <dialog
      className={`dz-dialog ${className}`.trimEnd()}
      onClose={onHide}
      ref={dialogReference}
      {...dialogOptions}
    >
      {renderHeader()}
      {renderContent()}
      {children}
      {renderFooter()}
    </dialog>
  ) : null;
};
