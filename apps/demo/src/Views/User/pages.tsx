import { useTranslation } from "@prefabs.tech/react-i18n";
import { Outlet } from "react-router-dom";

import { Demo } from "../../components/Demo";
import { AllUsersTableDemo } from "./components/AllUsersTable";
import { InvitationFormDemo } from "./components/InvitationForm";
import { InvitationModalDemo } from "./components/InvitationModal";
import { InvitationsTableDemo } from "./components/InvitationsTable";
import { UsersTableDemo } from "./components/UsersTable";

export const USER_ROUTES = {
  ALL_USERS_TABLE: "/user/all-users-table",
  GET_STARTED: "/user",
  INVITATION_FORM: "/user/invitation-form",
  INVITATION_MODAL: "/user/invitation-modal",
  INVITATIONS_TABLE: "/user/invitations-table",
  USERS_TABLE: "/user/users-table",
};

export const routes = [
  {
    element: <InvitationFormDemo />,
    key: "invitationForm.title",
    path: USER_ROUTES.INVITATION_FORM,
  },
  {
    element: <InvitationModalDemo />,
    key: "invitationModal.title",
    path: USER_ROUTES.INVITATION_MODAL,
  },
  {
    element: <InvitationsTableDemo />,
    key: "invitationsTable.title",
    path: USER_ROUTES.INVITATIONS_TABLE,
  },
  {
    element: <UsersTableDemo />,
    key: "usersTable.title",
    path: USER_ROUTES.USERS_TABLE,
  },
  {
    element: <AllUsersTableDemo />,
    key: "allUsersTable.title",
    path: USER_ROUTES.ALL_USERS_TABLE,
  },
];

export const Pages = () => {
  const [t] = useTranslation("user");

  const subnav = [
    { label: t("app:getStarted"), route: USER_ROUTES.GET_STARTED },
    {
      label: t("headers.components"),
      submenu: [
        ...routes.map(({ key, path }) => {
          return { label: t(key), route: path };
        }),
      ],
    },
  ];

  return (
    <Demo isGrouped subnav={subnav}>
      <Outlet />
    </Demo>
  );
};
