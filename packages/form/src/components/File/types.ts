import { IButtonProperties } from "@prefabs.tech/react-ui";

import type { DropzoneOptions } from "react-dropzone";

export interface FileExtended extends File {
  description?: string;
}

export type FileMode = "update" | "append";
export type FileInputMethod = "button" | "dropzone";

export interface IFileDropzoneBasicProperties {
  name: string;
  label?: string;
  multiple?: boolean;
  mode?: FileMode;
  value?: FileExtended[];
  enableDescription?: boolean;
  addDescriptionLabel?: string;
  descriptionPlaceholder?: string;
  dropzoneMessage?: string;
  dropzoneOptions?: DropzoneOptions;
  errorMessages?: {
    default?: string;
    fileInvalidType?: string;
    fileTooLarge?: string;
    fileTooSmall?: string;
    tooManyFiles?: string;
  };
  onChange: (files: FileExtended[]) => void;
}

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

export type IFileDropzoneProperties = Omit<
  IFileDropzoneBasicProperties,
  "value" | "onChange"
>;

export interface IFileInputBasicProperties extends IFileDropzoneBasicProperties {
  inputButtonLabel?: string;
  inputButtonLabelSelected?: string;
  inputMethod?: FileInputMethod;
  selectButtonProps?: IButtonProperties;
  /**
   * @deprecated deprecated as Overlay is removed.
   */
  emptySelectionMessage?: string;
  /**
   * @deprecated deprecated as Overlay is removed.
   */
  selectedFileDisplay?: "list" | "popup" | "none";
}

export type IFileInputProperties = IFileInputBasicProperties;

export type IFormFileInputProperties = Omit<
  IFileInputBasicProperties,
  "value" | "onChange"
>;

export interface IFileAttachBasicProperties extends Omit<
  IFileInputBasicProperties,
  | "inputMethod"
  | "label"
  | "dropzoneMessage"
  | "selectedFileDisplay"
  | "inputButtonLabel"
  | "inputButtonLabelSelected"
> {
  selectedFileDisplay?: "popup" | "none";
}
