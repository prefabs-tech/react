import { ComponentProps, ReactNode, useState } from "react";

import { Card, ConfirmationModal, formatDate, formatDateTime } from "..";
import ConfirmationFileActions from "./ConfirmationFileActions";
import { Button } from "../Buttons/ButtonBasic";
import { IFile } from "../FilesTable";
import { useColumnsMap } from "../utils";

export type FileMessages = {
  archiveAction?: string;
  archiveConfirmationHeader?: string;
  archiveConfirmationMessage?: string;
  downloadAction?: string;
  editDescriptionAction?: string;
  deleteAction?: string;
  deleteConfirmationHeader?: string;
  deleteConfirmationMessage?: string;
  downloadCountHeader?: string;
  lastDownloadedAtHeader?: string;
  renameAction?: string;
  shareAction?: string;
  uploadedByHeader?: string;
  uploadedAtHeader?: string;
  viewAction?: string;
};

export type VisibleFileDetails =
  | "originalFileName"
  | "size"
  | "description"
  | "uploadedBy"
  | "uploadedAt"
  | "downloadCount"
  | "lastDownloadedAt"
  | "actions"
  | string;

type FileCardType = {
  file: IFile;
  messages?: FileMessages;
  onArchive?: (arguments_: IFile) => void;
  archiveButtonProps?: ComponentProps<typeof Button>;
  archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  onDelete?: (arguments_: IFile) => void;
  deleteButtonProps?: ComponentProps<typeof Button>;
  deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  onDownload?: (arguments_: IFile) => void;
  downloadButtonProps?: ComponentProps<typeof Button>;
  onEditDescription?: (arguments_: IFile) => void;
  editDescriptionButtonProps?: ComponentProps<typeof Button>;
  onShare?: (arguments_: IFile) => void;
  shareButtonProps?: ComponentProps<typeof Button>;
  onView?: (arguments_: IFile) => void;
  viewButtonProps?: ComponentProps<typeof Button>;
  renderThumbnail?: (arguments_: IFile) => ReactNode;
  showThumbnail?: boolean;
  visibleFileDetails?: VisibleFileDetails[];
};

