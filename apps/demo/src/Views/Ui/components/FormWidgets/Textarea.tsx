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
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <Textarea
          placeholder={t("textarea.placeHolder")}
          label={t("textarea.label")}
        />
      </Section>
      <Section>
        <Textarea
          hasError={true}
          errorMessage={t("textarea.errorMessage")}
          placeholder={t("textarea.placeHolder")}
          label={t("textarea.label")}
        />
      </Section>
    </Page>
  );
};
