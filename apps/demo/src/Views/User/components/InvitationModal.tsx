import { useTranslation } from "@prefabs.tech/react-i18n";
import { Page } from "@prefabs.tech/react-ui";
import { Button } from "@prefabs.tech/react-ui";
import { InvitationModal } from "@prefabs.tech/react-user";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const InvitationModalDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  return (
    <Page
      title={t("invitationModal.title")}
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
        <InvitationModal onSubmitted={() => {}} />
      </Section>
    </Page>
  );
};
