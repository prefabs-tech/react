import type { ComponentProps, FC } from "react";

import {
  FilesList,
  FilesTable,
  IFile,
  TableMessages,
  VisibleFileDetails,
} from "..";

export interface IFilesPresentationProperties {
  files: Array<IFile>;
  listProps?: Partial<ComponentProps<typeof FilesList>>;
  locale?: string;
  messages?: TableMessages;
  onEditDescription?: (arguments_: IFile) => void;
  onFileArchive?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  presentation?: "list" | "table";
  tableProps?: Partial<ComponentProps<typeof FilesTable>>;
  visibleFileDetails?: VisibleFileDetails[];
}

export const FilesPresentation: FC<IFilesPresentationProperties> = ({
  files = [],
  listProps,
  locale,
  messages,
  onEditDescription,
  onFileArchive,
  onFileDelete,
  onFileDownload,
  onFileShare,
  onFileView,
  presentation = "list",
  tableProps,
  visibleFileDetails,
}) => {
  if (presentation === "list") {
    return (
      <FilesList
        files={files}
        locale={locale}
        messages={messages}
        onEditDescription={onEditDescription}
        onFileArchive={onFileArchive}
        onFileDelete={onFileDelete}
        onFileDownload={onFileDownload}
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
      onEditDescription={onEditDescription}
      onFileArchive={onFileArchive}
      onFileDelete={onFileDelete}
      onFileDownload={onFileDownload}
      onFileShare={onFileShare}
      onFileView={onFileView}
      visibleColumns={visibleFileDetails}
      {...tableProps}
    />
  );
};
