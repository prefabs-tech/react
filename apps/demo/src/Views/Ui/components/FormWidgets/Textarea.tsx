import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, Textarea } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../../components/Demo";

export const TextareaDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("textarea.title")}
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
        <Textarea
          label={t("textarea.label")}
          placeholder={t("textarea.placeHolder")}
        />
      </Section>
      <Section>
        <Textarea
          errorMessage={t("textarea.errorMessage")}
          hasError={true}
          label={t("textarea.label")}
          placeholder={t("textarea.placeHolder")}
        />
      </Section>
    </Page>
  );
};
