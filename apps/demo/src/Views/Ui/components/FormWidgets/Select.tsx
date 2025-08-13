import { Trans, useTranslation } from "@prefabs.tech/react-i18n";
import { Select, Page, Button, Tag } from "@prefabs.tech/react-ui";
import { TDataTable } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";

type Option<T = string | number> = {
  value?: T;
  label?: string;
  disabled?: boolean;
  [key: string]: unknown;
};

export const SelectDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "autoSortOptions",
      type: "boolean",
      default: "true",
      description: t("select.propertiesDescription.autoSortOptions"),
    },
    {
      id: 2,
      prop: "autoSelectSingleOption",
      type: "boolean",
      default: "false",
      description: t("select.propertiesDescription.autoSelectSingleOption"),
    },
    {
      id: 3,
      prop: "className",
      type: "string",
      default: "-",
      description: t("select.propertiesDescription.className"),
    },
    {
      id: 4,
      prop: "disabled",
      type: "boolean",
      default: "-",
      description: t("select.propertiesDescription.disabled"),
    },
    {
      id: 5,
      prop: "disableGroupSelect",
      type: "boolean",
      default: "-",
      description: t("select.propertiesDescription.disableGroupSelect"),
    },
    {
      id: 6,
      prop: "errorMessage",
      type: "string",
      default: "-",
      description: t("select.propertiesDescription.errorMessage"),
    },
    {
      id: 7,
      prop: "enableTooltip",
      type: "boolean",
      default: "false",
      description: t("select.propertiesDescription.enableTooltip"),
    },
    {
      id: 8,
      prop: "hasError",
      type: "boolean",
      default: "-",
      description: t("select.propertiesDescription.hasError"),
    },
    {
      id: 9,
      prop: "helperText",
      type: "string",
      default: "-",
      description: t("select.propertiesDescription.helperText"),
    },
    {
      id: 10,
      prop: "hideIfSingleOption",
      type: "boolean",
      default: "false",
      description: t("select.propertiesDescription.hideIfSingleOption"),
    },
    {
      id: 11,
      prop: "label",
      type: "string",
      default: "-",
      description: t("select.propertiesDescription.label"),
    },
    {
      id: 12,
      prop: "labelKey",
      type: "string",
      default: "-",
      description: t("select.propertiesDescription.labelKey"),
    },
    {
      id: 13,
      prop: "multiple",
      type: "boolean",
      default: "false",
      description: t("select.propertiesDescription.multiple"),
    },
    {
      id: 14,
      prop: "name",
      type: "string",
      default: "-",
      description: t("select.propertiesDescription.name"),
    },
    {
      id: 15,
      prop: "options",
      type: "Option[] | GroupedOption[]",
      default: "-",
      description: t("select.propertiesDescription.options"),
    },
    {
      id: 16,
      prop: "placeholder",
      type: "string",
      default: "-",
      description: t("select.propertiesDescription.placeholder"),
    },
    {
      id: 17,
      prop: "selectAllLabel",
      type: "string",
      default: "Select all",
      description: t("select.propertiesDescription.selectAllLabel"),
    },
    {
      id: 18,
      prop: "showRemoveSelection",
      type: "boolean",
      default: "true",
      description: t("select.propertiesDescription.showRemoveSelection"),
    },
    {
      id: 19,
      prop: "tooltipOptions",
      type: "TooltipOptions",
      default: "-",
      description: t("select.propertiesDescription.tooltipOptions"),
    },
    {
      id: 20,
      prop: "value",
      type: "Value",
      default: "-",
      description: t("select.propertiesDescription.value"),
    },
    {
      id: 21,
      prop: "valueKey",
      type: "string",
      default: "-",
      description: t("select.propertiesDescription.valueKey"),
    },
    {
      id: 22,
      prop: "renderOption",
      type: "(option: Option<T> | GroupedOption<T>) => React.ReactNode",
      default: "-",
      description: t("select.propertiesDescription.renderOption"),
    },
    {
      id: 23,
      prop: "renderValue",
      type: `(
        value?: T | T[],
        options?: Option<T>[] | GroupedOption<T>[]
      ) => React.ReactNode`,
      default: "-",
      description: t("select.propertiesDescription.renderValue"),
    },
    {
      id: 24,
      prop: "onChange",
      type: " (newValue: T | T[]) => void",
      default: "-",
      description: t("select.propertiesDescription.onChange"),
    },
  ];

  const [multiselectValue, setMultiselectValue] = useState<string[]>([]);

  const [singleSelectValue, setSingleSelectValue] = useState<string>("");
  const [singleSelectGroupValue, setSingleSelectGroupValue] =
    useState<string>("");
  const [multiSelectGroupValue, setMultiSelectGroupValue] = useState<string[]>(
    [],
  );
  const [
    multiSelectGroupSelectDisableValue,
    setMultiSelectGroupSelectDisableValue,
  ] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [renderedValue, setRenderedValue] = useState<string[]>([]);
  const [renderedOption, setRenderedOption] = useState<string[]>([]);
  const [value, setValue] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

  const renderSelectedValue = (
    value?: string | string[],
    options?: Option<string>[],
  ) => {
    if (!value || !Array.isArray(value) || !options) {
      return null;
    }

    return (
      <span className="selected-labels">
        {value.map((v) => {
          const label = options.find((option) => option.value === v)?.label;

          if (!label) {
            return null;
          }

          return <Tag key={v} label={label} />;
        })}
      </span>
    );
  };

  const renderOption = (option: Option<string>) => {
    return (
      <div>
        <i className="pi pi-user"></i>
        <span>{option.label}</span>
      </div>
    );
  };

  return (
    <Page
      title={t("select.title")}
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
        <p>{t("common.usage", { component: "Select" })}</p>
        <CodeBlock exampleCode='import { Select } from "@prefabs.tech/react-ui"' />
      </Section>

      <Section title={t("select.usage.basic")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { label: "France", value: "FR" },
            { label: "Germany", value: "DE" },
            { disabled: true, label: "Belgium", value: "BE" },
            { label: "Nepal", value: "NP" },
            { label: "India", value: "IN" },
          ]}
          value={singleSelectValue}
          onChange={(value: string) => setSingleSelectValue(value)}
          placeholder={t("select.placeholder")}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "France", value: "FR" },
    { label: "Germany", value: "DE" },
    { disabled: true, label: "Belgium", value: "BE" },
    { label: "Nepal", value: "NP" },
    { label: "India", value: "IN" }
  ]}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
  placeholder={t("select.placeholder")}
