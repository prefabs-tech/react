import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  CountryPicker,
  Page,
  Button,
  TDataTable,
} from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import nepaliData from "./np.json";
import { CodeBlock, Section } from "../../../../components/Demo";

export const CountryPickerDemo = () => {
  const [t, i18n] = useTranslation("ui");
  const navigate = useNavigate();
  const locale = i18n.language;

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
      prop: "includeFavorites",
      type: "boolean",
      default: "true",
      description: t("countryPicker.propertiesDescription.includeFavorites"),
    },
    {
      id: 6,
      prop: "label",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.label"),
    },
    {
      id: 7,
      prop: "locale",
      type: "string",
      default: '"en"',
      description: t("countryPicker.propertiesDescription.locale"),
    },
    {
      id: 8,
      prop: "multiple",
      type: "boolean",
      default: "false",
      description: t("countryPicker.propertiesDescription.multiple"),
    },
    {
      id: 9,
      prop: "name",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.name"),
    },

    {
      id: 10,
      prop: "onChange",
      type: "(value: string | string[]) => void",
      default: "-",
      description: t("countryPicker.propertiesDescription.onChange"),
    },
    {
      id: 11,
      prop: "placeholder",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.placeholder"),
    },
    {
      id: 12,
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
          locale={locale}
          name="countryPickerSingle"
          onChange={(value: string) => setSingleSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={singleSelectValue}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const locale = i18n.language;

<CountryPicker
  label={t("countryPicker.labels.single")}
  locale={locale}
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
          locale={locale}
          multiple={true}
          name="countryPickerMultiple"
          onChange={(value: string[]) => setMultipleSelectValue(value)}
          placeholder={t("countryPicker.placeholders.multiple")}
          value={multipleSelectValue}
        />
        <CodeBlock
          exampleCode='
const [multipleSelectValue, setMultipleSelectValue] = useState<string[]>([]);
const locale = i18n.language;

<CountryPicker
  label={t("countryPicker.labels.multiple")}
  locale={locale}
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
          locale={locale}
          name="countryPickerCustom"
          onChange={(value: string) => setCustomDataValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={customDataValue}
        />
        <CodeBlock
          exampleCode='
const [customDataValue, setCustomDataValue] = useState<string>("");
const locale = i18n.language;

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
  locale={locale}
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
          locale={locale}
          name="countryPickerInclude"
          onChange={(value: string) => setIncludeSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={includeSelectValue}
        />
        <CodeBlock
          exampleCode='
const [includeSelectValue, setIncludeSelectValue] = useState<string>("");
const locale = i18n.language;

<CountryPicker
  include={["US", "GB", "DE", "FR", "JP"]}
  label={t("countryPicker.labels.single")}
  locale={locale}
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
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="countryPickerPriority"
          onChange={(value: string) => setExcludeSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={excludeSelectValue}
        />
        <CodeBlock
          exampleCode='
const [excludeSelectValue, setExcludeSelectValue] = useState<string>("");
const locale = i18n.language;

<CountryPicker
  exclude={["FR", "CN", "BR"]}
  label={t("countryPicker.labels.single")}
  locale={locale}
  onChange={(value: string) => setExcludeSelectValue(value)}
  value={excludeSelectValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.locale")}>
        <CountryPicker
          data={nepaliData}
          label={t("countryPicker.labels.single")}
          locale="np"
          name="countryPickerNepali"
          onChange={(value: string) => setNepaliValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={nepaliValue}
        />
        <CodeBlock
          exampleCode='
import nepaliData from "./np.json";

const [nepaliValue, setNepaliValue] = useState<string>("");
const locale = "np";

<CountryPicker
 data={nepaliData}
  label={t("countryPicker.locale")} 
  locale={locale}
  onChange={(value: string) => setNepaliValue(value)}
  placeholder={t("countryPicker.placeholders.single")}
  value={nepaliValue}
 
/>'
        />
      </Section>

      <Section title={t("countryPicker.favorites")}>
        <CountryPicker
          autoSortOptions={false}
          favorites={["NP", "US", "GB", "AF"]}
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="countryPickerFav"
          onChange={(value: string) => setFavoriteValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={favoriteValue}
        />
        <CodeBlock
          exampleCode='
const [favoriteValue, setFavoriteValue] = useState<string>("");
const locale = i18n.language;

<CountryPicker
  autoSortOptions={false}
  favorites={["NP", "US", "GB"]} 
  label={t("countryPicker.labels.single")}
  locale={locale}
  onChange={(value) => setFavoriteValue(value)}
  placeholder={t("countryPicker.placeholders.single")}
  value={favoriteValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.includeFavorites")}>
        <CountryPicker
          autoSortOptions={false}
          favorites={["NP", "US", "GB", "AF"]}
          includeFavorites={false}
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="countryPickerFav"
          onChange={(value: string) => setFavoriteValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={favoriteValue}
        />
        <CodeBlock
          exampleCode='
const [favoriteValue, setFavoriteValue] = useState<string>("");
const locale = i18n.language;

<CountryPicker
  autoSortOptions={false}
  favorites={["NP", "US", "GB"]} 
  includeFavorites={false}
  label={t("countryPicker.labels.single")}
  locale={locale}
  onChange={(value) => setFavoriteValue(value)}
  placeholder={t("countryPicker.placeholders.single")}
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
