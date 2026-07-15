import { AdditionalFormFields } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  type DataActionsMenuProperties,
  TDataTable as DataTable,
  type FilterOption,
  IButtonProperties,
  TableColumnDefinition,
  Tag,
  TDataTableProperties,
  TRequestJSON,
} from "@prefabs.tech/react-ui";

import type {
  AddInvitationResponse,
  InvitationAppOption,
  InvitationExpiryDateField,
  InvitationRoleOption,
  UserType,
} from "@/types";

import { useUser } from "@/hooks";

import { InvitationModal } from "../Invitation";
import { useUserActions } from "./useUserActionsMethods";

export type UsersTableProperties = Partial<
  Omit<
    TDataTableProperties<UserType>,
    "data" | "dataActionsMenu" | "fetchData" | "visibleColumns"
  >
> & {
  additionalInvitationFields?: AdditionalFormFields;
  apps?: Array<InvitationAppOption>;
  dataActionsMenu?:
    | ((
        user: UserType,
        defaultActionsMenu: DataActionsMenuProperties<UserType>,
      ) => DataActionsMenuProperties<UserType>)
    | DataActionsMenuProperties<UserType>;
  fetchUsers?: (arguments_: TRequestJSON) => void;
  invitationButtonOptions?: IButtonProperties;
  invitationExpiryDateField?: InvitationExpiryDateField;
  onInvitationAdded?: (response: AddInvitationResponse) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUserDisabled?: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onUserEnabled?: (data: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  prepareInvitationData?: (data: any) => any;
  roleFilterOptions?: FilterOption[];
  roles?: Array<InvitationRoleOption>;
  showInviteAction?: boolean;
  users: Array<UserType>;
  visibleColumns?: VisibleColumn[];
};

type VisibleColumn =
  "actions" | "email" | "name" | "roles" | "signedUpAt" | "status" | string;

export const UsersTable = ({
  additionalInvitationFields,
  apps,
  className = "table-users",
  columns = [],
  dataActionsMenu,
  fetchUsers,
  invitationButtonOptions,
  invitationExpiryDateField,
  onInvitationAdded,
  onUserDisabled,
  onUserEnabled,
  prepareInvitationData,
  roleFilterOptions,
  roles,
  showInviteAction = true,
  totalRecords = 0,
  users,
  visibleColumns = [
    "email",
    "name",
    "roles",
    "signedUpAt",
    "disabled",
    "actions",
  ],
  ...tableProperties
}: UsersTableProperties) => {
  const { i18n, t } = useTranslation("users");

  const { user: currentUser } = useUser();

  const { handleDisableUser, handleEnableUser } = useUserActions({
    onUserDisabled,
    onUserEnabled,
  });

  const defaultColumns: Array<TableColumnDefinition<UserType>> = [
    {
      accessorKey: "email",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.search"),
      header: t("table.defaultColumns.email"),
    },
    {
      accessorKey: "name",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.search"),
      header: t("table.defaultColumns.name"),
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
          <>
            <Tag
              color={role === "ADMIN" ? "default" : "green"}
              fullWidth
              label={role}
            />
          </>
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.roles"),
      header: t("table.defaultColumns.roles"),
      meta: {
        filterOptions: roleFilterOptions,
        filterVariant: "multiselect",
      },
    },
    {
      accessorKey: "signedUpAt",
      dataType: "date",
      enableColumnFilter: true,
      enableSorting: true,
      filterPlaceholder: t("table.placeholders.date"),
      header: t("table.defaultColumns.signedUpOn"),
      meta: {
        filterVariant: "dateRange",
        serverFilterFn: "between",
      },
    },
    {
      accessorKey: "disabled",
      align: "center",
      cell: ({ row: { original } }) => {
        const color = original.disabled ? "red" : "green";

        return (
          <Tag
            color={color}
            fullWidth
            label={
              original.disabled ? t("status.disabled") : t("status.enabled")
            }
          />
        );
      },
      enableColumnFilter: true,
      enableSorting: true,
      filterFn: (row, columnId, filterValue) => {
        if (!filterValue || filterValue.length === 0) {
          return true;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const updatedFilterValue = filterValue.map((value: any) => {
          switch (value) {
            case "false":
              return false;
            case "true":
              return true;
            default:
              return value;
          }
        });

        const cellValue = row.getValue(columnId);

        return updatedFilterValue.includes(cellValue);
      },
      filterPlaceholder: t("table.placeholders.status"),
      header: t("table.defaultColumns.status"),
      meta: {
        filterOptions: [
          {
            label: t("status.enabled"),
            value: "false",
          },
          {
            label: t("status.disabled"),
            value: "true",
          },
        ],
        filterVariant: "multiselect",
      },
    },
  ];

  const defaultActionsMenu: DataActionsMenuProperties<UserType> = {
    actions: [
      {
        confirmationOptions: {
          header: t("confirmation.header"),
          message: t("confirmation.enable.message"),
        },
        disabled: (user) => !user.disabled,
        display: (user) => user.disabled && currentUser?.id !== user.id,
        icon: "pi pi-check",
        key: "enableUser",
        label: t("table.actions.enable"),
        onClick: (user) => handleEnableUser(user),
        requireConfirmationModal: true,
      },
      {
        className: "danger",
        confirmationOptions: {
          header: t("confirmation.header"),
          message: t("confirmation.disable.message"),
        },
        disabled: (user) => user.disabled,
        display: (user) => !user.disabled && currentUser?.id !== user.id,
        icon: "pi pi-times",
        key: "disableUser",
        label: t("table.actions.disable"),
        onClick: (user) => handleDisableUser(user),
        requireConfirmationModal: true,
      },
    ],
  };

  const filteredActionMenu = {
    actions:
      defaultActionsMenu.actions?.filter((action) => action.display) || [],
  };

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
    } else {
      return null;
    }
  };

  return (
    <DataTable
      className={className}
      columns={[...defaultColumns, ...columns]}
      data={users}
      dataActionsMenu={
        dataActionsMenu
          ? typeof dataActionsMenu === "function"
            ? (data) => dataActionsMenu(data, filteredActionMenu)
            : dataActionsMenu
          : filteredActionMenu
      }
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
      {...tableProperties}
    ></DataTable>
  );
};
