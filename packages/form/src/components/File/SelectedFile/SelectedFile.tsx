import { Button, Input } from "@prefabs.tech/react-ui";
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";

import { FileExtended } from "../types";

type SelectedFileProperties = {
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  enableDescription?: boolean;
  file: FileExtended;
  index: number;
  onDescriptionChange?: (description?: string) => void;
  onRemove?: () => void;
};

export const SelectedFile: React.FC<SelectedFileProperties> = ({
  addDescriptionLabel,
  descriptionPlaceholder,
  enableDescription = false,
  file,
  index,
  onDescriptionChange,
  onRemove,
}) => {
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [description, setDescription] = useState(file.description || "");

  useEffect(() => {
    if (enableDescription && onDescriptionChange) {
      onDescriptionChange(description);
    }
  }, [enableDescription, description]);

  return (
    <li key={file.name}>
      <div className="info">
        <div className="preview"></div>
        <div className="details">
          <span className={`name name-${index}`} title={file.name}>
            {file.name}
          </span>
          {enableDescription && (
            <div className="description-wrapper">
              {!showDescriptionInput ? (
                <>
                  <div
                    className={`description description-${index}`}
                    onClick={() => {
                      setShowDescriptionInput(true);
                    }}
                    role="button"
                    tabIndex={0}
                    title={file.description}
                  >
                    <span>{description || addDescriptionLabel}</span>
                  </div>
                  <i className="pi pi-pencil"></i>
                </>
              ) : (
                <>
                  <div className="p-inputgroup">
                    <Input
                      autoFocus
                      onBlur={() => {
                        setShowDescriptionInput(false);
                      }}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        setDescription(event.target.value)
                      }
                      onKeyDown={(
                        keyEvent: KeyboardEvent<HTMLInputElement>,
                      ) => {
                        if (keyEvent.key === "Enter") {
                          setShowDescriptionInput(false);
                        }
                      }}
                      placeholder={descriptionPlaceholder}
                      value={description}
                    />
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {!!onRemove && (
        <Button
          iconLeft="pi pi-times"
          onClick={onRemove}
          severity="danger"
          size="small"
          variant="outlined"
        ></Button>
      )}
    </li>
  );
};
