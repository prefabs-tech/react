import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { AllUsersTable } from "@prefabs.tech/react-user";
import { useNavigate } from "react-router-dom";

import { allUsers } from "./data";
import { Section } from "../../../components/Demo";

export const AllUsersTableDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  return (
    <Page
      title={t("allUsersTable.title")}
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
        <AllUsersTable users={allUsers} />
      </Section>
    </Page>
  );
};
