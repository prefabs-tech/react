import React, { ComponentProps, FC } from "react";

import type { IFile } from "..";

import { ConfirmationModal } from "..";

type ConfirmationFileActionsType = {
  archiveConfirmationHeader?: string;
  archiveConfirmationMessage?: string;
  archiveConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  deleteConfirmationHeader?: string;
  deleteConfirmationMessage?: string;
  deleteConfirmationProps?: ComponentProps<typeof ConfirmationModal>;
  file: IFile;
  onArchive?: (arguments_: IFile) => Promise<void> | void;
  onDelete?: (arguments_: IFile) => Promise<void> | void;
  setVisibleArchiveConfirmation: (isVisible: boolean) => void;
  setVisibleDeleteConfirmation: (isVisible: boolean) => void;
  visibleArchiveConfirmation: boolean;
  visibleDeleteConfirmation: boolean;
};

const ConfirmationFileActions: FC<ConfirmationFileActionsType> = ({
  archiveConfirmationHeader,
  archiveConfirmationMessage,
  archiveConfirmationProps,
  deleteConfirmationHeader,
  deleteConfirmationMessage,
  deleteConfirmationProps,
  file,
  onArchive,
  onDelete,
  setVisibleArchiveConfirmation,
  setVisibleDeleteConfirmation,
  visibleArchiveConfirmation,
  visibleDeleteConfirmation,
}) => {
  return (
    <>
      <ConfirmationModal
        accept={async () => {
          await onArchive?.(file);

          setVisibleArchiveConfirmation(false);
        }}
        header={archiveConfirmationHeader || "Archive file?"}
        message={
          archiveConfirmationMessage ||
          "Are you sure you want to archive this file?"
        }
        onHide={() => {
          setVisibleArchiveConfirmation(false);
        }}
        reject={() => {
          setVisibleArchiveConfirmation(false);
        }}
        visible={visibleArchiveConfirmation}
        {...archiveConfirmationProps}
      />
      <ConfirmationModal
        accept={async () => {
          await onDelete?.(file);

          setVisibleDeleteConfirmation(false);
        }}
        header={deleteConfirmationHeader || "Delete file?"}
        message={
          deleteConfirmationMessage ||
          "Are you sure you want to delete this file?"
        }
        onHide={() => setVisibleDeleteConfirmation(false)}
        reject={() => setVisibleDeleteConfirmation(false)}
        visible={visibleDeleteConfirmation}
        {...deleteConfirmationProps}
      />
    </>
  );
};

export default ConfirmationFileActions;
