import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  CountryPicker,
  Page,
  Button,
  TDataTable,
} from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";

export const CountryPickerDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "label",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.label"),
    },
    {
      id: 2,
      prop: "name",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.name"),
    },
    {
      id: 3,
      prop: "locale",
      type: "string",
      default: '"en"',
      description: t("countryPicker.propertiesDescription.locale"),
    },
    {
      id: 4,
      prop: "value",
      type: "string | string[]",
      default: "-",
      description: t("countryPicker.propertiesDescription.value"),
    },
    {
      id: 5,
      prop: "onChange",
      type: "(value: string | string[]) => void",
      default: "-",
      description: t("countryPicker.propertiesDescription.onChange"),
    },
    {
      id: 6,
      prop: "placeholder",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.placeholder"),
    },
    {
      id: 7,
      prop: "multiple",
      type: "boolean",
      default: "false",
      description: t("countryPicker.propertiesDescription.multiple"),
    },
    {
      id: 8,
      prop: "data",
      type: "CountryData[]",
      default: "[]",
      description: t("countryPicker.propertiesDescription.data"),
    },
    {
      id: 9,
      prop: "include",
      type: "string[]",
      default: "[]",
      description: t("countryPicker.propertiesDescription.include"),
    },
    {
      id: 10,
      prop: "exclude",
      type: "string[]",
      default: "[]",
      description: t("countryPicker.propertiesDescription.exclude"),
    },
  ];

  const [singleSelectValue, setSingleSelectValue] = useState<string>("");
  const [multipleSelectValue, setMultipleSelectValue] = useState<string[]>([]);
  const [customDataValue, setCustomDataValue] = useState<string>("");
  const [includeSelectValue, setIncludeSelectValue] = useState<string>("");
  const [excludeSelectValue, setExcludeSelectValue] = useState<string>("");
  const [nepaliValue, setNepaliValue] = useState<string>("");

  return (
    <Page
      title={t("countryPicker.title")}
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
        <p>{t("common.usage", { component: "CountryPicker" })}</p>
        <CodeBlock exampleCode='import { CountryPicker } from "@prefabs.tech/react-ui"' />
      </Section>

      <Section title={t("countryPicker.basic")}>
        <CountryPicker
          label={t("countryPicker.labels.single")}
          name="countryPickerSingle"
          locale="fr"
          value={singleSelectValue}
          onChange={(value: string) => setSingleSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");

<CountryPicker
  label={t("countryPicker.labels.single")}
  name="countryPickerSingle"
  locale="fr"
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
  placeholder={t("countryPicker.placeholders.single")}
/>'
        />
      </Section>

      <Section title={t("countryPicker.multipleSelect")}>
        <CountryPicker
          label={t("countryPicker.labels.multiple")}
          name="countryPickerMultiple"
          locale="en"
          multiple={true}
          value={multipleSelectValue}
          onChange={(value: string[]) => setMultipleSelectValue(value)}
          placeholder={t("countryPicker.placeholders.multiple")}
        />
        <CodeBlock
          exampleCode='
const [multipleSelectValue, setMultipleSelectValue] = useState<string[]>([]);

<CountryPicker
  label={t("countryPicker.labels.multiple")}
  name="countryPickerMultiple"
  locale="en"
  multiple={true}
  value={multipleSelectValue}
  onChange={(value: string[]) => setMultipleSelectValue(value)}
  placeholder={t("countryPicker.placeholders.multiple")}
/>'
        />
      </Section>

      <Section title={t("countryPicker.customData")}>
        <CountryPicker
          label={t("countryPicker.labels.single")}
          name="countryPickerCustom"
          locale="en"
          value={customDataValue}
          onChange={(value: string) => setCustomDataValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          data={[
            {
              code: "FR",
              i18n: {
                en: "France (fr)",
                fr: "La France (fr)",
              },
            },
            {
              code: "XX",
              i18n: { en: "Mars Republic", fr: "République de Mars" },
            },
          ]}
        />
        <CodeBlock
          exampleCode='
const [customDataValue, setCustomDataValue] = useState<string>("");

<CountryPicker
  label={t("countryPicker.labels.custom")}
  locale="en"
  value={customDataValue}
  onChange={(value) => setCustomDataValue(value)}
  placeholder={t("countryPicker.placeholders.custom")}
  data={[
    { 
      code: "FR", 
      i18n: { 
        en: "France (fr)",
        fr: "La France (fr)",
       } 
    },
    { 
      code: "XX", 
      i18n: { en: "Mars Republic" } 
    }
  ]}
/>'
        />
      </Section>

      <Section title={t("countryPicker.include")}>
        <CountryPicker
          label={t("countryPicker.labels.single")}
          name="countryPickerInclude"
          locale="en"
          value={includeSelectValue}
          onChange={(value: string) => setIncludeSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          include={["US", "GB", "DE", "FR", "JP"]}
        />
        <CodeBlock
          exampleCode='
const [includeSelectValue, setIncludeSelectValue] = useState<string>("");

<CountryPicker
  label={t("countryPicker.labels.single")}
  name="countryPickerInclude"
  locale="en"
  value={includeSelectValue}
  onChange={(value: string) => setIncludeSelectValue(value)}
  placeholder={t("countryPicker.placeholders.single")}
  include={["US", "GB", "DE", "FR", "JP"]}
/>'
        />
      </Section>

      <Section title={t("countryPicker.exclude")}>
        <CountryPicker
          label={t("countryPicker.labels.single")}
          name="countryPickerPriority"
          locale="en"
          value={excludeSelectValue}
          onChange={(value: string) => setExcludeSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          include={["US", "GB", "DE", "FR"]}
          exclude={["FR", "CN", "BR"]}
        />
        <CodeBlock
          exampleCode='
const [excludeSelectValue, setExcludeSelectValue] = useState<string>("");

<CountryPicker
  label={t("countryPicker.labels.single")}
  value={excludeSelectValue}
  onChange={(value: string) => setExcludeSelectValue(value)}
  include={["US", "GB", "DE", "FR"]}
  exclude={["FR", "CN", "BR"]}
/>'
        />
      </Section>

      <Section title={t("countryPicker.locale")}>
        <CountryPicker
          label={t("countryPicker.labels.single")}
          name="countryPickerNepali"
          locale="np"
          value={nepaliValue}
          onChange={(value: string) => setNepaliValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          include={["NP", "US", "CN", "GB", "IN"]}
          data={[
            {
              code: "NP",
              i18n: { np: "नेपाल" },
            },
            {
              code: "US",
              i18n: { np: "संयुक्त राज्य अमेरिका" },
            },
            {
              code: "CN",
              i18n: { np: "चीन" },
            },
            {
              code: "GB",
              i18n: { np: "बेलायत" },
            },
            {
              code: "IN",
              i18n: { np: "भारत" },
            },
          ]}
        />
        <CodeBlock
          exampleCode='
const [nepaliValue, setNepaliValue] = useState<string>("");

<CountryPicker
  label={t("countryPicker.locale")} 
  locale="np"
  value={nepaliValue}
  onChange={(value: string) => setNepaliValue(value)}
  placeholder={t("countryPicker.placeholders.single")}
  data={[
    { code: "NP", i18n: { np: "नेपाल" } },
    { code: "US", i18n: { np: "संयुक्त राज्य अमेरिका" } },
    { code: "CN", i18n: { np: "चीन" } },
    { code: "GB", i18n: { np: "बेलायत" } },
    { code: "IN", i18n: { np: "भारत" } },
  ]}
/>'
        />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "CountryPicker",
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
          persistState={false}
        />
      </Section>
    </Page>
  );
};