/>'
        />
        <p>
          <Trans
            i18nKey={"ui:select.autoSortOptionsInfo"}
            components={{ code: <code /> }}
          ></Trans>
        </p>
      </Section>
      <Section title={t("select.usage.disabled")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[{ value: "NP", label: "Nepal" }]}
          value="NP"
          onChange={() => {}}
          disabled={true}
        />
        <CodeBlock
          exampleCode='
<Select
  label={t("select.label")}
  name="select"
  options={[{ value: "NP", label: "Nepal" }]}
  value="NP"
  onChange={() => {}}
  disabled={true}
/>'
        />
      </Section>
      <Section title={t("select.usage.multiple")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { label: "France", value: "FR" },
            { label: "Germany", value: "DE" },
            { disabled: true, label: "Belgium", value: "BE" },
            { label: "Nepal", value: "NP" },
            { label: "India", value: "IN" },
          ]}
          multiple={true}
          value={multiselectValue}
          onChange={(value: string[]) => setMultiselectValue(value)}
          placeholder={t("select.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [multiselectValue, setMultiselectValue] = useState<string[]>([]);

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "France", value: "FR" },
    { label: "Germany", value: "DE" },
    { disabled: true, label: "Belgium", value: "BE" },
    { label: "Nepal", value: "NP" },
    { label: "India", value: "IN" }
  ]}
  multiple={true}
  value={multiselectValue}
  onChange={(value: string[]) => setMultiselectValue(value)}
  placeholder={t("select.multiSelectPlaceholder")}
/>       '
        />
      </Section>

      <Section title={t("select.usage.renderValue")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { label: "France", value: "FR" },
            { label: "Germany", value: "DE" },
            { disabled: true, label: "Belgium", value: "BE" },
            { label: "Nepal", value: "NP" },
            { label: "India", value: "IN" },
          ]}
          value={renderedValue}
          onChange={(value: string[]) => setRenderedValue(value)}
          renderValue={renderSelectedValue}
          multiple={true}
          placeholder={t("select.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [renderedValue, setRenderedValue] = useState<string[]>([]);

const renderSelectedValue = (
  value?: string | string[],
  options?: Option[],
) => {
  return (
    <span>
      {Array.isArray(value) &&
        value
          ?.map(
            (value_) =>
              options?.find((option) => option.value === value_)?.label,
          )
          .join(", ")}
    </span>
  );
};

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "France", value: "FR" },
    { label: "Germany", value: "DE" },
    { disabled: true, label: "Belgium", value: "BE" },
    { label: "Nepal", value: "NP" },
    { label: "India", value: "IN" }
  ]}
  value={renderedValue}
  onChange={(value: string[]) => setRenderedValue(value)}
  renderValue={renderSelectedValue}
  multiple={true}
  placeholder={t("select.multiSelectPlaceholder")}
