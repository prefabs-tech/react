import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";
import { Basic, Icons, Link, Severity, Size, Variant } from "./components";

const data = [
  {
    description: "The content to be displayed inside the button.",
    id: 1,
    prop: "children",
    type: "string | ReactNode",
  },
  {
    description: "Additional CSS classes to apply to the button.",
    id: 2,
    prop: "className",
    type: "string",
  },
  {
    description: "If true, the button will be disabled and non-interactive.",
    id: 3,
    prop: "disabled",
    type: "boolean",
  },
  {
    description:
      "Icon to be displayed on the left side of the button. Can be a string (class name) or a ReactNode.",
    id: 4,
    prop: "iconLeft",
    type: "string | ReactNode",
  },
  {
    description:
      "Icon to be displayed on the right side of the button. Can be a string (class name) or a ReactNode.",
    id: 5,
    prop: "iconRight",
    type: "string | ReactNode",
  },
  {
    description:
      "Text to be displayed in the button when `children` is not provided.",
    id: 6,
    prop: "label",
    type: "string",
  },
  {
    description:
      "If true, indicates that the button is in a loading state and disables user interaction.",
    id: 7,
    prop: "loading",
    type: "boolean",
  },
  {
    description: "Function to be called when the button is clicked.",
    id: 8,
    prop: "onClick",
    type: "() => void",
  },
  {
    description:
      "Defines the styling severity of the button. Defaults to 'primary'.",
    id: 9,
    prop: "severity",
    type: '"primary" | "secondary" | "alternate" | "success" | "danger" | "warning"',
  },
  {
    description: "Sets the size of the button. Defaults to 'medium'.",
    id: 10,
    prop: "size",
    type: '"small" | "medium" | "large"',
  },
  {
    description:
      "If provided, the button will act as a `Link` to the specified path instead of a regular button.",
    id: 11,
    prop: "to",
    type: "string",
  },
  {
    description: "Tooltip text that appears on hover.",
    id: 12,
    prop: "title",
    type: "string",
  },
  {
    description: "Specifies the button variant. Defaults to 'filled'.",
    id: 13,
    prop: "variant",
    type: '"outlined" | "filled" | "textOnly"',
  },
  {
    description:
      "Specifies the button border-radius to be rounded when set to `true`. Defaults to 'false'.",
    id: 14,
    prop: "rounded",
    type: "boolean",
  },
];

export const ButtonDemo = () => {
  const { t } = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      className="demo-button"
      subtitle={t("button.subtitle")}
      title={t("button.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Button" })}</p>
        <CodeBlock exampleCode="import { Button } from '@prefabs.tech/react-ui';" />
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
          persistState={false}
        />
      </Section>

      <Section title={t("button.usage.basic")}>
        <Basic />
        <CodeBlock
          exampleCode={Basic({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("button.usage.severity")}>
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
    </Page>
  );
};
