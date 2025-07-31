import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { UsersTable } from "@prefabs.tech/react-user";
import { useNavigate } from "react-router-dom";

import { allUsers } from "./data";
import { Section } from "../../../components/Demo";

export const UsersTableDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  return (
    <Page
      title={t("usersTable.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <UsersTable
          users={allUsers}
          onInvitationAdded={() => {}}
          visibleColumns={[
            "email",
            "name",
            "roles",
            "signedUpAt",
            "disabled",
            "actions",
          ]}
          initialSorting={[{ id: "email", desc: false }]}
          roleFilterOptions={[
            { value: "ADMIN", label: "ADMIN" },
            { value: "SUPERADMIN", label: "SUPERADMIN" },
            { value: "USER", label: "USER" },
          ]}
          id="users-table"
          persistState
        />
      </Section>
    </Page>
  );
};
