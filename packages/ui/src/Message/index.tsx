import { ReactNode, useState } from "react";

type MessageProperties = {
  enableClose?: boolean;
  icon?: ReactNode;
  message: ReactNode | string[];
  onClose?: () => void;
  severity?: "danger" | "info" | "success" | "tip" | "warning";
  showIcon?: boolean;
};

const Message = ({
  enableClose = true,
  icon,
  message,
  onClose,
  severity = "info",
  showIcon = true,
}: MessageProperties) => {
  const [showMessage, setShowMessage] = useState(true);

  const defaultSeverityIcons = {
    danger: "pi pi-exclamation-triangle",
    info: "pi pi-info-circle",
    success: "pi pi-check-circle",
    tip: "pi pi-lightbulb",
    warning: "pi pi-exclamation-triangle",
  };

  const handleClose = () => {
    setShowMessage(false);

    if (onClose) {
      onClose();
    }
  };

  if (!showMessage) {
    return null;
  }

  const renderIcon = () => {
    return (
      <span className="icon" data-testid="icon">
        {!icon ? (
          <i className={defaultSeverityIcons[severity]} />
        ) : typeof icon === "string" ? (
          <i className={icon} />
        ) : (
          icon
        )}
      </span>
    );
  };

  const renderMessageContent = () => {
    if (typeof message === "string") {
      return <span>{message}</span>;
    }

    if (Array.isArray(message)) {
      return (
        <ul>
          {message.map((message_, index) => (
            <li key={index}>{message_}</li>
          ))}
        </ul>
      );
    }

    return message;
  };

  return (
    <div className={`message ${severity}`}>
      {showIcon && renderIcon()}
      <div className="message-content">{renderMessageContent()}</div>
      {enableClose && (
        <span className="close-message" onClick={handleClose}>
          <i className="pi pi-times"></i>
        </span>
      )}
    </div>
  );
};

export default Message;
