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
      default: "{ en: defaultEnCatalogue }",
      description: t("countryPicker.propertiesDescription.i18n"),
      id: 1,
      prop: "i18n",
      type: "Record<string, Record<string, string>>",
    },
    {
      default: '"en"',
      description: t("countryPicker.propertiesDescription.fallbackLocale"),
      id: 2,
      prop: "fallbackLocale",
      type: "string",
    },
    {
      default: "true",
      description: t("countryPicker.propertiesDescription.flags"),
      id: 3,
      prop: "flags",
      type: "Boolean",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.flagsPath"),
      id: 4,
      prop: "flagsPath",
      type: "(code: string) => string",
    },
    {
      default: "left",
      description: t("countryPicker.propertiesDescription.flagsPosition"),
      id: 5,
      prop: "flagsPosition",
      type: "left | right | right-edge",
    },
    {
      default: "rectangular",
      description: t("countryPicker.propertiesDescription.flagsStyle"),
      id: 6,
      prop: "flagsStyle",
      type: "circle | rectangular | square",
    },
    {
      default: '"en"',
      description: t("countryPicker.propertiesDescription.locale"),
      id: 7,
      prop: "locale",
      type: "string",
    },
    {
      default: "[]",
      description: t("countryPicker.propertiesDescription.include"),
      id: 8,
      prop: "include",
      type: "string[]",
    },
    {
      default: "[]",
      description: t("countryPicker.propertiesDescription.exclude"),
      id: 9,
      prop: "exclude",
      type: "string[]",
    },
    {
      default: "[]",
      description: t("countryPicker.propertiesDescription.favorites"),
      id: 10,
      prop: "favorites",
      type: "string[]",
    },
    {
      default: "true",
      description: t("countryPicker.propertiesDescription.includeFavorites"),
      id: 11,
      prop: "includeFavorites",
      type: "boolean",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.groups"),
      id: 12,
      prop: "groups",
      type: "GroupData",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.label"),
      id: 13,
      prop: "label",
      type: "string",
    },
    {
      default: "false",
      description: t("countryPicker.propertiesDescription.multiple"),
      id: 14,
      prop: "multiple",
      type: "boolean",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.name"),
      id: 15,
      prop: "name",
      type: "string",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.onChange"),
      id: 16,
      prop: "onChange",
      type: "(value: string | string[]) => void",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.placeholder"),
      id: 17,
      prop: "placeholder",
      type: "string",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.value"),
      id: 18,
      prop: "value",
      type: "string | string[]",
    },
  ];

  const [customFlagsSelectValue, setCustomFlagsSelectValue] =
    useState<string>("");
  const [singleSelectValue, setSingleSelectValue] = useState<string>("");
  const [multipleSelectValues, setMultipleSelectValues] = useState<string[]>(
    [],
  );
  const [includeSelectValue, setIncludeSelectValue] = useState<string>("");
  const [excludeSelectValue, setExcludeSelectValue] = useState<string>("");
  const [nepaliValue, setNepaliValue] = useState<string>("");
  const [fallbackValue, setFallbackValue] = useState<string>("");
  const [favoriteValue, setFavoriteValue] = useState<string>("");
  const [flagsSelectValue, setFlagsSelectValue] = useState<string>("");
  const [includeFavoritesValue, setIncludeFavoritesValue] =
    useState<string>("");
  const [groupedValue, setGroupedValue] = useState<string>("");
  const [customGroupValue, setCustomGroupValue] = useState<string>("");
  const [favoriteGroupValue, setFavoriteGroupValue] = useState<string>("");

  const customFlagsPath = (code: string) => {
    return `https://flagcdn.com/${code.toLowerCase().trim()}.svg`;
  };

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
          placeholder={t("countryPicker.placeholders.single")}
          value={singleSelectValue}
          onChange={(value: string) => setSingleSelectValue(value)}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const selectedLocale = i18n.language;

<CountryPicker
  label={t("countryPicker.labels.single")}
  locale={selectedLocale}
  name="countryPickerSingle"
  placeholder={t("countryPicker.placeholders.single")}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
/>'
        />
      </Section>

      <Section title={t("countryPicker.multipleSelect")}>
        <CountryPicker
          label={t("countryPicker.labels.multiple")}
          locale={locale}
          multiple={true}
          name="countryPickerMultiple"
          placeholder={t("countryPicker.placeholders.multiple")}
          value={multipleSelectValues}
          onChange={(value: string[]) => setMultipleSelectValues(value)}
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
  placeholder={t("countryPicker.placeholders.multiple")}
  value={multipleSelectValues}
  onChange={(value: string[]) => setMultipleSelectValues(value)}
