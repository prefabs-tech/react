import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { UsersTable } from "@prefabs.tech/react-user";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";
import { allUsers } from "./data";

export const UsersTableDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  return (
    <Page
      title={t("usersTable.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section>
        <UsersTable
          id="users-table"
          initialSorting={[{ desc: false, id: "email" }]}
          onInvitationAdded={() => {}}
          roleFilterOptions={[
            { label: "ADMIN", value: "ADMIN" },
            { label: "SUPERADMIN", value: "SUPERADMIN" },
            { label: "USER", value: "USER" },
          ]}
          users={allUsers}
          visibleColumns={[
            "email",
            "name",
            "roles",
            "signedUpAt",
            "disabled",
            "actions",
          ]}
        />
      </Section>
    </Page>
  );
};
