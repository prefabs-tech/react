import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, TDataTable } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import {
  CustomLabelMultiCheckboxDemo,
  CustomLabelSingleCheckboxDemo,
  DisabledDemo,
  MultiCheckboxDemo,
  SingleCheckboxDemo,
} from "./CheckboxInputUsage";
import { CodeBlock, Section } from "../../../../components/Demo";

const data = [
  {
    id: 1,
    name: "checked",
    type: "boolean",
    default: "false",
    description: "Determines the checked state of a single checkbox.",
  },
  {
    id: 2,
    name: "className",
    type: "string",
    default: "-",
    description: "Additional CSS classes for styling.",
  },
  {
    id: 3,
    name: "direction",
    type: '"horizontal" | "vertical"',
    default: '"vertical"',
    description: "Defines the layout direction for multiple checkboxes.",
  },
  {
    id: 4,
    name: "disabled",
    type: "boolean",
    default: "-",
    description: "Disables the checkbox input.",
  },
  {
    id: 5,
    name: "errorMessage",
    type: "string",
    default: "-",
    description: "Displays an error message below the component.",
  },
  {
    id: 6,
    name: "helperText",
    type: "string",
    default: "-",
    description: "Displays a helper text below the component.",
  },
  {
    id: 7,
    name: "inputLabel",
    type: "string | React.ReactNode",
    default: "-",
    description: "Label for the single checkbox.",
  },
  {
    id: 8,
    name: "label",
    type: "string | React.ReactNode",
    default: "-",
    description: "Label for the group of checkboxes.",
  },
  {
    id: 9,
    name: "name",
    type: "string",
    default: "-",
    description: "The name attribute for the checkbox input.",
  },
  {
    id: 10,
    name: "onChange",
    type: "(newValue: T[]) => void",
    default: "-",
    description: "Callback function that returns the updated values.",
  },
  {
    id: 11,
    name: "options",
    type: "Array<{ value, label }>",
    default: "[]",
    description: "Options for multiple checkboxes.",
  },
  {
    id: 12,
    name: "placeholder",
    type: "string",
    default: "-",
    description: "Placeholder text (not applicable to checkboxes).",
  },
  {
    id: 13,
    name: "value",
    type: "T[]",
    default: "[]",
    description: "Array of selected values for multiple checkboxes.",
  },
  {
    id: 14,
    name: "renderOptionsLabel",
    type: "(option: Option<T>) => React.ReactNode",
    default: "-",
    description: "Custom render label for multiple checkboxes.",
  },
];

export const CheckboxInputDemo = () => {
  const { t } = useTranslation("ui");
  const navigate = useNavigate();

  return (
    <Page
      className="demo-checkbox-input"
      title={t("checkboxInput.title")}
      subtitle={t("checkboxInput.subtitle")}
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
        <p>{t("common.usage", { component: "CheckboxInput" })}</p>
        <CodeBlock exampleCode="import { CheckboxInput } from '@prefabs.tech/react-ui';" />
      </Section>

      <Section title={t("checkboxInput.usage.basic")}>
        <SingleCheckboxDemo />
        <CodeBlock
          exampleCode={SingleCheckboxDemo({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("checkboxInput.usage.customLabel")}>
        <CustomLabelSingleCheckboxDemo />
        <CodeBlock
          exampleCode={
            CustomLabelSingleCheckboxDemo({ isString: true }) as string
          }
        ></CodeBlock>
      </Section>

      <Section title={t("checkboxInput.usage.multiple")}>
        <MultiCheckboxDemo />
        <CodeBlock
          exampleCode={MultiCheckboxDemo({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section title={t("checkboxInput.usage.customOptionsLabel")}>
        <p>{t("checkboxInput.usage.customOptionsLabelDescription")}</p>
        <CustomLabelMultiCheckboxDemo />
        <CodeBlock
          exampleCode={
            CustomLabelMultiCheckboxDemo({ isString: true }) as string
          }
        ></CodeBlock>
      </Section>

      <Section title={t("checkboxInput.usage.disabled")}>
        <DisabledDemo />
        <CodeBlock
          exampleCode={DisabledDemo({ isString: true }) as string}
        ></CodeBlock>
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "ICheckboxInputProperties<T>",
        })}
      >
        <TDataTable
          columns={[
            {
              accessorKey: "name",
              header: "Properties",
            },
            {
              accessorKey: "type",
              header: "Type",
            },
            {
              accessorKey: "default",
              header: "Default",
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
    </Page>
  );
};
