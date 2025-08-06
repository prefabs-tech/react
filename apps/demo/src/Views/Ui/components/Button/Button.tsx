import { useTranslation } from "@prefabs.tech/react-i18n";
import { TDataTable, Page, Button } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { Basic, Icons, Link, Severity, Size, Variant } from "./components";
import { CodeBlock, Section } from "../../../../components/Demo";

export const ButtonDemo = () => {
  const { t } = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "children",
      type: "string | ReactNode",
      description: t("button.propertiesDescription.children"),
    },
    {
      id: 2,
      prop: "className",
      type: "string",
      description: t("button.propertiesDescription.className"),
    },
    {
      id: 3,
      prop: "disabled",
      type: "boolean",
      description: t("button.propertiesDescription.disabled"),
    },
    {
      id: 4,
      prop: "iconLeft",
      type: "string | ReactNode",
      description: t("button.propertiesDescription.iconLeft"),
    },
    {
      id: 5,
      prop: "iconRight",
      type: "string | ReactNode",
      description: t("button.propertiesDescription.iconRight"),
    },
    {
      id: 6,
      prop: "label",
      type: "string",
      description: t("button.propertiesDescription.label"),
    },
    {
      id: 7,
      prop: "loading",
      type: "boolean",
      description: t("button.propertiesDescription.loading"),
    },
    {
      id: 8,
      prop: "onClick",
      type: "() => void",
      description: t("button.propertiesDescription.onClick"),
    },
    {
      id: 9,
      prop: "severity",
      type: '"primary" | "secondary" | "alternate" | "success" | "danger" | "warning"',
      description: t("button.propertiesDescription.severity"),
    },
    {
      id: 10,
      prop: "size",
      type: '"small" | "medium" | "large"',
      description: t("button.propertiesDescription.size"),
    },
    {
      id: 11,
      prop: "to",
      type: "string",
      description: t("button.propertiesDescription.to"),
    },
    {
      id: 12,
      prop: "title",
      type: "string",
      description: t("button.propertiesDescription.title"),
    },
    {
      id: 13,
      prop: "variant",
      type: '"outlined" | "filled" | "textOnly"',
      description: t("button.propertiesDescription.variant"),
    },
    {
      id: 14,
      prop: "rounded",
      type: "boolean",
      description: t("button.propertiesDescription.rounded"),
    },
  ];

  return (
    <Page
      className="demo-button"
      title={t("button.title")}
      subtitle={t("button.subtitle")}
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
        <p>{t("common.usage", { component: "Button" })}</p>
        <CodeBlock exampleCode="import { Button } from '@prefabs.tech/react-ui';" />
      </Section>

      <Section title={t("button.usage.basic")}>
        <Severity />
        <CodeBlock
          exampleCode={Severity({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("button.usage.size")}>
        <Size />
        <CodeBlock exampleCode={Size({ isString: true }) as string}></CodeBlock>
      </Section>

      <Section title={t("button.usage.variant")}>
        <Variant />
        <CodeBlock
          exampleCode={Variant({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("button.usage.icons")}>
        <Icons />
        <CodeBlock
          exampleCode={Icons({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("button.usage.link")}>
        <Link />
        <CodeBlock exampleCode={Link({ isString: true }) as string}></CodeBlock>
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "IButtonProperties",
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
