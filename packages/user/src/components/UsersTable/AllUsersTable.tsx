import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  TDataTable as DataTable,
  IButtonProperties,
  TableColumnDefinition,
  Tag,
  TDataTableProperties,
  TRequestJSON,
} from "@prefabs.tech/react-ui";

import type {
  AddInvitationResponse,
  ExtendedUser,
  InvitationAppOption,
  InvitationRoleOption,
  ResendInvitationResponse,
  RevokeInvitationResponse,
} from "@/types";

import { InvitationModal } from "../Invitation";

export type AllUsersTableProperties = Partial<
  Omit<
    TDataTableProperties<ExtendedUser>,
    "data" | "fetchData" | "visibleColumns"
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
  showAppColumn?: boolean;
  showInviteAction?: boolean;
  users: Array<ExtendedUser>;
  visibleColumns?: VisibleColumn[];
};

type VisibleColumn =
  | "actions"
  | "app"
  | "email"
  | "invitedBy"
  | "name"
  | "roles"
  | "signedUpAt"
  | "status"
  | string;

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
      header: t("table.defaultColumns.name"),
      id: "name",
    },
    {
      accessorKey: "email",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.search"),
      header: t("table.defaultColumns.email"),
    },
    {
      accessorKey: "app",
      cell: ({ row: { original } }) => {
        return <span>{original.appId || "-"} </span>;
      },
      header: t("invitations:table.defaultColumns.app"),
    },
    {
      accessorKey: "roles",
      align: "center",
      cell: ({ getValue, row: { original } }) => {
        const roles = (original as unknown as { roles: string[] })?.roles;

        if (Array.isArray(roles)) {
          return (
            <>
              {roles?.map((role: string, index: number) => (
                <Tag
                  color={role === "ADMIN" ? "default" : "green"}
                  key={role + index}
                  label={role}
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
              color={role === "ADMIN" ? "default" : "green"}
              label={role}
              style={{ width: "5rem" }}
            />
          </>
        );
      },
      header: t("table.defaultColumns.roles"),
    },
    {
      accessorKey: "status",
      align: "center",
      cell: ({ row: { original } }) => {
        const getLabel = () => {
          if (!original.isActiveUser) {
            return t("status.invited");
          }

          if (original.disabled) {
            return t("status.disabled");
          }

          return t("status.active");
        };

        const getColor = () => {
          if (!original.isActiveUser) {
            return "default";
          }

          if (original.disabled) {
            return "red";
          }

          return "green";
        };

        return (
          <>
            <Tag
              color={getColor()}
              label={getLabel()}
              style={{ width: "5rem" }}
            />
          </>
        );
      },
      header: t("table.defaultColumns.status"),
    },
    {
      accessorKey: "invitedBy",
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
      header: t("invitations:table.defaultColumns.invitedBy"),
    },
    {
      accessorKey: "signedUpAt",
      dataType: "date",
      header: t("table.defaultColumns.signedUpOn"),
    },
  ];

  const renderToolbar = () => {
    if (showInviteAction) {
      return (
        <div className="table-actions">
          <InvitationModal
            additionalInvitationFields={additionalInvitationFields}
            apps={apps}
            invitationButtonOptions={invitationButtonOptions}
            onSubmitted={onInvitationAdded}
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
      dataActionsMenu={(user) => {
        if (user.isActiveUser) {
          return {
            actions: [
              {
                confirmationOptions: {
                  header: t("confirmation.header"),
                  message: t("confirmation.enable.message"),
                },
                disabled: (user) => !user.disabled,
                icon: "pi pi-check",
                label: t("table.actions.enable"),
                onClick: (user) => onUserEnabled && onUserEnabled(user),
                requireConfirmationModal: true,
              },
              {
                className: "danger",
                confirmationOptions: {
                  header: t("confirmation.header"),
                  message: t("confirmation.disable.message"),
                },
                disabled: (user) => user.disabled,
                icon: "pi pi-times",
                label: t("table.actions.disable"),
                onClick: (user) => onUserDisabled && onUserDisabled(user),
                requireConfirmationModal: true,
              },
            ],
          };
        }

        return {
          actions: [
            {
              confirmationOptions: {
                header: t("invitations:confirmation.header"),
                message: t("invitations:confirmation.confirm.resend.message"),
              },
              disabled: (invitation) => !!invitation.acceptedAt,
              icon: "pi pi-replay",
              label: t("invitations:invitations.actions.resend"),
              onClick: (invitation: ResendInvitationResponse) =>
                onInvitationResent && onInvitationResent(invitation),
              requireConfirmationModal: true,
            },
            {
              className: "danger",
              confirmationOptions: {
                header: t("invitations:confirmation.header"),
                message: t("invitations:confirmation.confirm.revoke.message"),
              },
              disabled: (invitation) => !!invitation.acceptedAt,
              icon: "pi pi-times",
              label: t("invitations:invitations.actions.revoke"),
              onClick: (invitation) =>
                onInvitationRevoked && onInvitationRevoked(invitation),
              requireConfirmationModal: true,
            },
          ],
        };
      }}
      emptyTableMessage={t("app:table.emptyMessage")}
      fetchData={fetchUsers}
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
