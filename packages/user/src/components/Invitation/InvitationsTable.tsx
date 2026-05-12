import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  TDataTable as DataTable,
  FilterOption,
  IButtonProperties,
  TableColumnDefinition,
  Tag,
  TDataTableProperties,
  TRequestJSON,
} from "@prefabs.tech/react-ui";
import { toast } from "react-toastify";

import {
  deleteInvitation,
  resendInvitation,
  revokeInvitation,
} from "@/api/invitation";
import { useConfig } from "@/hooks";
import { DeleteInvitationResponse } from "@/types/invitation";

import type {
  AddInvitationResponse,
  Invitation,
  InvitationAppOption,
  InvitationExpiryDateField,
  InvitationRoleOption,
  ResendInvitationResponse,
  RevokeInvitationResponse,
  UserType,
} from "../../types";

import { InvitationModal } from "./InvitationModal";

export type InvitationsTableProperties = Partial<
  Omit<
    TDataTableProperties<Invitation>,
    "data" | "fetchData" | "visibleColumns"
  >
> & {
  additionalInvitationFields?: AdditionalFormFields;
  appFilterOptions?: FilterOption[];
  apps?: Array<InvitationAppOption>;
  fetchInvitations?: (arguments_: TRequestJSON) => void;
  invitationButtonOptions?: IButtonProperties;
  invitationExpiryDateField?: InvitationExpiryDateField;
  invitations: Array<Invitation>;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  onInvitationDeleted?: (response: DeleteInvitationResponse) => void;
  onInvitationResent?: (data: ResendInvitationResponse) => void;
  onInvitationRevoked?: (data: RevokeInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roleFilterOptions?: FilterOption[];
  roles?: Array<InvitationRoleOption>;
  showAppColumn?: boolean;
  showInviteAction?: boolean;
  statusFilterOptions?: FilterOption[];
  visibleColumns?: VisibleColumn[];
};

type VisibleColumn =
  | "actions"
  | "appId"
  | "email"
  | "expiresAt"
  | "invitedBy"
  | "role"
  | "status"
  | string;

export const InvitationsTable = ({
  additionalInvitationFields,
  appFilterOptions,
  apps,
  className = "table-invitations",
  columns = [],
  fetchInvitations,
  invitationButtonOptions,
  invitationExpiryDateField,
  invitations,
  onInvitationAdded,
  onInvitationDeleted,
  onInvitationResent,
  onInvitationRevoked,
  prepareInvitationData,
  roleFilterOptions,
  roles,
  showInviteAction = true,
  statusFilterOptions,
  totalRecords = 0,
  visibleColumns = [
    "email",
    "appId",
    "role",
    "invitedBy",
    "expiresAt",
    "status",
    "actions",
  ],
  ...tableOptions
}: InvitationsTableProperties) => {
  const config = useConfig();

  const { i18n, t } = useTranslation("invitations");

  const handleResendInvitation = (invitation: Invitation) => {
    resendInvitation(invitation.id, config.apiBaseUrl)
      .then((response) => {
        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          toast.error(t("messages.resend.error"));
        } else {
          toast.success(t("messages.resend.success"));

          if (onInvitationResent) {
            onInvitationResent(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("messages.resend.error"));
      });
  };

  const handleRevokeInvitation = (invitation: Invitation) => {
    revokeInvitation(invitation.id, config.apiBaseUrl)
      .then((response) => {
        if ("data" in response && response.data.status === "ERROR") {
          // TODO better handle errors
          toast.error(t("messages.revoke.error"));
        } else {
          toast.success(t("messages.revoke.success"));

          if (onInvitationRevoked) {
            onInvitationRevoked(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("messages.revoke.error"));
      });
  };

  const handleDeleteInvitation = async (id: number) => {
    deleteInvitation(id, config.apiBaseUrl)
      .then((response) => {
        if ("data" in response && response.data.status === "ERROR") {
          toast.error(t("messages.delete.error"));
        } else {
          toast.success(t("messages.delete.success"));

          if (onInvitationDeleted) {
            onInvitationDeleted(response);
          }
        }
      })
      .catch(() => {
        toast.error(t("messages.delete.error"));
      });
  };

  const isExpired = (date?: Date | number | string) => {
    return !!(date && new Date(date) < new Date());
  };

  const appNameMap = new Map(apps?.map((app) => [app.id, app.name]));

  const defaultColumns: Array<TableColumnDefinition<Invitation>> = [
    {
      accessorKey: "email",
      enableColumnFilter: true,
      enableGlobalFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.searchPlaceholder"),
      header: t("table.defaultColumns.email"),
    },
    {
      accessorKey: "appId",
      align: "left",
      cell: ({ row: { original } }) => {
        return (
          <span>{appNameMap.get(original.appId) || original.appId || "-"}</span>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.appId"),
      header: t("table.defaultColumns.app"),
      meta: {
        filterOptions: appFilterOptions,
        filterVariant: "multiselect",
      },
    },
    {
      accessorKey: "role",
      align: "center",
      cell: ({ getValue, row: { original } }) => {
        const roles = (original as unknown as { roles: string[] })?.roles;

        if (Array.isArray(roles)) {
          return (
            <>
              {roles?.map((role: string, index: number) => (
                <Tag
                  color={role === "ADMIN" ? "default" : "green"}
                  fullWidth
                  key={role + index}
                  label={role}
                />
              ))}
            </>
          );
        }

        const role = (getValue() as string) || "";

        return (
          <Tag
            color={role === "ADMIN" ? "default" : "green"}
            fullWidth
            label={role}
          />
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.role"),
      header: t("table.defaultColumns.role"),
      meta: {
        filterOptions: roleFilterOptions,
        filterVariant: "multiselect",
      },
    },
    {
      accessorKey: "invitedBy",
      cell: ({ getValue }) => {
        const invitedBy = getValue() as UserType;

        if (!invitedBy) {
          return <code>&#8212;</code>;
        }

        if (invitedBy?.givenName || invitedBy?.surname) {
          return `${invitedBy?.givenName || ""} ${invitedBy?.surname || ""}`;
        }

        return invitedBy?.email;
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.invitedBy"),
      header: t("table.defaultColumns.invitedBy"),
    },
    {
      accessorKey: "status",
      align: "center",
      cell: ({ row: { original } }) => {
        const { acceptedAt, expiresAt, revokedAt } = original;

        const getLabel = () => {
          if (acceptedAt) {
            return t("table.status.accepted");
          }

          if (revokedAt) {
            return t("table.status.revoked");
          }

          if (isExpired(expiresAt)) {
            return t("table.status.expired");
          }

          return t("table.status.pending");
        };

        const getColor = () => {
          if (acceptedAt) {
            return "green";
          }

          if (revokedAt) {
            return "red";
          }

          if (isExpired(expiresAt)) {
            return "gray";
          }

          return "yellow";
        };

        return <Tag color={getColor()} fullWidth label={getLabel()} />;
      },
      enableColumnFilter: true,
      filterPlaceholder: t("table.placeholders.status"),
      header: t("table.defaultColumns.status"),
      meta: {
        filterOptions: statusFilterOptions,
        filterVariant: "multiselect",
      },
    },
    {
      accessorKey: "expiresAt",
      dataType: "datetime",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.expiresAt"),
      header: t("table.defaultColumns.expiresAt"),
      meta: {
        filterVariant: "dateRange",
        serverFilterFn: "between",
      },
    },
  ];

  const renderToolbar = () => {
    if (showInviteAction) {
      return (
        <div className="table-actions">
          <InvitationModal
            additionalInvitationFields={additionalInvitationFields}
            apps={apps}
            expiryDateField={invitationExpiryDateField}
            invitationButtonOptions={invitationButtonOptions}
            onSubmitted={onInvitationAdded}
            prepareData={prepareInvitationData}
            roles={roles}
          />
        </div>
      );
    }
  };

  return (
    <DataTable
      className={className}
      columns={[...defaultColumns, ...columns]}
      data={invitations}
      dataActionsMenu={{
        actions: [
          {
            confirmationOptions: {
              header: t("confirmation.header"),
              message: t("confirmation.confirm.resend.message"),
            },
            disabled: (invitation) =>
              !!invitation.acceptedAt ||
              !!invitation.revokedAt ||
              isExpired(invitation.expiresAt),
            icon: "pi pi-replay",
            label: t("invitations.actions.resend"),
            onClick: (invitation) => handleResendInvitation(invitation),
            requireConfirmationModal: true,
          },
          {
            className: "danger",
            confirmationOptions: {
              header: t("confirmation.header"),
              message: t("confirmation.confirm.revoke.message"),
            },
            disabled: (invitation) =>
              !!invitation.acceptedAt ||
              !!invitation.revokedAt ||
              isExpired(invitation.expiresAt),
            icon: "pi pi-times",
            label: t("invitations.actions.revoke"),
            onClick: (invitation) => handleRevokeInvitation(invitation),
            requireConfirmationModal: true,
          },
          {
            className: "danger",
            confirmationOptions: {
              header: t("confirmation.header"),
              message: t("confirmation.confirm.delete.message"),
            },
            icon: "pi pi-trash",
            label: t("invitations.actions.delete"),
            onClick: (invitation) => handleDeleteInvitation(invitation.id),
            requireConfirmationModal: true,
          },
        ],
      }}
      emptyTableMessage={t("table.emptyMessage")}
      fetchData={fetchInvitations}
      locale={i18n?.language}
      paginationOptions={{
        itemsPerPageControlLabel: t("table.pagination.rowsPerPage"),
        pageInputLabel: t("table.pagination.pageControl"),
      }}
      renderToolbarItems={showInviteAction ? renderToolbar : undefined}
      totalRecords={totalRecords}
      visibleColumns={visibleColumns}
      {...tableOptions}
    ></DataTable>
  );
};
