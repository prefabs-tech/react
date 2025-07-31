import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { InvitationForm } from "@prefabs.tech/react-user";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../../components/Demo";
import { apps, roles } from "../data";

export const InvitationFormDemo = () => {
  const [t] = useTranslation("user");
  const navigate = useNavigate();

  return (
    <Page
      title={t("invitationForm.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("invitationForm.usage.withAppField")}>
        <InvitationForm
          onSubmitted={() => {}}
          onCancel={() => {}}
          apps={apps}
        />
      </Section>

      <Section title={t("invitationForm.usage.withRoleField")}>
        <InvitationForm
          onSubmitted={() => {}}
          onCancel={() => {}}
          roles={roles}
        />
      </Section>

      <Section title={t("invitationForm.usage.withCalendarExpiryDateField")}>
        <InvitationForm
          expiryDateField={{
            display: true,
            mode: "calendar",
          }}
          onSubmitted={() => {}}
          onCancel={() => {}}
          roles={roles}
        />
      </Section>

      <Section title={t("invitationForm.usage.withInputExpiryDateField")}>
        <InvitationForm
          expiryDateField={{
            display: true,
            mode: "input",
          }}
          onSubmitted={() => {}}
          onCancel={() => {}}
          roles={roles}
        />
      </Section>
    </Page>
  );
};
