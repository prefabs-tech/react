import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Input, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../../components/Demo";

export const InputDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("input.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section title={t("input.usage.basic")}>
        <Input label="Input label" placeholder="Input placeholder" />
      </Section>
      <Section title={t("input.usage.invalidInput")}>
        <Input
          errorMessage="Invalid input"
          hasError={true}
          label="Input label"
          placeholder="Input placeholder"
        />
      </Section>
    </Page>
  );
};
