import { ComponentProps, ReactNode } from "react";

import {
  ConfirmationModal,
  FileCard,
  FileMessages,
  IFile,
  VisibleFileDetails,
} from "..";
import { Button } from "../Buttons/ButtonBasic";

export type FilesListType = {
  archiveButtonProps?: ComponentProps<typeof Button>;
  archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  deleteButtonProps?: ComponentProps<typeof Button>;
  deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  downloadButtonProps?: ComponentProps<typeof Button>;
  editDescriptionButtonProps?: ComponentProps<typeof Button>;
  files: IFile[];
  locale?: string;
  messages?: FileMessages;
  onEditDescription?: (arguments_: IFile) => void;
  onFileArchive?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  renderFileThumbnail?: (arguments_: IFile) => ReactNode;
  shareButtonProps?: ComponentProps<typeof Button>;
  showFileThumbnail?: boolean;
  viewButtonProps?: ComponentProps<typeof Button>;
  visibleFileDetails?: VisibleFileDetails[];
};

export const FilesList = ({
  archiveButtonProps,
  archiveConfirmationProps,
  deleteButtonProps,
  deleteConfirmationProps,
  downloadButtonProps,
  editDescriptionButtonProps,
  files,
  locale,
  messages,
  onEditDescription,
  onFileArchive,
  onFileDelete,
  onFileDownload,
  onFileShare,
  onFileView,
  renderFileThumbnail,
  shareButtonProps,
  showFileThumbnail,
  viewButtonProps,
  visibleFileDetails,
}: FilesListType) => {
  return (
    <div className="file-list-wrapper">
      {files.map((file: IFile) => {
        return (
          <FileCard
            archiveButtonProps={archiveButtonProps}
            archiveConfirmationProps={archiveConfirmationProps}
            deleteButtonProps={deleteButtonProps}
            deleteConfirmationProps={deleteConfirmationProps}
            downloadButtonProps={downloadButtonProps}
            editDescriptionButtonProps={editDescriptionButtonProps}
            file={file}
            key={file.originalFileName}
            locale={locale}
            messages={messages}
            onArchive={onFileArchive}
            onDelete={onFileDelete}
            onDownload={onFileDownload}
            onEditDescription={onEditDescription}
            onShare={onFileShare}
            onView={onFileView}
            renderThumbnail={renderFileThumbnail}
            shareButtonProps={shareButtonProps}
            showThumbnail={showFileThumbnail}
            viewButtonProps={viewButtonProps}
            visibleFileDetails={visibleFileDetails}
          />
        );
      })}
    </div>
  );
};
