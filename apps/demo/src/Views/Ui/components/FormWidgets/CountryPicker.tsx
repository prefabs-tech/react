import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  CountryPicker,
  Page,
  Button,
  TDataTable,
  defaultGroups,
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
      prop: "groups",
      type: "GroupConfig",
      default: "-",
      description: t("countryPicker.propertiesDescription.groups"),
    },
    {
      id: 9,
      prop: "label",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.label"),
    },
    {
      id: 10,
      prop: "multiple",
      type: "boolean",
      default: "false",
      description: t("countryPicker.propertiesDescription.multiple"),
    },
    {
      id: 11,
      prop: "name",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.name"),
    },
    {
      id: 12,
      prop: "onChange",
      type: "(value: string | string[]) => void",
      default: "-",
      description: t("countryPicker.propertiesDescription.onChange"),
    },
    {
      id: 13,
      prop: "placeholder",
      type: "string",
      default: "-",
      description: t("countryPicker.propertiesDescription.placeholder"),
    },
    {
      id: 14,
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
  const [includeSelectValue, setIncludeSelectValue] = useState<string>("");
  const [excludeSelectValue, setExcludeSelectValue] = useState<string>("");
  const [nepaliValue, setNepaliValue] = useState<string>("");
  const [fallbackValue, setFallbackValue] = useState<string>("");
  const [favoriteValue, setFavoriteValue] = useState<string>("");
  const [includeFavoritesValue, setIncludeFavoritesValue] =
    useState<string>("");
  const [groupedValue, setGroupedValue] = useState<string>("");
  const [customGroupValue, setCustomGroupValue] = useState<string>("");
  const [favoriteGroupValue, setFavoriteGroupValue] = useState<string>("");

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

      <Section title={t("countryPicker.groupingDefault")}>
        <CountryPicker
          autoSortOptions={false}
          groups={{
            EU: defaultGroups?.EU || [],
            ASEAN: defaultGroups?.ASEAN || [],
          }}
          label={t("countryPicker.labels.single")}
          placeholder={t("countryPicker.placeholders.single")}
          locale={locale}
          name="groupingDefault"
          onChange={(value: string | number | (string | number)[]) =>
            setGroupedValue(value as string)
          }
          value={groupedValue}
        />
        <CodeBlock
          exampleCode='
import { CountryPicker, defaultGroups } from "@prefabs.tech/react-ui";

<CountryPicker
  autoSortOptions={false}
  groups={{
    "European Union": defaultGroups.EU,
    "ASEAN": defaultGroups.ASEAN
  }}
  label={t("countryPicker.labels.single")}
  placeholder={t("countryPicker.placeholders.single")}
  name="groupingDefault"
  locale={locale}
  onChange={(value) => setGroupedValue(value)}
  value={groupedValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.groupingCustom")}>
        <CountryPicker
          autoSortOptions={false}
          groups={{
            "North America HQ": ["US", "CA"],
            "Offshore Dev Center": ["IN", "VN", "PH"],
            "European Hubs": ["GB", "DE", "FR"],
          }}
          label={t("countryPicker.labels.single")}
          placeholder={t("countryPicker.placeholders.single")}
          locale={locale}
          name="groupingCustom"
          onChange={(value: string | number | (string | number)[]) =>
            setCustomGroupValue(value as string)
          }
          value={customGroupValue}
        />
        <CodeBlock
          exampleCode='
const myRegions = {
  "North America HQ": ["US", "CA"],
  "Offshore Dev Center": ["IN", "VN", "PH"],
  "European Hubs": ["GB", "DE", "FR"]
};

<CountryPicker
  autoSortOptions={false}
  groups={myRegions}
  label={t("countryPicker.labels.single")}
  placeholder={t("countryPicker.placeholders.single")}
  name="groupingCustom"
  locale={locale}
  onChange={(value) => setCustomGroupValue(value)}
  value={customGroupValue}
/>'
        />
      </Section>

      <Section title={t("countryPicker.groupingFavorites")}>
        <CountryPicker
          autoSortOptions={false}
          favorites={["FR", "US"]}
          groups={{
            Europe: ["FR", "DE", "IT", "ES"],
            "North America": ["US", "CA"],
          }}
          label={t("countryPicker.labels.single")}
          placeholder={t("countryPicker.placeholders.single")}
          locale={locale}
          onChange={(value: string | number | (string | number)[]) =>
            setFavoriteGroupValue(value as string)
          }
          name="groupingFavorites"
          value={favoriteGroupValue}
        />
        <CodeBlock
          exampleCode='
<CountryPicker
  autoSortOptions={false}
  favorites={["FR", "US"]}
  groups={{
    "Europe": ["FR", "DE", "IT", "ES"],
    "North America": ["US", "CA"]
  }}
  label={t("countryPicker.labels.single")}
  placeholder={t("countryPicker.placeholders.single")}
  locale={locale}
  name="groupingFavorites"
  onChange={(value) => setFavoriteGroupValue(value)}
  value={favoriteGroupValue}
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

type I18nData = Record<string, TranslationCatalogue>;

type GroupData = Record<string, string[]>;

Example I18n: 
  { 
    en:{ "US": "USA" }, 
    fr: { "US": "États-Unis" } 
  }

Example Group:
  {
    "European Union": ["AT", "BE", "FR", "DE"],
    "North America": ["US", "CA", "MX"]
  }
`}
        />
      </Section>
    </Page>
  );
};
