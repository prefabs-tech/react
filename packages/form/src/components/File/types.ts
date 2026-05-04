import type { DropzoneOptions } from "react-dropzone";

import { IButtonProperties } from "@prefabs.tech/react-ui";

export interface FileExtended extends File {
  description?: string;
}

export type FileInputMethod = "button" | "dropzone";
export type FileMode = "append" | "update";

export interface IFileAttachBasicProperties extends Omit<
  IFileInputBasicProperties,
  | "dropzoneMessage"
  | "inputButtonLabel"
  | "inputButtonLabelSelected"
  | "inputMethod"
  | "label"
  | "selectedFileDisplay"
> {
  selectedFileDisplay?: "none" | "popup";
}

export interface IFileDropzoneBasicProperties {
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  dropzoneMessage?: string;
  dropzoneOptions?: DropzoneOptions;
  enableDescription?: boolean;
  errorMessages?: {
    default?: string;
    fileInvalidType?: string;
    fileTooLarge?: string;
    fileTooSmall?: string;
    tooManyFiles?: string;
  };
  label?: string;
  mode?: FileMode;
  multiple?: boolean;
  name: string;
  onChange: (files: FileExtended[]) => void;
  value?: FileExtended[];
}

export type IFileDropzoneProperties = Omit<
  IFileDropzoneBasicProperties,
  "onChange" | "value"
>;

export interface IFileInputBasicProperties extends IFileDropzoneBasicProperties {
  /**
   * @deprecated deprecated as Overlay is removed.
   */
  emptySelectionMessage?: string;
  inputButtonLabel?: string;
  inputButtonLabelSelected?: string;
  inputMethod?: FileInputMethod;
  selectButtonProps?: IButtonProperties;
  /**
   * @deprecated deprecated as Overlay is removed.
   */
  selectedFileDisplay?: "list" | "none" | "popup";
}

export type IFileInputProperties = IFileInputBasicProperties;

export interface IFileUploadProperties extends Omit<
  IFileDropzoneBasicProperties,
  "onChange"
> {
  actionsAlignment?: "left" | "right";
  cancelButtonOptions?: IButtonProperties;
  onCancel?: () => void;
  onFileSelect?: (files: FileExtended[]) => FileExtended[];
  onUpload: (files: FileExtended[]) => void;
  reverseActionsOrder?: boolean;
  uploadButtonOptions?: IButtonProperties;
}

export type IFormFileInputProperties = Omit<
  IFileInputBasicProperties,
  "onChange" | "value"
>;