/>'
        />
      </Section>
      <Section title={t("select.usage.renderOption")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { label: "France", value: "FR" },
            { label: "Germany", value: "DE" },
            { disabled: true, label: "Belgium", value: "BE" },
            { label: "Nepal", value: "NP" },
            { label: "India", value: "IN" },
          ]}
          value={renderedOption}
          onChange={(value: string[]) => setRenderedOption(value)}
          renderOption={renderOption}
          multiple={true}
          placeholder={t("select.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [renderedOption, setRenderedOption] = useState<string[]>([]);

const renderOption = (option: Option) => {
  return (
    <div>
      <i className="pi pi-user"></i>
      <span>{option.label}</span>
    </div>
  );
};

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "France", value: "FR" },
    { label: "Germany", value: "DE" },
    { disabled: true, label: "Belgium", value: "BE" },
    { label: "Nepal", value: "NP" },
    { label: "India", value: "IN" }
  ]}
  value={renderedOption}
  onChange={(value: string[]) => setRenderedOption(value)}
  renderOption={renderOption}
  multiple={true}
  placeholder={t("select.multiSelectPlaceholder")}
/>'
        />
      </Section>

      <Section title={t("select.usage.key")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { country: "France", code: "fr" },
            { country: "Germany", code: "de" },
            { disabled: true, country: "Belgium", code: "be" },
            { country: "Nepal", code: "np" },
            { country: "India", code: "hi" },
          ]}
          value={value}
          onChange={(value: string) => setValue(value)}
          placeholder={t("select.placeholder")}
          valueKey="code"
          labelKey="country"
        />
        <CodeBlock
          exampleCode='
const [value, setValue] = useState<string>("");

<Select
  label={t("select.label")}
  name="select"
  options={[
    { country: "France", code: "fr" },
    { country: "Germany", code: "de" },
    { disabled: true, country: "Belgium", code: "be" },
    { country: "Nepal", code: "np" },
    { country: "India", code: "hi" },
  ]}
  value={value}
  onChange={(value: string) => setValue(value)}
  placeholder={t("select.placeholder")}
  valueKey="code"
  labelKey="country"
/>'
        />
      </Section>

      <Section title={t("select.usage.withTooltip")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { label: "France", value: "FR" },
            { label: "Germany", value: "DE" },
            { disabled: true, label: "Belgium", value: "BE" },
            { label: "Nepal", value: "NP" },
            { label: "India", value: "IN" },
          ]}
          value={selectedCountries}
          onChange={(value: string[]) => setSelectedCountries(value)}
          className="country-selector"
          placeholder={t("select.placeholder")}
          multiple
          enableTooltip
          tooltipOptions={{
            position: "top",
            offset: 15,
          }}
        />
        <CodeBlock
          exampleCode='
const [selectedCountries, setSelectedCountries] = useState<string[]>([]);

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "France", value: "FR" },
    { label: "Germany", value: "DE" },
    { disabled: true, label: "Belgium", value: "BE" },
    { label: "Nepal", value: "NP" },
    { label: "India", value: "IN" },
  ]}
  value={selectedCountries}
  onChange={(value: string[]) => setSelectedCountries(value)}
  className="country-selector"
  placeholder={t("select.placeholder")}
  multiple
  enableTooltip
  tooltipOptions={{
    position: "top",
    offset: 15,
  }}
/>'
        />
      </Section>

      <Section title={t("select.usage.invalid")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            { label: "France", value: "FR" },
            { label: "Germany", value: "DE" },
            { disabled: true, label: "Belgium", value: "BE" },
            { label: "Nepal", value: "NP" },
            { label: "India", value: "IN" },
          ]}
          value={selectedValue}
          onChange={(value: string) => setSelectedValue(value)}
          hasError={!selectedValue}
          errorMessage={!selectedValue ? "Required field" : ""}
          placeholder={t("select.placeholder")}
        />
        <CodeBlock
          exampleCode='
const [selectedValue, setSelectedValue] = useState<string>("");

<Select
  label={t("select.label")}
  name="select"
  options={[
    { label: "France", value: "FR" },
    { label: "Germany", value: "DE" },
    { disabled: true, label: "Belgium", value: "BE" },
    { label: "Nepal", value: "NP" },
    { label: "India", value: "IN" }
  ]}
  value={selectedValue}
  onChange={(value: string) => setSelectedValue(value)}
  hasError={!selectedValue}
  errorMessage={!selectedValue ? "Required field" : ""}
  placeholder={t("select.placeholder")}
/>'
        />
      </Section>
      <Section title={t("select.usage.group")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            {
              label: "Europe",
              options: [
                { label: "Germany", value: "DE" },
                { label: "France", value: "FR" },
                { disabled: true, label: "Belgium", value: "BE" },
              ],
            },
            {
              label: "Asia",
              options: [
                { label: "Nepal", value: "NP" },
                { label: "India", value: "IN" },
              ],
            },
          ]}
          value={singleSelectGroupValue}
          onChange={(value: string) => setSingleSelectGroupValue(value)}
          placeholder={t("select.placeholder")}
        />
        <CodeBlock
          exampleCode='
