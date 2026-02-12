import { DialogHTMLAttributes, ReactNode, useEffect, useRef } from "react";

import { Button, IButtonProperties } from "..";

export interface IModalProperties extends DialogHTMLAttributes<HTMLDialogElement> {
  acceptButtonOptions?: IButtonProperties;
  cancelButtonOptions?: IButtonProperties;
  closable?: boolean;
  closeIcon?: string | ReactNode;
  footer?: ReactNode | string;
  header?: ReactNode | string;
  icon?: ReactNode | string;
  message?: ReactNode | string;
  visible?: boolean;
  accept?: () => void;
  onHide?: () => void;
  reject?: () => void;
}

export const ConfirmationModal = ({
  accept,
  acceptButtonOptions,
  reject,
  cancelButtonOptions,
  closable = true,
  closeIcon = "pi pi-times",
  className = "",
  message,
  header,
  icon = "pi pi-exclamation-triangle",
  visible,
  onHide,
  footer,
  children,
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
            variant="textOnly"
            size="small"
            severity="secondary"
            iconLeft={
              typeof closeIcon === "string" ? (
                <i className={closeIcon} />
              ) : (
                closeIcon
              )
            }
            onClick={onHide}
            rounded
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
          variant="outlined"
          severity="secondary"
          onClick={reject || onHide}
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
      ref={dialogReference}
      className={`dz-dialog ${className}`.trimEnd()}
      onClose={onHide}
      {...dialogOptions}
    >
      {renderHeader()}
      {renderContent()}
      {children}
      {renderFooter()}
    </dialog>
  ) : null;
};
