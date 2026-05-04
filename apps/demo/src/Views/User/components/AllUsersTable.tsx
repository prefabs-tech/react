import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { AllUsersTable } from "@prefabs.tech/react-user";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";
import { allUsers } from "./data";

export const AllUsersTableDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  return (
    <Page
      title={t("allUsersTable.title")}
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
        <AllUsersTable id="all-users-table" users={allUsers} />
      </Section>
    </Page>
  );
};
