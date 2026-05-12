import { useEffect, useState } from "react";

interface IProperties {
  appLink: string;
  appName: string;
  hideRedirectionMessage: () => void;
}

export const RedirectionMessage: React.FC<IProperties> = ({
  appLink,
  appName,
  hideRedirectionMessage,
}) => {
  const [countDown, setCountDown] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountDown((previous) => previous - 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (countDown < 0) {
      hideRedirectionMessage();
    }
  }, [countDown]);

  return (
    <div className="redirect-message" role="alert">
      <p>
        Permission denied, did you mean to login into {appName} app? If yes,
        Please click the link below to goto the {appName} app.
      </p>
      <button
        onClick={() => {
          window.location.href = appLink;
        }}
      >
        {appName}
      </button>
      <p>This message will disappear in {countDown}</p>
    </div>
  );
};
