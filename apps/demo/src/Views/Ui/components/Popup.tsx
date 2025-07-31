import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Popup, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const PopupDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      title={t("popup.title")}
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
        <Popup
          trigger={<Button iconLeft={"pi pi-angle-double-right"}></Button>}
          content={<div style={{ padding: "1rem" }}>Popup content</div>}
          position="right"
          offset={20}
        />
      </Section>
    </Page>
  );
};
