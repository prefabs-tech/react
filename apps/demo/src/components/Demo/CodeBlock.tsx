import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button } from "@prefabs.tech/react-ui";
import React, { useEffect, useRef, useState } from "react";

const COPY_STATES = {
  copied: { icon: "pi pi-check", title: "codeBlock.copyStates.copied" },
  copy: { icon: "pi pi-copy", title: "codeBlock.copyStates.copy" },
  error: {
    icon: "pi pi-exclamation-triangle",
    title: "codeBlock.copyStates.error",
  },
};

export const CodeBlock = ({
  autoFocus = false,
  exampleCode,
  subheader,
  title,
}: {
  autoFocus?: boolean;
  exampleCode: string;
  subheader?: React.ReactNode;
  title?: string;
}) => {
  const [copyState, setCopyState] = useState(COPY_STATES.copy);
  const reference = useRef<HTMLDivElement>(null);

  const [t] = useTranslation("app");

  useEffect(() => {
    if (autoFocus && reference.current) {
      reference.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [autoFocus, reference, exampleCode]);

  const handleCopyClick = () => {
    if (JSON.stringify(copyState) !== JSON.stringify(COPY_STATES.copy)) {
      return;
    }

    navigator.clipboard
      .writeText(exampleCode)
      .then(() => {
        setCopyState(COPY_STATES.copied);

        setTimeout(() => setCopyState(COPY_STATES.copy), 5000);
      })
      .catch((err) => {
        setCopyState(COPY_STATES.error);

        // eslint-disable-next-line no-console
        console.error("Could not copy text: ", err);
      });
  };

  const renderHeader = () => {
    if (!title && !subheader) {
      return null;
    }

    return (
      <header>
        {title ? <h3>{title}</h3> : null}
        {subheader ? subheader : null}
      </header>
    );
  };

  return (
    <div autoFocus={autoFocus} className="code-block" ref={reference}>
      {renderHeader()}

      <pre>
        <code>{exampleCode}</code>
      </pre>

      <div className="actions">
        <Button
          className="copy"
          iconLeft={copyState.icon}
          onClick={handleCopyClick}
          title={t(copyState.title)}
          variant="outlined"
        ></Button>
      </div>
    </div>
  );
};
