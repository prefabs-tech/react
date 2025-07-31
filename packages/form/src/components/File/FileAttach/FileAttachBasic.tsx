// components/FormComponents/FileAttachBasic.tsx
import { Button } from "@prefabs.tech/react-ui";
import React from "react";
import { useDropzone } from "react-dropzone";

import { useOnDropFile } from "../hooks";

import type { IFileAttachBasicProperties } from "../types";
import type { FC } from "react";

export const FileAttachBasic: FC<IFileAttachBasicProperties> = ({
  name,
  mode = "append",
  multiple = true,
  value = [],
  dropzoneOptions,
  onChange,
  selectButtonProps,
}) => {
  const onDrop = useOnDropFile({ mode, name, onChange, value, multiple });

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    onDrop,
    multiple,
    ...dropzoneOptions,
  });

  const renderInputUi = () => {
    const { onClick } = getRootProps();

    return (
      <div className="input-button-wrapper">
        <Button
          onClick={(event) => {
            event.preventDefault();
            onClick?.(event);
          }}
          {...selectButtonProps}
        />
        <input id={name} name={name} {...getInputProps()} />
      </div>
    );
  };

  return <div className="file-input attach">{renderInputUi()}</div>;
};