const [singleSelectGroupValue, setSingleSelectGroupValue] = useState<string>("");

<Select
  label={t("select.label")}
  name="select"
  options={[
    {
      label: "Europe",
      options: [
        { label: "Germany", value: "DE" },
        { label: "France", value: "FR" },
        { disabled: true, label: "Belgium", value: "BE" },
      ],
    },
    {
      label: "Asia",
      options: [
        { label: "Nepal", value: "NP" },
        { label: "India", value: "IN" },
      ],
    },
  ]}
  value={singleSelectGroupValue}
  onChange={(value: string) => setSingleSelectGroupValue(value)}
  placeholder={t("select.placeholder")}
/>'
        />
        <p>
          <Trans
            i18nKey={"ui:select.autoSortOptionsInfo"}
            components={{ code: <code /> }}
          ></Trans>
        </p>
      </Section>
      <Section title={t("select.usage.groupMultiSelect")}>
        <Select
          label={t("select.label")}
          name="select"
          options={[
            {
              label: "Europe",
              options: [
                { label: "Germany", value: "DE" },
                { label: "France", value: "FR" },
                { disabled: true, label: "Belgium", value: "BE" },
              ],
            },
            {
              label: "Asia",
              options: [
                { label: "Nepal", value: "NP" },
                { label: "India", value: "IN" },
              ],
            },
          ]}
          multiple={true}
          value={multiSelectGroupValue}
          onChange={(value: string[]) => setMultiSelectGroupValue(value)}
          placeholder={t("select.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [multiSelectGroupValue, setMultiSelectGroupValue] = useState<string[]>([]);

<Select
  label={t("select.label")}
  name="select"
  options={
    [
      {
        label: "Europe",
        options: [
          { label: "Germany", value: "DE" },
          { label: "France", value: "FR" },
          { disabled: true, label: "Belgium", value: "BE" },
        ],
      },
      {
        label: "Asia",
        options: [
          { label: "Nepal", value: "NP" },
          { label: "India", value: "IN" },
        ],
      },
    ]}
  multiple={true}
  value={multiSelectGroupValue}
  onChange={(value: string[]) => setMultiSelectGroupValue(value)}
  placeholder={t("select.multiSelectPlaceholder")}
/>'
        />
      </Section>
      <Section title={t("select.usage.groupMultiSelectDisabled")}>
        <Select
          label={t("select.label")}
          name="select"
          disableGroupSelect={true}
          options={[
            {
              label: "Europe",
              options: [
                { label: "Germany", value: "DE" },
                { label: "France", value: "FR" },
                { disabled: true, label: "Belgium", value: "BE" },
              ],
            },
            {
              label: "Asia",
              options: [
                { label: "Nepal", value: "NP" },
                { label: "India", value: "IN" },
              ],
            },
          ]}
          multiple={true}
          value={multiSelectGroupSelectDisableValue}
          onChange={(value: string[]) =>
            setMultiSelectGroupSelectDisableValue(value)
          }
          placeholder={t("select.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [multiSelectGroupSelectDisableValue, setMultiSelectGroupSelectDisableValue] = useState<string[]>([]);

<Select
  label={t("select.label")}
  name="select"
  disableGroupSelect={true}
  options={
    [
      {
        label: "Europe",
        options: [
          { label: "Germany", value: "DE" },
          { label: "France", value: "FR" },
          { disabled: true, label: "Belgium", value: "BE" },
        ],
      },
      {
        label: "Asia",
        options: [
          { label: "Nepal", value: "NP" },
          { label: "India", value: "IN" },
        ],
      },
    ]}
  multiple={true}
  value={multiSelectGroupSelectDisableValue}
  onChange={(value: string[]) => setMultiSelectGroupSelectDisableValue(value)}
  placeholder={t("select.multiSelectPlaceholder")}
/>'
        />
      </Section>
      <Section
        title={t("headers.propertiesValue", {
          value: "ISelectProperties",
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
        />
      </Section>

      <Section title={t("headers.types")}>
        <CodeBlock
          exampleCode='
type Option<T extends string | number> = {
  disabled?: boolean;
  label: string;
  value: T;
};

type GroupedOption<T = string | number> = {
  label: string;
  options: Option<T>[];
};

type Value = string | number | (string | number)[]

type TooltipOptions = {
  delay?: number;
  mouseTrack?: boolean;
  offset?: number;
  position?: "top" | "bottom" | "right" | "left";
}
'
        />
      </Section>
    </Page>
  );
};
