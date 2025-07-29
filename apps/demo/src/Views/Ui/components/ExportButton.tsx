import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, ExportButton, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const ExportButtonDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "filename",
      type: "string",
      default: "export_<timestamp>.xlsx",
      description: t("exportButton.propertiesDescription.filename"),
    },
    {
      id: 2,
      prop: "getData",
      type: "() => Array<Array<any>>",
      default: "-",
      description: t("exportButton.propertiesDescription.getData"),
    },
    {
      id: 3,
      prop: "label",
      type: "string",
      default: "Export XLSX",
      description: t("exportButton.propertiesDescription.label"),
    },
    {
      id: 4,
      prop: "onExportEnd",
      type: "() => void",
      default: "-",
      description: t("exportButton.propertiesDescription.onExportEnd"),
    },
    {
      id: 5,
      prop: "onExportStart",
      type: "() => void",
      default: "-",
      description: t("exportButton.propertiesDescription.onExportStart"),
    },
    {
      id: 6,
      prop: "sheetOptions",
      type: "WorkSheetOptions",
      default: "{}",
      description: t("exportButton.propertiesDescription.sheetOptions"),
    },
    {
      id: 7,
      prop: "sheetName",
      type: "string",
      default: "Sheet 1",
      description: t("exportButton.propertiesDescription.sheetName"),
    },
  ];

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
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "ExportButton" })}</p>
        <CodeBlock exampleCode="import { ExportButton } from '@prefabs.tech/react-ui';" />
      </Section>
      <Section title={t("button.usage.basic")}>
        <ExportButton label="Export XLSX" getData={getData} />
        <CodeBlock
          exampleCode={`<ExportButton label="Export XLSX" getData={getData} />`}
        ></CodeBlock>
      </Section>
      <Section
        title={t("headers.propertiesValue", {
          value: "ModalProperties",
        })}
      >
        <TDataTable
          columns={[
            {
              accessorKey: "prop",
              header: t("propertiesTable.header.properties"),
            },
            {
              accessorKey: "type",
              header: t("propertiesTable.header.type"),
            },
            {
              accessorKey: "default",
              header: t("propertiesTable.header.default"),
            },
            {
              accessorKey: "description",
              header: t("propertiesTable.header.description"),
            },
          ]}
          data={data}
          paginated={false}
        />
      </Section>
    </Page>
  );
};
