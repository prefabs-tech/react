import { useTranslation } from "@prefabs.tech/react-i18n";
import { Outlet } from "react-router-dom";

import { AllUsersTableDemo } from "./components/AllUsersTable";
import { InvitationFormDemo } from "./components/InvitationForm";
import { InvitationModalDemo } from "./components/InvitationModal";
import { InvitationsTableDemo } from "./components/InvitationsTable";
import { UsersTableDemo } from "./components/UsersTable";
import { Demo } from "../../components/Demo";

export const USER_ROUTES = {
  GET_STARTED: "/user",
  INVITATION_FORM: "/user/invitation-form",
  INVITATION_MODAL: "/user/invitation-modal",
  INVITATIONS_TABLE: "/user/invitations-table",
  USERS_TABLE: "/user/users-table",
  ALL_USERS_TABLE: "/user/all-users-table",
};

export const routes = [
  {
    path: USER_ROUTES.INVITATION_FORM,
    key: "invitationForm.title",
    element: <InvitationFormDemo />,
  },
  {
    path: USER_ROUTES.INVITATION_MODAL,
    key: "invitationModal.title",
    element: <InvitationModalDemo />,
  },
  {
    path: USER_ROUTES.INVITATIONS_TABLE,
    key: "invitationsTable.title",
    element: <InvitationsTableDemo />,
  },
  {
    path: USER_ROUTES.USERS_TABLE,
    key: "usersTable.title",
    element: <UsersTableDemo />,
  },
  {
    path: USER_ROUTES.ALL_USERS_TABLE,
    key: "allUsersTable.title",
    element: <AllUsersTableDemo />,
  },
];

export const Pages = () => {
  const [t] = useTranslation("user");

  const subnav = [
    { label: t("app:getStarted"), route: USER_ROUTES.GET_STARTED },
    {
      label: t("headers.components"),
      submenu: [
        ...routes.map(({ path, key }) => {
          return { route: path, label: t(key) };
        }),
      ],
    },
  ];

  return (
    <Demo subnav={subnav} isGrouped>
      <Outlet />
    </Demo>
  );
};
