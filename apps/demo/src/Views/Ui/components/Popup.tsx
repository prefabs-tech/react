import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, Popup } from "@prefabs.tech/react-ui";
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
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section>
        <Popup
          content={<div style={{ padding: "1rem" }}>Popup content</div>}
          offset={20}
          position="right"
          trigger={<Button iconLeft={"pi pi-angle-double-right"}></Button>}
        />
      </Section>
    </Page>
  );
};
