import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Checkbox, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../../components/Demo";

export const CheckboxDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("checkbox.title")}
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
        <Checkbox label="Check here" />
      </Section>
    </Page>
  );
};
