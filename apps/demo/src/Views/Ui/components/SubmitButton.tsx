import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, SubmitButton } from "@prefabs.tech/react-ui";
import { TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../components/Demo";

export const SubmitButtonDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "disabled",
      type: "boolean",
      description: t("submitButton.propertiesDescription.disabled"),
    },
    {
      id: 2,
      prop: "label",
      type: "string",
      description: t("submitButton.propertiesDescription.label"),
    },
    {
      id: 3,
      prop: "loading",
      type: "boolean",
      description: t("submitButton.propertiesDescription.loading"),
    },
  ];

  return (
    <Page
      title={t("submitButton.title")}
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
        <p>{t("common.usage", { component: "SubmitButton" })}</p>
        <CodeBlock exampleCode="import { SubmitButton } from '@prefabs.tech/react-ui';" />
      </Section>
      <Section title={t("submitButton.usage.basic")}>
        <SubmitButton label="Submit" />
        <CodeBlock exampleCode="<SubmitButton label='Submit'/>" />
      </Section>
      <Section title={t("submitButton.usage.loading")}>
        <SubmitButton label="Submit loading" loading />
        <CodeBlock exampleCode="<SubmitButton label='Submit loading' loading/>" />
      </Section>
      <Section
        title={t("headers.propertiesValue", {
          value: "SubmitButtonProperties",
        })}
      >
        <TDataTable
          columns={[
            {
              accessorKey: "prop",
              header: "Properties",
            },
            {
              accessorKey: "type",
              header: "Type",
            },
            {
              accessorKey: "description",
              header: "Description",
            },
          ]}
          data={data}
          paginated={false}
        />
      </Section>
    </Page>
  );
};
