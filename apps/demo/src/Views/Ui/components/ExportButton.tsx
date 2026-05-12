import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, ExportButton, Page } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../components/Demo";

export const ExportButtonDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const getData = () => {
    return [
      ["ID", "Name"],
      [1, "John Doe"],
      [2, "Mike Ross"],
      [3, "Harvey Specter"],
    ];
  };

  return (
    <Page
      title={t("exportButton.title")}
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
        <ExportButton getData={getData} label="Export XLSX" />
      </Section>
    </Page>
  );
};
