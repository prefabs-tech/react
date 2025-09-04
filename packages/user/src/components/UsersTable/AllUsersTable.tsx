import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  TDataTable as DataTable,
  TDataTableProperties,
  TRequestJSON,
  IButtonProperties,
  TableColumnDefinition,
  Tag,
  formatDate,
} from "@prefabs.tech/react-ui";

import { InvitationModal } from "../Invitation";

import type {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationRoleOption,
  ResendInvitationResponse,
  RevokeInvitationResponse,
  ExtendedUser,
} from "@/types";

type VisibleColumn =
  | "name"
  | "email"
  | "roles"
  | "signedUpAt"
  | "app"
  | "invitedBy"
  | "status"
  | "actions"
  | string;

export type AllUsersTableProperties = Partial<
  Omit<
    TDataTableProperties<ExtendedUser>,
    "data" | "visibleColumns" | "fetchData"
  >
> & {
  additionalInvitationFields?: AdditionalFormFields;
  apps?: Array<InvitationAppOption>;
  fetchUsers?: (arguments_: TRequestJSON) => void;
  invitationButtonOptions?: IButtonProperties;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  onInvitationResent?: (data: ResendInvitationResponse) => void;
  onInvitationRevoked?: (data: RevokeInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUserDisabled?: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUserEnabled?: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roles?: Array<InvitationRoleOption>;
  showInviteAction?: boolean;
  showAppColumn?: boolean;
  users: Array<ExtendedUser>;
  visibleColumns?: VisibleColumn[];
};

export const AllUsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns = [],
  fetchUsers,
  invitationButtonOptions,
  onInvitationAdded,
  onInvitationResent,
  onInvitationRevoked,
  onUserDisabled,
  onUserEnabled,
  prepareInvitationData,
  roles,
  showInviteAction = true,
  totalRecords = 0,
  users,
  visibleColumns = [
    "name",
    "email",
    "roles",
    "signedUpAt",
    "app",
    "invitedBy",
    "status",
    "actions",
  ],
  ...tableOptions
}: AllUsersTableProperties) => {
  const { i18n, t } = useTranslation("users");

  const defaultColumns: Array<TableColumnDefinition<ExtendedUser>> = [
    {
      id: "name",
      header: t("table.defaultColumns.name"),
      accessorFn: (original) => {
        return (
          (original.givenName ? original.givenName : "") +
            (original.middleNames ? " " + original.middleNames : "") +
            (original.surname ? " " + original.surname : "") || "-"
        );
      },
      cell: ({ row: { original } }) => {
        return (
          (original.givenName ? original.givenName : "") +
            (original.middleNames ? " " + original.middleNames : "") +
            (original.surname ? " " + original.surname : "") || "-"
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.search"),
    },
    {
      accessorKey: "email",
      header: t("table.defaultColumns.email"),
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.search"),
    },
    {
      accessorKey: "app",
      header: t("invitations:table.defaultColumns.app"),
      cell: ({ row: { original } }) => {
        return <span>{original.appId || "-"} </span>;
      },
    },
    {
      align: "center",
      accessorKey: "roles",
      header: t("table.defaultColumns.roles"),
      cell: ({ getValue, row: { original } }) => {
        const roles = (original as unknown as { roles: string[] })?.roles;

        if (Array.isArray(roles)) {
          return (
            <>
              {roles?.map((role: string, index: number) => (
                <Tag
                  key={role + index}
                  label={role}
                  color={role === "ADMIN" ? "default" : "green"}
                  style={{ width: "5rem" }}
                />
              ))}
            </>
          );
        }

        const role = (getValue() as string) || "";

        return (
          <>
            <Tag
              label={role}
              color={role === "ADMIN" ? "default" : "green"}
              style={{ width: "5rem" }}
            />
          </>
        );
      },
    },
    {
      align: "center",
      accessorKey: "status",
      header: t("table.defaultColumns.status"),
      cell: ({ row: { original } }) => {
        const getLabel = () => {
          if (!original.isActiveUser) return t("status.invited");

          if (original.disabled) return t("status.disabled");

          return t("status.active");
        };

        const getColor = () => {
          if (!original.isActiveUser) return "default";

          if (original.disabled) return "red";

          return "green";
        };

        return (
          <>
            <Tag
              label={getLabel()}
              color={getColor()}
              style={{ width: "5rem" }}
            />
          </>
        );
      },
    },
    {
      accessorKey: "invitedBy",
      header: t("invitations:table.defaultColumns.invitedBy"),
      cell: ({ row: { original } }) => {
        if (original.isActiveUser) {
          return "-";
        }

        if (original.invitedBy?.givenName || original.invitedBy?.surname) {
          return `${original.invitedBy.givenName || ""} ${
            original.invitedBy.surname || ""
          }`;
        }

        return original.invitedBy?.email;
      },
    },
    {
      accessorKey: "signedUpAt",
      header: t("table.defaultColumns.signedUpOn"),
      cell: ({ row: { original } }) => {
        if (original.signedUpAt) {
          return formatDate(original.signedUpAt, i18n?.language);
        }

        return "-";
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
            onSubmitted={onInvitationAdded}
            invitationButtonOptions={invitationButtonOptions}
            prepareData={prepareInvitationData}
            roles={roles}
          />
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <DataTable
      className={className}
      columns={[...defaultColumns, ...columns]}
      data={users}
      emptyTableMessage={t("app:table.emptyMessage")}
      fetchData={fetchUsers}
      locale={i18n?.language}
      renderToolbarItems={showInviteAction ? renderToolbar : undefined}
      totalRecords={totalRecords}
      visibleColumns={visibleColumns}
      paginationOptions={{
        pageInputLabel: t("table.pagination.pageControl"),
        itemsPerPageControlLabel: t("table.pagination.rowsPerPage"),
      }}
      dataActionsMenu={(user) => {
        if (user.isActiveUser) {
          return {
            actions: [
              {
                label: t("table.actions.enable"),
                icon: "pi pi-check",
                disabled: (user) => !user.disabled,
                onClick: (user) => onUserEnabled && onUserEnabled(user),
                requireConfirmationModal: true,
                confirmationOptions: {
                  message: t("confirmation.enable.message"),
                  header: t("confirmation.header"),
                },
              },
              {
                label: t("table.actions.disable"),
                className: "danger",
                icon: "pi pi-times",
                disabled: (user) => user.disabled,
                onClick: (user) => onUserDisabled && onUserDisabled(user),
                requireConfirmationModal: true,
                confirmationOptions: {
                  message: t("confirmation.disable.message"),
                  header: t("confirmation.header"),
                },
              },
            ],
          };
        }

        return {
          actions: [
            {
              label: t("invitations:invitations.actions.resend"),
              icon: "pi pi-replay",
              disabled: (invitation) => !!invitation.acceptedAt,
              onClick: (invitation: ResendInvitationResponse) =>
                onInvitationResent && onInvitationResent(invitation),
              requireConfirmationModal: true,
              confirmationOptions: {
                message: t("invitations:confirmation.confirm.resend.message"),
                header: t("invitations:confirmation.header"),
              },
            },
            {
              label: t("invitations:invitations.actions.revoke"),
              icon: "pi pi-times",
              className: "danger",
              disabled: (invitation) => !!invitation.acceptedAt,
              onClick: (invitation) =>
                onInvitationRevoked && onInvitationRevoked(invitation),
              requireConfirmationModal: true,
              confirmationOptions: {
                message: t("invitations:confirmation.confirm.revoke.message"),
                header: t("invitations:confirmation.header"),
              },
            },
          ],
        };
      }}
      {...tableOptions}
    ></DataTable>
  );
};
