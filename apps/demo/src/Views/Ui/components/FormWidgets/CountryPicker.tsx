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
  const [t, i18n] = useTranslation("ui");
  const navigate = useNavigate();

  const data = [
    {
      id: 1,
      prop: "data",
      type: "CountryData[]",
      default: "[]",
      description: t("countryPicker.propertiesDescription.data"),
    },
    {
      id: 2,
      prop: "exclude",
      type: "string[]",
      default: "[]",
      description: t("countryPicker.propertiesDescription.exclude"),
    },
    {
      id: 3,
      prop: "favorites",
      type: "string[]",
      default: "[]",
      description: t("countryPicker.propertiesDescription.favorites"),
    },
    {
      id: 4,
      prop: "include",
      type: "string[]",
      default: "[]",
      description: t("countryPicker.propertiesDescription.include"),
    },
    {
      id: 5,
      prop: "label",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.label"),
    },
    {
      id: 6,
      prop: "locale",
      type: "string",
      default: '"en"',
      description: t("countryPicker.propertiesDescription.locale"),
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
      prop: "name",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.name"),
    },

    {
      id: 9,
      prop: "onChange",
      type: "(value: string | string[]) => void",
      default: "-",
      description: t("countryPicker.propertiesDescription.onChange"),
    },
    {
      id: 10,
      prop: "placeholder",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.placeholder"),
    },
    {
      id: 11,
      prop: "value",
      type: "string | string[]",
      default: "-",
      description: t("countryPicker.propertiesDescription.value"),
    },
  ];

  const [singleSelectValue, setSingleSelectValue] = useState<string>("");
  const [multipleSelectValue, setMultipleSelectValue] = useState<string[]>([]);
  const [customDataValue, setCustomDataValue] = useState<string>("");
  const [includeSelectValue, setIncludeSelectValue] = useState<string>("");
  const [excludeSelectValue, setExcludeSelectValue] = useState<string>("");
  const [nepaliValue, setNepaliValue] = useState<string>("");
  const [favoriteValue, setFavoriteValue] = useState<string>("");

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
          locale={i18n.language}
          name="countryPickerSingle"
          onChange={(value: string) => setSingleSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={singleSelectValue}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");

<CountryPicker
  label={t("countryPicker.labels.single")}
  locale={i18n.language}
  name="countryPickerSingle"
  onChange={(value: string) => setSingleSelectValue(value)}
  placeholder={t("countryPicker.placeholders.single")}
  value={singleSelectValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.multipleSelect")}>
        <CountryPicker
          label={t("countryPicker.labels.multiple")}
          locale={i18n.language}
          multiple={true}
          name="countryPickerMultiple"
          onChange={(value: string[]) => setMultipleSelectValue(value)}
          placeholder={t("countryPicker.placeholders.multiple")}
          value={multipleSelectValue}
        />
        <CodeBlock
          exampleCode='
const [multipleSelectValue, setMultipleSelectValue] = useState<string[]>([]);

<CountryPicker
  label={t("countryPicker.labels.multiple")}
  locale={i18n.language}
  multiple={true}
  name="countryPickerMultiple"
  onChange={(value: string[]) => setMultipleSelectValue(value)}
  placeholder={t("countryPicker.placeholders.multiple")}
  value={multipleSelectValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.customData")}>
        <CountryPicker
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
          label={t("countryPicker.labels.single")}
          locale={i18n.language}
          name="countryPickerCustom"
          onChange={(value: string) => setCustomDataValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={customDataValue}
        />
        <CodeBlock
          exampleCode='
const [customDataValue, setCustomDataValue] = useState<string>("");

<CountryPicker
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
  label={t("countryPicker.labels.custom")}
  locale={i18n.language}
  name="countryPickerCustom"
  onChange={(value) => setCustomDataValue(value)}
  placeholder={t("countryPicker.placeholders.custom")}
  value={customDataValue}

/>'
        />
      </Section>

      <Section title={t("countryPicker.include")}>
        <CountryPicker
          include={["US", "GB", "DE", "FR", "JP"]}
          label={t("countryPicker.labels.single")}
          locale={i18n.language}
          name="countryPickerInclude"
          onChange={(value: string) => setIncludeSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={includeSelectValue}
        />
        <CodeBlock
          exampleCode='
const [includeSelectValue, setIncludeSelectValue] = useState<string>("");

<CountryPicker
  include={["US", "GB", "DE", "FR", "JP"]}
  label={t("countryPicker.labels.single")}
  locale={i18n.language}
  name="countryPickerInclude"
  onChange={(value: string) => setIncludeSelectValue(value)}
  placeholder={t("countryPicker.placeholders.single")}
  value={includeSelectValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.exclude")}>
        <CountryPicker
          exclude={["FR", "CN", "BR"]}
          include={["US", "GB", "DE", "FR"]}
          label={t("countryPicker.labels.single")}
          locale={i18n.language}
          name="countryPickerPriority"
          onChange={(value: string) => setExcludeSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={excludeSelectValue}
        />
        <CodeBlock
          exampleCode='
const [excludeSelectValue, setExcludeSelectValue] = useState<string>("");

<CountryPicker
  exclude={["FR", "CN", "BR"]}
  include={["US", "GB", "DE", "FR"]}
  label={t("countryPicker.labels.single")}
  locale={i18n.language}
  onChange={(value: string) => setExcludeSelectValue(value)}
  value={excludeSelectValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.locale")}>
        <CountryPicker
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
          include={["NP", "US", "CN", "GB", "IN"]}
          label={t("countryPicker.labels.single")}
          locale="np"
          name="countryPickerNepali"
          onChange={(value: string) => setNepaliValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={nepaliValue}
        />
        <CodeBlock
          exampleCode='
const [nepaliValue, setNepaliValue] = useState<string>("");

<CountryPicker
 data={[
    { code: "NP", i18n: { np: "नेपाल" } },
    { code: "US", i18n: { np: "संयुक्त राज्य अमेरिका" } },
    { code: "CN", i18n: { np: "चीन" } },
    { code: "GB", i18n: { np: "बेलायत" } },
    { code: "IN", i18n: { np: "भारत" } },
  ]}
  label={t("countryPicker.locale")} 
  locale="np"
  onChange={(value: string) => setNepaliValue(value)}
  placeholder={t("countryPicker.placeholders.single")}
  value={nepaliValue}
 
/>'
        />
      </Section>

      <Section title={t("countryPicker.favorites")}>
        <CountryPicker
          autoSortOptions={false}
          exclude={["FR", "CN", "BR"]}
          favorites={["NP", "US", "GB", "AF"]}
          include={[
            "US",
            "GB",
            "DE",
            "FR",
            "CA",
            "AU",
            "IN",
            "JP",
            "CN",
            "BR",
            "IT",
            "ES",
            "NL",
            "SE",
          ]}
          label={t("countryPicker.labels.multiple")}
          locale={i18n.language}
          multiple={true}
          name="countryPickerFav"
          onChange={(value: string) => setFavoriteValue(value)}
          placeholder={t("countryPicker.placeholders.multiple")}
          value={favoriteValue}
        />
        <CodeBlock
          exampleCode='
const [favoriteValue, setFavoriteValue] = useState<string>("");

<CountryPicker
  autoSortOptions={false}
  exclude={["FR", "CN", "BR"]}
  favorites={["NP", "US", "GB"]} 
  include={["US", "GB", "DE", "FR", "CA", "AU", "IN", "JP", "CN", "BR", "IT", "ES", "NL", "SE"]}
  label={t("countryPicker.labels.multiple")}
  locale={i18n.language}
  multiple={true}
  onChange={(value) => setFavoriteValue(value)}
  placeholder={t("countryPicker.placeholders.multiple")}
  value={favoriteValue}
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
      <Section title={t("countryPicker.typeDefinitions")}>
        <CodeBlock
          exampleCode={`interface Country {
  code: string;
  i18n: {
    en: string;
    fr: string;
    th: string;
    [key: string]: string;
  };
}

type CountryData = {
  code: string;
  i18n?: Partial<Country["i18n"]>;
};`}
        />
      </Section>
    </Page>
  );
};
