import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";
import {
  Basic,
  ControlledSnippet,
  Disabled,
  Invalid,
} from "./SwitchInputUsage";

const data = [
  {
    description: "If true, the switch is disabled.",
    id: 1,
    prop: "disabled",
    type: "boolean",
  },
  {
    description:
      "Message to display when there is an error associated with the switch.",
    id: 2,
    prop: "errorMessage",
    type: "string",
  },
  {
    description: "If true, indicates that there is an error.",
    id: 3,
    prop: "hasError",
    type: "boolean",
  },
  {
    description: "The label for the switch.",
    id: 4,
    prop: "label",
    type: "string",
  },
  {
    description: "The name of the switch input, used for form handling.",
    id: 5,
    prop: "name",
    type: "string",
  },
  {
    description: "Any other attributes for the input element.",
    id: 6,
    prop: "...others",
    type: "InputHTMLAttributes",
  },
];

export const SwitchInputDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      className="demo-switch-input"
      subtitle={t("switchInput.subtitle")}
      title={t("switchInput.title")}
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
        <p>{t("common.usage", { component: "SwitchInput" })}</p>
        <CodeBlock exampleCode="import { SwitchInput } from '@prefabs.tech/react-ui';" />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "ISwitchInputProperties",
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

      <Section title={t("switchInput.basic")}>
        <Basic />
        <CodeBlock
          exampleCode={Basic({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("switchInput.invalidInput")}>
        <Invalid />
        <CodeBlock
          exampleCode={Invalid({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("switchInput.disabledInput")}>
        <Disabled />
        <CodeBlock
          exampleCode={Disabled({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("switchInput.controlled")}>
        <CodeBlock exampleCode={ControlledSnippet()}></CodeBlock>
      </Section>
    </Page>
  );
};