/>'
        />
      </Section>

      <Section title={t("countryPicker.locale")}>
        <CountryPicker
          i18n={{ np: nepaliData }}
          label={t("countryPicker.labels.single")}
          locale="np"
          name="countryPickerNepali"
          placeholder={t("countryPicker.placeholders.single")}
          value={nepaliValue}
          onChange={(value: string) => setNepaliValue(value)}
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
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
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
          placeholder={t("countryPicker.placeholders.single")}
          value={fallbackValue}
          onChange={(value: string) => setFallbackValue(value)}
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
  fallbackLocale={fallbackLocale}
  i18n={locales}
  locale={selectedLocale}
  label="Fallback Demo"
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
/>'
        />
      </Section>

      <Section title={t("countryPicker.flagsStyle")}>
        <CountryPicker
          flagsPosition="right-edge"
          flagsStyle="circle"
          label={t("countryPicker.labels.single")}
          name="countryPickerFlags"
          placeholder={t("countryPicker.placeholders.single")}
          value={flagsSelectValue}
          onChange={(value: string) => setFlagsSelectValue(value)}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");

<CountryPicker
  flagsPosition="right-edge"
  flagsStyle="circle"
  label={t("countryPicker.labels.single")}
  name="country-picker"
  placeholder={t("countryPicker.placeholders.single")}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
/>'
        />
      </Section>

      <Section title={t("countryPicker.customFlagsPath")}>
        <CountryPicker
          flagsPath={customFlagsPath}
          label={t("countryPicker.labels.single")}
          name="countryPickerCustomFlags"
          placeholder={t("countryPicker.placeholders.single")}
          value={customFlagsSelectValue}
          onChange={(value: string) => setCustomFlagsSelectValue(value)}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");

const flagsPath = (code: string) => {
  return `https://flagcdn.com/${code.toLowerCase().trim()}.svg`;
};

<CountryPicker
  flagsPath={flagsPath}
  label={t("countryPicker.labels.single")}
  name="country-picker"
  placeholder={t("countryPicker.placeholders.single")}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
/>'
        />
      </Section>

      <Section title={t("countryPicker.include")}>
        <CountryPicker
          include={["US", "GB", "DE", "FR", "JP"]}
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="countryPickerInclude"
          placeholder={t("countryPicker.placeholders.single")}
          value={includeSelectValue}
          onChange={(value: string) => setIncludeSelectValue(value)}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const selectedLocale = i18n.language;

<CountryPicker
  include={["US", "GB", "DE", "FR", "JP"]}
  label={t("countryPicker.labels.single")}
  locale={selectedLocale}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
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
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
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
          placeholder={t("countryPicker.placeholders.single")}
          value={favoriteValue}
          onChange={(value: string) => setFavoriteValue(value)}
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
  value={singleSelectValue}
  onChange={(value) => setSingleSelectValue(value)}
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
          placeholder={t("countryPicker.placeholders.single")}
          value={includeFavoritesValue}
          onChange={(value: string) => setIncludeFavoritesValue(value)}
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
  value={singleSelectValue}
  onChange={(value) => setSingleSelectValue(value)}
/>'
        />
      </Section>

      <Section title={t("countryPicker.groupingDefault")}>
        <CountryPicker
          autoSortOptions={false}
          groups={{
            "European Union": defaultGroups?.EU || [],
            ASEAN: defaultGroups?.ASEAN || [],
          }}
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="groupingDefault"
          placeholder={t("countryPicker.placeholders.single")}
          value={groupedValue}
          onChange={(value: string | number | (string | number)[]) =>
            setGroupedValue(value as string)
          }
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
  locale={locale}
  name="countryPicker"
  placeholder={t("countryPicker.placeholders.single")}
  value={groupedValue}
  onChange={(value) => setGroupedValue(value)}
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
          locale={locale}
          name="groupingCustom"
          placeholder={t("countryPicker.placeholders.single")}
          value={customGroupValue}
          onChange={(value: string | number | (string | number)[]) =>
            setCustomGroupValue(value as string)
          }
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
  locale={locale}
  name="countryPicker"
  placeholder={t("countryPicker.placeholders.single")}
  value={customGroupValue}
  onChange={(value) => setCustomGroupValue(value)}
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
          locale={locale}
          name="groupingFavorites"
          placeholder={t("countryPicker.placeholders.single")}
          value={favoriteGroupValue}
          onChange={(value: string | number | (string | number)[]) =>
            setFavoriteGroupValue(value as string)
          }
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
  locale={locale}
  name="countryPicker"
  placeholder={t("countryPicker.placeholders.single")}
  value={favoriteGroupValue}
  onChange={(value) => setFavoriteGroupValue(value)}
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
