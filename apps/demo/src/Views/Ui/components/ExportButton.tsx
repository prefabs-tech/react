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
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <ExportButton label="Export XLSX" getData={getData} />
      </Section>
    </Page>
  );
};
