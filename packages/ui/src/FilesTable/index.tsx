import type { ColumnDef } from "@tanstack/react-table";

import React from "react";

import {
  TDataTable as DataTable,
  FileMessages,
  TDataTableProperties,
  TRequestJSON,
  VisibleFileDetails,
} from "../index";
import { DataActionsMenuItem } from "../Table/TableDataActions";

export type FilesTableProperties = Partial<
  Omit<TDataTableProperties<IFile>, "data" | "fetchData" | "visibleColumns">
> & {
  fetchFiles?: (arguments_: TRequestJSON) => void;
  files: Array<IFile>;
  locale?: string;
  messages?: TableMessages;
  onEditDescription?: (arguments_: IFile) => void;
  onFileArchive?: (arguments_: IFile) => void;
  onFileDelete?: (arguments_: IFile) => void;
  onFileDownload?: (arguments_: IFile) => void;
  onFileShare?: (arguments_: IFile) => void;
  onFileView?: (arguments_: IFile) => void;
  visibleColumns?: VisibleFileDetails[];
};

export interface IFile {
  description?: string;
  downloadCount?: number;
  id: number | string;
  lastDownloadedAt?: number;
  originalFileName: string;
  size?: number;
  uploadedAt: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  uploadedBy: any;
}

export type TableMessages = FileMessages & {
  fileSizeHeader?: string;
  searchPlaceholder?: string;
  tableEmpty?: string;
};

export const FilesTable = ({
  className = "table-files",
  columns = [],
  fetchFiles,
  files,
  id = "table-files",
  isLoading,
  locale,
  messages,
  onEditDescription,
  onFileArchive,
  onFileDelete,
  onFileDownload,
  onFileShare,
  onFileView,
  totalRecords,
  visibleColumns = ["originalFileName", "uploadedBy", "uploadedAt", "actions"],
  ...tableProperties
}: FilesTableProperties) => {
  const getActionsItem = () => {
    const actionItems: DataActionsMenuItem[] = [];

    if (onFileArchive) {
      actionItems.push({
        confirmationOptions: {
          header: messages?.archiveConfirmationHeader || "Archive file",
          message:
            messages?.archiveConfirmationMessage ||
            "Are you sure you want to archive this file?",
        },
        icon: "pi pi-book",
        label: messages?.archiveAction || "Archive",
        onClick: (file) => {
          onFileArchive(file);
        },
        requireConfirmationModal: true,
      });
    }

    if (onFileDownload) {
      actionItems.push({
        icon: "pi pi-download",
        label: messages?.downloadAction || "Download",
        onClick: (file) => onFileDownload?.(file),
      });
    }

    if (visibleColumns.includes("description") && onEditDescription) {
      actionItems.push({
        icon: "pi pi-pencil",
        label: messages?.editDescriptionAction || "Edit description",
        onClick: (file) => onEditDescription?.(file),
      });
    }

    if (onFileShare) {
      actionItems.push({
        icon: "pi pi-share-alt",
        label: messages?.shareAction || "Share",
        onClick: (file) => onFileShare?.(file),
      });
    }

    if (onFileView) {
      actionItems.push({
        icon: "pi pi-eye",
        label: messages?.viewAction || "Share",
        onClick: (file) => onFileView?.(file),
      });
    }

    if (onFileDelete) {
      actionItems.push({
        className: "danger",
        confirmationOptions: {
          header: messages?.deleteConfirmationHeader || "Delete file",
          message:
            messages?.deleteConfirmationMessage ||
            "Are you sure you want to delete this file?",
        },
        icon: "pi pi-trash",
        label: messages?.deleteAction || "Delete",
        onClick: (file) => {
          onFileDelete(file);
        },
        requireConfirmationModal: true,
      });
    }

    return actionItems;
  };

  const defaultColumns: Array<ColumnDef<IFile>> = [
    {
      accessorKey: "originalFileName",
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      filterPlaceholder: "Search",
      header: "File",
    },
    {
      accessorKey: "description",
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      filterPlaceholder: "Search",
      header: "Description",
      tooltip: true,
    },
    {
      accessorKey: "size",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: "Min, Max",
      header: "Size",
      meta: {
        filterVariant: "range",
      },
    },
    {
      accessorFn: (row) => {
        if (!row.uploadedBy) {
          return "";
        }

        const { email, givenName, surname } = row.uploadedBy;

        if (givenName || surname) {
          return `${givenName || ""} ${surname || ""}`.trim();
        }

        return email || "";
      },
      cell: ({ getValue }) => {
        const value = getValue();

        return value ? value : <code>&#8212;</code>;
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: "Search",
      header: "Uploaded by",
      id: "uploadedBy",
    },
    {
      accessorKey: "uploadedAt",
      dataType: "datetime",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: "Select date",
      header: "Uploaded at",
      meta: {
        filterVariant: "dateRange",
        serverFilterFn: "between",
      },
    },
    {
      accessorKey: "downloadCount",
      align: "right",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: "Min, Max",
      header: "Download count",
      meta: {
        filterVariant: "range",
      },
    },
    {
      accessorKey: "lastDownloadedAt",
      dataType: "datetime",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: "Select date",
      header: "Last downloaded at",
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
        dataActionsMenu={{
          actions: [...getActionsItem()],
        }}
        emptyTableMessage={messages?.tableEmpty || "The table is empty"}
        fetchData={fetchFiles}
        id={id}
        isLoading={isLoading}
        locale={locale}
        totalRecords={totalRecords}
        visibleColumns={visibleColumns}
        {...tableProperties}
      ></DataTable>
    </>
  );
};
