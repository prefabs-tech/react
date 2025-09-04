import {
  FilesTable,
  FilesList,
  IFile,
  TableMessages,
  VisibleFileDetails,
} from "..";

import type { ComponentProps, FC } from "react";

export interface IFilesPresentationProperties {
  presentation?: "list" | "table";
  files: Array<IFile>;
  locale?: string;
  messages?: TableMessages;
  onFileArchive?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onEditDescription?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  visibleFileDetails?: VisibleFileDetails[];
  listProps?: Partial<ComponentProps<typeof FilesList>>;
  tableProps?: Partial<ComponentProps<typeof FilesTable>>;
}

export const FilesPresentation: FC<IFilesPresentationProperties> = ({
  presentation = "list",
  files = [],
  locale,
  messages,
  onFileArchive,
  onFileDownload,
  onFileDelete,
  onFileShare,
  onFileView,
  onEditDescription,
  visibleFileDetails,
  listProps,
  tableProps,
}) => {
  if (presentation === "list") {
    return (
      <FilesList
        files={files}
        locale={locale}
        messages={messages}
        onFileArchive={onFileArchive}
        onFileDelete={onFileDelete}
        onFileDownload={onFileDownload}
        onEditDescription={onEditDescription}
        onFileShare={onFileShare}
        onFileView={onFileView}
        visibleFileDetails={visibleFileDetails}
        {...listProps}
      />
    );
  }

  return (
    <FilesTable
      files={files}
      locale={locale}
      messages={messages}
      onFileArchive={onFileArchive}
      onFileDelete={onFileDelete}
      onFileDownload={onFileDownload}
      onEditDescription={onEditDescription}
      onFileShare={onFileShare}
      onFileView={onFileView}
      visibleColumns={visibleFileDetails}
      {...tableProps}
    />
  );
};
