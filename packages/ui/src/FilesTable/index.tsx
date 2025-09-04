import React from "react";

import {
  TDataTable as DataTable,
  FileMessages,
  TDataTableProperties,
  TRequestJSON,
  VisibleFileDetails,
  formatDateTime,
} from "../index";
import { DataActionsMenuItem } from "../Table/TableDataActions";

import type { ColumnDef } from "@tanstack/react-table";

export type TableMessages = {
  searchPlaceholder?: string;
  tableEmpty?: string;
  fileSizeHeader?: string;
} & FileMessages;

export interface IFile {
  id: number | string;
  originalFileName: string;
  description?: string;
  size?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadedBy: any;
  uploadedAt: number;
  downloadCount?: number;
  lastDownloadedAt?: number;
}

export type FilesTableProperties = Partial<
  Omit<TDataTableProperties<IFile>, "data" | "visibleColumns" | "fetchData">
> & {
  files: Array<IFile>;
  locale?: string;
  messages?: TableMessages;
  visibleColumns?: VisibleFileDetails[];
  fetchFiles?: (arguments_: TRequestJSON) => void;
  onFileArchive?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onEditDescription?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
};

export const FilesTable = ({
  className = "table-files",
  columns = [],
  id = "table-files",
  isLoading,
  locale,
  files,
  totalRecords,
  fetchFiles,
  messages,
  visibleColumns = ["originalFileName", "uploadedBy", "uploadedAt", "actions"],
  onFileArchive,
  onFileDownload,
  onFileDelete,
  onFileShare,
  onFileView,
  onEditDescription,
  ...tableProperties
}: FilesTableProperties) => {
  const getActionsItem = () => {
    const actionItems: DataActionsMenuItem[] = [];

    if (onFileArchive) {
      actionItems.push({
        label: messages?.archiveAction || "Archive",
        icon: "pi pi-book",
        requireConfirmationModal: true,
        confirmationOptions: {
          header: messages?.archiveConfirmationHeader || "Archive file",
          message:
            messages?.archiveConfirmationMessage ||
            "Are you sure you want to archive this file?",
        },
        onClick: (file) => {
          onFileArchive(file);
        },
      });
    }

    if (onFileDownload) {
      actionItems.push({
        label: messages?.downloadAction || "Download",
        icon: "pi pi-download",
        onClick: (file) => onFileDownload?.(file),
      });
    }

    if (visibleColumns.includes("description") && onEditDescription) {
      actionItems.push({
        label: messages?.editDescriptionAction || "Edit description",
        icon: "pi pi-pencil",
        onClick: (file) => onEditDescription?.(file),
      });
    }

    if (onFileShare) {
      actionItems.push({
        label: messages?.shareAction || "Share",
        icon: "pi pi-share-alt",
        onClick: (file) => onFileShare?.(file),
      });
    }

    if (onFileView) {
      actionItems.push({
        label: messages?.viewAction || "Share",
        icon: "pi pi-eye",
        onClick: (file) => onFileView?.(file),
      });
    }

    if (onFileDelete) {
      actionItems.push({
        label: messages?.deleteAction || "Delete",
        icon: "pi pi-trash",
        className: "danger",
        requireConfirmationModal: true,
        confirmationOptions: {
          header: messages?.deleteConfirmationHeader || "Delete file",
          message:
            messages?.deleteConfirmationMessage ||
            "Are you sure you want to delete this file?",
        },
        onClick: (file) => {
          onFileDelete(file);
        },
      });
    }

    return actionItems;
  };

  const defaultColumns: Array<ColumnDef<IFile>> = [
    {
      accessorKey: "originalFileName",
      header: "File",
      enableColumnFilter: true,
      enableSorting: true,
      enableGlobalFilter: true,
      filterPlaceholder: "Search",
    },
    {
      accessorKey: "description",
      header: "Description",
      tooltip: true,
      enableGlobalFilter: true,
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: "Search",
    },
    {
      accessorKey: "size",
      header: "Size",
      enableSorting: true,
      enableColumnFilter: true,
      filterPlaceholder: "Min, Max",
      meta: {
        filterVariant: "range",
      },
    },
    {
      id: "uploadedBy",
      header: "Uploaded by",
      accessorFn: (row) => {
        if (!row.uploadedBy) {
          return "";
        }

        const { givenName, surname, email } = row.uploadedBy;

        if (givenName || surname) {
          return `${givenName || ""} ${surname || ""}`.trim();
        }

        return email || "";
      },
      cell: ({ getValue }) => {
        const value = getValue();

        return value ? value : <code>&#8212;</code>;
      },
      enableSorting: true,
      enableColumnFilter: true,
      filterPlaceholder: "Search",
    },
    {
      accessorKey: "uploadedAt",
      header: "Uploaded at",
      cell: ({ getValue }) => {
        return formatDateTime(getValue() as number, locale);
      },
      enableSorting: true,
      enableColumnFilter: true,
      filterPlaceholder: "Select date",
      meta: {
        filterVariant: "dateRange",
        serverFilterFn: "between",
      },
    },
    {
      align: "right",
      accessorKey: "downloadCount",
      header: "Download count",
      enableSorting: true,
      enableColumnFilter: true,
      filterPlaceholder: "Min, Max",
      meta: {
        filterVariant: "range",
      },
    },
    {
      accessorKey: "lastDownloadedAt",
      header: "Last downloaded at",
      enableColumnFilter: true,
      enableSorting: true,
      cell: ({ getValue }) => {
        return formatDateTime(getValue() as number, locale);
      },
      filterPlaceholder: "Select date",
      meta: {
        filterVariant: "dateRange",
        serverFilterFn: "between",
      },
    },
  ];

  return (
    <>
      <DataTable
        className={className}
        columns={[...defaultColumns, ...columns]}
        data={files}
        emptyTableMessage={messages?.tableEmpty || "The table is empty"}
        fetchData={fetchFiles}
        id={id}
        isLoading={isLoading}
        totalRecords={totalRecords}
        visibleColumns={visibleColumns}
        dataActionsMenu={{
          actions: [...getActionsItem()],
        }}
        {...tableProperties}
      ></DataTable>
    </>
  );
};
