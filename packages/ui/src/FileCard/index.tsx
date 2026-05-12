import { ComponentProps, ReactNode, useState } from "react";

import { Card, ConfirmationModal, formatDate, formatDateTime } from "..";
import { Button } from "../Buttons/ButtonBasic";
import { IFile } from "../FilesTable";
import { useColumnsMap } from "../utils";
import ConfirmationFileActions from "./ConfirmationFileActions";

export type FileMessages = {
  archiveAction?: string;
  archiveConfirmationHeader?: string;
  archiveConfirmationMessage?: string;
  deleteAction?: string;
  deleteConfirmationHeader?: string;
  deleteConfirmationMessage?: string;
  downloadAction?: string;
  downloadCountHeader?: string;
  editDescriptionAction?: string;
  lastDownloadedAtHeader?: string;
  renameAction?: string;
  shareAction?: string;
  uploadedAtHeader?: string;
  uploadedByHeader?: string;
  viewAction?: string;
};

export type VisibleFileDetails =
  | "actions"
  | "description"
  | "downloadCount"
  | "lastDownloadedAt"
  | "originalFileName"
  | "size"
  | "uploadedAt"
  | "uploadedBy"
  | string;

type FileCardType = {
  archiveButtonProps?: ComponentProps<typeof Button>;
  archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  deleteButtonProps?: ComponentProps<typeof Button>;
  deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  downloadButtonProps?: ComponentProps<typeof Button>;
  editDescriptionButtonProps?: ComponentProps<typeof Button>;
  file: IFile;
  locale?: string;
  messages?: FileMessages;
  onArchive?: (arguments_: IFile) => void;
  onDelete?: (arguments_: IFile) => void;
  onDownload?: (arguments_: IFile) => void;
  onEditDescription?: (arguments_: IFile) => void;
  onShare?: (arguments_: IFile) => void;
  onView?: (arguments_: IFile) => void;
  renderThumbnail?: (arguments_: IFile) => ReactNode;
  shareButtonProps?: ComponentProps<typeof Button>;
  showThumbnail?: boolean;
  viewButtonProps?: ComponentProps<typeof Button>;
  visibleFileDetails?: VisibleFileDetails[];
};

export const FileCard = ({
  archiveButtonProps,
  archiveConfirmationProps,
  deleteButtonProps,
  deleteConfirmationProps,
  downloadButtonProps,
  editDescriptionButtonProps,
  file,
  locale,
  messages,
  onArchive,
  onDelete,
  onDownload,
  onEditDescription,
  onShare,
  onView,
  renderThumbnail: pRenderThumbnail,
  shareButtonProps,
  showThumbnail = true,
  viewButtonProps,
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
              iconLeft="pi pi-book"
              label="Archive"
              onClick={() => setVisibleArchiveConfirmation(true)}
              size="small"
              {...archiveButtonProps}
            />
          </>
        )}
        {!!onDelete && (
          <>
            <Button
              iconLeft="pi pi-trash"
              label="Delete"
              onClick={() => setVisibleDeleteConfirmation(true)}
              size="small"
              {...deleteButtonProps}
            />
          </>
        )}
        {!!onDownload && (
          <Button
            iconLeft="pi pi-download"
            label="Download"
            onClick={() => onDownload?.(file)}
            size="small"
            {...downloadButtonProps}
          />
        )}
        {!!onShare && (
          <Button
            iconLeft="pi pi-share-alt"
            label="Share"
            onClick={() => onShare?.(file)}
            size="small"
            {...shareButtonProps}
          />
        )}
        {!!onView && (
          <Button
            iconLeft="pi pi-eye"
            label="View"
            onClick={() => onView?.(file)}
            severity="secondary"
            size="small"
            {...viewButtonProps}
          />
        )}

        <ConfirmationFileActions
          archiveConfirmationHeader={messages?.archiveConfirmationHeader}
          archiveConfirmationMessage={messages?.archiveConfirmationMessage}
          archiveConfirmationProps={archiveConfirmationProps}
          deleteConfirmationHeader={messages?.deleteConfirmationHeader}
          deleteConfirmationMessage={messages?.deleteConfirmationMessage}
          deleteConfirmationProps={deleteConfirmationProps}
          file={file}
          onArchive={onArchive}
          onDelete={onDelete}
          setVisibleArchiveConfirmation={(isVisible) =>
            setVisibleArchiveConfirmation(isVisible)
          }
          setVisibleDeleteConfirmation={(isVisible) =>
            setVisibleDeleteConfirmation(isVisible)
          }
          visibleArchiveConfirmation={visibleArchiveConfirmation}
          visibleDeleteConfirmation={visibleDeleteConfirmation}
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
                      onClick={() => onEditDescription?.(file)}
                      size="small"
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
                      <span>{formatDateTime(file?.uploadedAt, locale)}</span>
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
                          <span>
                            {formatDate(file.lastDownloadedAt, locale)}
                          </span>
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
