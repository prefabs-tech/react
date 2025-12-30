import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  CountryPicker,
  Page,
  Button,
  TDataTable,
} from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import frenchData from "./fr.json";
import nepaliData from "./np.json";
import { CodeBlock, Section } from "../../../../components/Demo";

export const CountryPickerDemo = () => {
  const [t, i18n] = useTranslation("ui");
  const navigate = useNavigate();
  const locale = i18n.language;

  const data = [
    {
      id: 1,
      prop: "i18n",
      type: "Record<string, Record<string, string>>",
      default: "{ en: defaultEnCatalogue }",
      description: t("countryPicker.propertiesDescription.i18n"),
    },
    {
      id: 2,
      prop: "fallbackLocale",
      type: "string",
      default: '"en"',
      description: t("countryPicker.propertiesDescription.fallbackLocale"),
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
      prop: "include",
      type: "string[]",
      default: "[]",
      description: t("countryPicker.propertiesDescription.include"),
    },
    {
      id: 5,
      prop: "exclude",
      type: "string[]",
      default: "[]",
      description: t("countryPicker.propertiesDescription.exclude"),
    },
    {
      id: 6,
      prop: "favorites",
      type: "string[]",
      default: "[]",
      description: t("countryPicker.propertiesDescription.favorites"),
    },
    {
      id: 7,
      prop: "includeFavorites",
      type: "boolean",
      default: "true",
      description: t("countryPicker.propertiesDescription.includeFavorites"),
    },
    {
      id: 8,
      prop: "label",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.label"),
    },
    {
      id: 9,
      prop: "multiple",
      type: "boolean",
      default: "false",
      description: t("countryPicker.propertiesDescription.multiple"),
    },
    {
      id: 10,
      prop: "name",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.name"),
    },
    {
      id: 11,
      prop: "onChange",
      type: "(value: string | string[]) => void",
      default: "-",
      description: t("countryPicker.propertiesDescription.onChange"),
    },
    {
      id: 12,
      prop: "placeholder",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.placeholder"),
    },
    {
      id: 13,
      prop: "value",
      type: "string | string[]",
      default: "-",
      description: t("countryPicker.propertiesDescription.value"),
    },
  ];

  const [singleSelectValue, setSingleSelectValue] = useState<string>("");
  const [multipleSelectValues, setMultipleSelectValues] = useState<string[]>(
    [],
  );
  // const [customDataValue, setCustomDataValue] = useState<string>("");
  const [includeSelectValue, setIncludeSelectValue] = useState<string>("");
  const [excludeSelectValue, setExcludeSelectValue] = useState<string>("");
  const [nepaliValue, setNepaliValue] = useState<string>("");
  const [fallbackValue, setFallbackValue] = useState<string>("");
  const [favoriteValue, setFavoriteValue] = useState<string>("");
  const [includeFavoritesValue, setIncludeFavoritesValue] =
    useState<string>("");

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
const selectedLocale = i18n.language;

<CountryPicker
  label={t("countryPicker.labels.single")}
  locale={selectedLocale}
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
          onChange={(value: string[]) => setMultipleSelectValues(value)}
          placeholder={t("countryPicker.placeholders.multiple")}
          value={multipleSelectValues}
        />
        <CodeBlock
          exampleCode='
const [multipleSelectValues, setMultipleSelectValues] = useState<string[]>([]);
const selectedLocale = i18n.language;

<CountryPicker
  label={t("countryPicker.labels.multiple")}
  locale={selectedLocale}
  multiple={true}
  name="countryPickerMultiple"
  onChange={(value: string[]) => setMultipleSelectValues(value)}
  placeholder={t("countryPicker.placeholders.multiple")}
  value={multipleSelectValues}
/>'
        />
      </Section>

      <Section title={t("countryPicker.locale")}>
        <CountryPicker
          i18n={{ np: nepaliData }}
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

const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const locales = {
  np: nepaliData,
};
const selectedLocale = "np";

<CountryPicker
  i18n={locales}
  locale={selectedLocale}
  onChange={(value: string) => setSingleSelectValue(value)}
  value={singleSelectValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.fallbackLocale")}>
        <CountryPicker
          fallbackLocale="fr"
          i18n={{
            np: nepaliData,
            fr: frenchData,
          }}
          label={t("countryPicker.labels.single")}
          locale="gb"
          name="countryPickerFallback"
          onChange={(value: string) => setFallbackValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={fallbackValue}
        />
        <CodeBlock
          exampleCode='import nepaliData from "./np.json
import frenchData from "./fr.json

const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const locales = {
  np: nepaliData,
  fr: frenchData,
};
const selectedLocale = "gb";
const fallbackLocale = "fr";

<CountryPicker
  i18n={locales}
  locale={selectedLocale}
  fallbackLocale={fallbackLocale}
  label="Fallback Demo"
  onChange={(value: string) => setSingleSelectValue(value)}
  value={singleSelectValue}
/>'
        />
      </Section>
      {/* 
      <Section title={t("countryPicker.customData")}>
        <CountryPicker
          i18n={{
            en: {
              FR: "France",
              XX: "Mars Republic",
            },
            fr: {
              FR: "La France",
              XX: "République de Mars",
            },
          }}
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="countryPickerCustom"
          onChange={(value: string) => setCustomDataValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={customDataValue}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const selectedLocale = i18n.language;

const customEn = {
  FR: "France",
  XX: "Mars Republic",
};

const customFr = {
  FR: "La France",
  XX: "République de Mars",
};

const locales = {
  en: customEn,
  fr: customFr,
};

<CountryPicker
  i18n={locales}
  label={t("countryPicker.labels.custom")}
  locale={selectedLocale}
  onChange={(value) => setSingleSelectValue(value)}
  value={singleSelectValue}
/>'
        />
      </Section> */}

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
const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const selectedLocale = i18n.language;

<CountryPicker
  include={["US", "GB", "DE", "FR", "JP"]}
  label={t("countryPicker.labels.single")}
  locale={selectedLocale}
  onChange={(value: string) => setSingleSelectValue(value)}
  value={singleSelectValue}
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
const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const selectedLocale = i18n.language;

<CountryPicker
  exclude={["FR", "CN", "BR"]}
  label={t("countryPicker.labels.single")}
  locale={selectedLocale}
  onChange={(value: string) => setSingleSelectValue(value)}
  value={singleSelectValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.favorites")}>
        <CountryPicker
          autoSortOptions={false}
          favorites={["NP", "US", "GB"]}
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="countryPickerFav"
          onChange={(value: string) => setFavoriteValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={favoriteValue}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const selectedLocale = i18n.language;

<CountryPicker
  autoSortOptions={false}
  favorites={["NP", "US", "GB"]} 
  label={t("countryPicker.labels.single")}
  locale={selectedLocale}
  onChange={(value) => setSingleSelectValue(value)}
  value={singleSelectValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.includeFavorites")}>
        <CountryPicker
          autoSortOptions={false}
          favorites={["NP", "US", "GB"]}
          includeFavorites={false}
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="countryPickerFav"
          onChange={(value: string) => setIncludeFavoritesValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={includeFavoritesValue}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const selectedLocale = i18n.language;

<CountryPicker
  autoSortOptions={false}
  favorites={["NP", "US", "GB"]} 
  includeFavorites={false}
  label={t("countryPicker.labels.single")}
  locale={selectedLocale}
  onChange={(value) => setSingleSelectValue(value)}
  value={singleSelectValue}
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
          exampleCode={`
type TranslationCatalogue = Record<string, string>;

type I18nConfig = Record<string, TranslationCatalogue>;

Example: 
          { 
            en:{ "US": "USA" }, 
            fr: { "US": "États-Unis" } 
          }
`}
        />
      </Section>
    </Page>
  );
};