export const FileCard = ({
  file,
  messages,
  onArchive,
  archiveButtonProps,
  archiveConfirmationProps,
  onDelete,
  deleteButtonProps,
  deleteConfirmationProps,
  onDownload,
  downloadButtonProps,
  onShare,
  shareButtonProps,
  onView,
  viewButtonProps,
  onEditDescription,
  editDescriptionButtonProps,
  renderThumbnail: pRenderThumbnail,
  showThumbnail = true,
  visibleFileDetails = [
    "originalFileName",
    "size",
    "description",
    "uploadedBy",
    "uploadedAt",
    "downloadCount",
    "lastDownloadedAt",
    "actions",
  ],
}: FileCardType) => {
  const [visibleArchiveConfirmation, setVisibleArchiveConfirmation] =
    useState(false);
  const [visibleDeleteConfirmation, setVisibleDeleteConfirmation] =
    useState(false);

  const renderThumbnail = () => {
    if (!showThumbnail) {
      return null;
    }

    return (
      <div className="file-thumbnail">
        {pRenderThumbnail ? (
          pRenderThumbnail(file)
        ) : (
          <i className="pi pi-file-pdf"></i>
        )}
      </div>
    );
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const checkUploadedByData = (data: any) => {
    if (!data.uploadedBy) {
      return <code>&#8212;</code>;
    }

    if (data.uploadedBy.givenName || data.uploadedBy.lastName) {
      return `${data.uploadedBy.givenName || ""} ${
        data.uploadedBy.lastName || ""
      }`;
    }

    return data.uploadedBy.email;
  };

  const visibleFileDetailsMap = useColumnsMap(visibleFileDetails);

  const renderActions = () => {
    return (
      <div className="file-actions">
        {!!onArchive && (
          <>
            <Button
              size="small"
              iconLeft="pi pi-book"
              label="Archive"
              onClick={() => setVisibleArchiveConfirmation(true)}
              {...archiveButtonProps}
            />
          </>
        )}
        {!!onDelete && (
          <>
            <Button
              size="small"
              iconLeft="pi pi-trash"
              label="Delete"
              onClick={() => setVisibleDeleteConfirmation(true)}
              {...deleteButtonProps}
            />
          </>
        )}
        {!!onDownload && (
          <Button
            size="small"
            iconLeft="pi pi-download"
            label="Download"
            onClick={() => onDownload?.(file)}
            {...downloadButtonProps}
          />
        )}
        {!!onShare && (
          <Button
            size="small"
            iconLeft="pi pi-share-alt"
            label="Share"
            onClick={() => onShare?.(file)}
            {...shareButtonProps}
          />
        )}
        {!!onView && (
          <Button
            size="small"
            iconLeft="pi pi-eye"
            label="View"
            severity="secondary"
            onClick={() => onView?.(file)}
            {...viewButtonProps}
          />
        )}

        <ConfirmationFileActions
          file={file}
          setVisibleArchiveConfirmation={(isVisible) =>
            setVisibleArchiveConfirmation(isVisible)
          }
          setVisibleDeleteConfirmation={(isVisible) =>
            setVisibleDeleteConfirmation(isVisible)
          }
          visibleArchiveConfirmation={visibleArchiveConfirmation}
          visibleDeleteConfirmation={visibleDeleteConfirmation}
          archiveConfirmationProps={archiveConfirmationProps}
          deleteConfirmationProps={deleteConfirmationProps}
          archiveConfirmationHeader={messages?.archiveConfirmationHeader}
          archiveConfirmationMessage={messages?.archiveConfirmationMessage}
          deleteConfirmationHeader={messages?.deleteConfirmationHeader}
          deleteConfirmationMessage={messages?.deleteConfirmationMessage}
          onArchive={onArchive}
          onDelete={onDelete}
        />
      </div>
    );
  };

  return (
    <Card className="file-card">
      <div className="file-thumbnail-details-wrapper">
        {renderThumbnail()}
        <div className="details-wrapper">
          <div className="name-description-details-wrapper">
            <div>
              {visibleFileDetailsMap.originalFileName ? (
                <span className="name">{file.originalFileName}</span>
              ) : null}
              {file.size && visibleFileDetailsMap.size && (
                <span className="file-size">{`(${file?.size})`}</span>
              )}
            </div>

            {file.description && visibleFileDetailsMap.description && (
              <>
                <div className="description-wrapper-details">
                  <span>{file.description}</span>
                  {!!onEditDescription && (
                    <Button
                      iconLeft="pi pi-pencil"
                      size="small"
                      onClick={() => onEditDescription?.(file)}
                      {...editDescriptionButtonProps}
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {visibleFileDetailsMap.uploadedAt ||
          visibleFileDetailsMap.uploadedBy ||
          visibleFileDetailsMap.lastDownloadedAt ||
          visibleFileDetailsMap.downloadCount ? (
            <div className="file-upload-download-details-wrapper">
              {visibleFileDetailsMap.uploadedAt ||
              visibleFileDetailsMap.uploadedBy ? (
                <div className="file-upload-details">
                  {visibleFileDetailsMap.uploadedBy ? (
                    <div className="uploaded-by">
                      <span>{messages?.uploadedByHeader || "Uploaded by"}</span>
                      <span>{checkUploadedByData(file)}</span>
                    </div>
                  ) : null}

                  {visibleFileDetailsMap.uploadedAt ? (
                    <div className="uploaded-at">
                      <span>{messages?.uploadedAtHeader || "Uploaded at"}</span>
                      <span>{formatDateTime(file?.uploadedAt)}</span>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {visibleFileDetailsMap.downloadCount ||
              visibleFileDetailsMap.lastDownloadedAt ? (
                <div className="file-download-details">
                  {visibleFileDetailsMap.downloadCount ? (
                    <div className="download-count">
                      {(file?.downloadCount || file?.downloadCount === 0) && (
                        <>
                          <span>
                            {messages?.downloadCountHeader || "Downloads:"}
                          </span>
                          <span>{file?.downloadCount}</span>
                        </>
                      )}
                    </div>
                  ) : null}

                  {visibleFileDetailsMap.lastDownloadedAt ? (
                    <div className="last-downloaded-at">
                      {file.lastDownloadedAt && (
                        <>
                          <span>
                            {messages?.lastDownloadedAtHeader ||
                              "Last download:"}
                          </span>
                          <span>{formatDate(file.lastDownloadedAt)}</span>
                        </>
                      )}
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      {visibleFileDetailsMap.actions ? renderActions() : null}
    </Card>
  );
};
