import { useTranslation } from "@prefabs.tech/react-i18n";
import {
  Button,
  CountryPicker,
  Page,
  TDataTable,
} from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";
import englishData from "./en.json";
import frenchData from "./fr.json";
import nepaliData from "./np.json";

export const CountryPickerDemo = () => {
  import("@prefabs.tech/react-ui/dist/PrefabsTechFlagIcon.css");

  const [t, i18n] = useTranslation("ui");
  const navigate = useNavigate();
  const locale = i18n.language;

  const frenchTranslation = {
    ...frenchData,
    ASEAN: "ASEAN",
    EU: "Union Européenne",
  };
  const englishTranslation = {
    ...englishData,
    ASEAN: "ASEAN",
    EU: "European Union",
  };

  const data = [
    {
      default: "true",
      description: t("countryPicker.propertiesDescription.autoSortOptions"),
      id: 1,
      prop: "autoSortOptions",
      type: "boolean",
    },
    {
      default: "[]",
      description: t("countryPicker.propertiesDescription.exclude"),
      id: 2,
      prop: "exclude",
      type: "string[]",
    },
    {
      default: '"en"',
      description: t("countryPicker.propertiesDescription.fallbackLocale"),
      id: 3,
      prop: "fallbackLocale",
      type: "string",
    },
    {
      default: "[]",
      description: t("countryPicker.propertiesDescription.favorites"),
      id: 4,
      prop: "favorites",
      type: "string[]",
    },
    {
      default: "true",
      description: t("countryPicker.propertiesDescription.flags"),
      id: 5,
      prop: "flags",
      type: "Boolean",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.flagsPath"),
      id: 6,
      prop: "flagsPath",
      type: "(code: string) => string",
    },
    {
      default: "left",
      description: t("countryPicker.propertiesDescription.flagsPosition"),
      id: 7,
      prop: "flagsPosition",
      type: "left | right | right-edge",
    },
    {
      default: "rectangular",
      description: t("countryPicker.propertiesDescription.flagsStyle"),
      id: 8,
      prop: "flagsStyle",
      type: "circle | rectangular | square",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.groups"),
      id: 9,
      prop: "groups",
      type: "Groups",
    },
    {
      default: "[]",
      description: t("countryPicker.propertiesDescription.include"),
      id: 10,
      prop: "include",
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
      description: t("countryPicker.propertiesDescription.label"),
      id: 12,
      prop: "label",
      type: "string",
    },
    {
      default: '"en"',
      description: t("countryPicker.propertiesDescription.locale"),
      id: 13,
      prop: "locale",
      type: "string",
    },
    {
      default: "{ en: defaultEnCatalogue }",
      description: t("countryPicker.propertiesDescription.i18n"),
      id: 14,
      prop: "locales",
      type: "Record<string, Record<string, string>>",
    },
    {
      default: "false",
      description: t("countryPicker.propertiesDescription.multiple"),
      id: 15,
      prop: "multiple",
      type: "boolean",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.name"),
      id: 16,
      prop: "name",
      type: "string",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.onChange"),
      id: 17,
      prop: "onChange",
      type: "(value: string | string[]) => void",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.placeholder"),
      id: 18,
      prop: "placeholder",
      type: "string",
    },
    {
      default: "-",
      description: t("countryPicker.propertiesDescription.value"),
      id: 19,
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
  const [customGroupValue, setCustomGroupValue] = useState<string>("");
  const [favoriteGroupValue, setFavoriteGroupValue] = useState<string>("");
  const [translationGroupValue, setTranslationGroupValue] =
    useState<string>("");

  const customFlagsPath = (code: string) => {
    return `https://flagcdn.com/${code.toLowerCase().trim()}.svg`;
  };

  return (
    <Page
      title={t("countryPicker.title")}
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
  placeholder={t("countryPicker.placeholders.multiple")}
  value={multipleSelectValues}
  onChange={(value: string[]) => setMultipleSelectValues(value)}
/>'
        />
      </Section>

      <Section title={t("countryPicker.locale")}>
        <CountryPicker
          label={t("countryPicker.labels.single")}
          locale="np"
          locales={{ np: nepaliData }}
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
  locales={locales}
  locale={selectedLocale}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
/>'
        />
      </Section>

      <Section title={t("countryPicker.fallbackLocale")}>
        <CountryPicker
          fallbackLocale="fr"
          label={t("countryPicker.labels.single")}
          locale="gb"
          locales={{
            fr: frenchData,
            np: nepaliData,
          }}
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
  fallbackLocale={fallbackLocale}
  locales={locales}
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
          onChange={(value: string) => setFlagsSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={flagsSelectValue}
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
          onChange={(value: string) => setCustomFlagsSelectValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={customFlagsSelectValue}
        />
        <CodeBlock
          exampleCode={`
const [singleSelectValue, setSingleSelectValue] = useState<string>("");

const flagsPath = (code: string) => {
  return \`https://flagcdn.com/\${code.toLowerCase().trim()}.svg\`;
};

<CountryPicker
  flagsPath={flagsPath}
  label={t("countryPicker.labels.single")}
  name="countryPicker"
  placeholder={t("countryPicker.placeholders.single")}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
/>`}
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
          favorites={["NP", "US", "GB"]}
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="favoriteCountry"
          onChange={(value: string) => setFavoriteValue(value)}
          placeholder={t("countryPicker.placeholders.single")}
          value={favoriteValue}
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");
const selectedLocale = i18n.language;

<CountryPicker
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
          groups={{
            "European Hubs": ["GB", "DE", "FR"],
            "North America HQ": ["US", "CA"],
            "Offshore Dev Center": ["IN", "VN", "PH"],
          }}
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="groupingCustom"
          onChange={(value: (number | string)[] | number | string) =>
            setCustomGroupValue(value as string)
          }
          placeholder={t("countryPicker.placeholders.single")}
          value={customGroupValue}
        />
        <CodeBlock
          exampleCode='
const groups = {
  "North America HQ": ["US", "CA"],
  "Offshore Dev Center": ["IN", "VN", "PH"],
  "European Hubs": ["GB", "DE", "FR"]
};

<CountryPicker
  groups={groups}
  label={t("countryPicker.labels.single")}
  locale={locale}
  name="countryPicker"
  placeholder={t("countryPicker.placeholders.single")}
  value={customGroupValue}
  onChange={(value) => setSingleSelectValue(value)}
/>'
        />
      </Section>

      <Section title={t("countryPicker.groupingWithTranslation")}>
        <CountryPicker
          groups={{
            ASEAN: ["VN", "TH", "SG"],
            EU: ["FR", "DE", "IT", "ES"],
          }}
          label={t("countryPicker.labels.single")}
          locale={locale}
          locales={{ en: englishTranslation, fr: frenchTranslation }}
          name="groupingTranslationKeys"
          onChange={(value: (number | string)[] | number | string) =>
            setTranslationGroupValue(value as string)
          }
          placeholder={t("countryPicker.placeholders.single")}
          value={translationGroupValue}
        />
        <CodeBlock
          exampleCode='import englishData from "./locales/en.json";
import frenchData from "./locales/fr.json";

 const frenchTranslation = {
    ...frenchData,
    EU: "Union Européenne",
    ASEAN: "ASEAN",
  };

const englishTranslation = {
    ...englishData,
    EU: "European Union",
    ASEAN: "ASEAN",
  };

const locales = { en: englishTranslation, fr: frenchTranslation };
const selectedLocale = i18n.language;

const groups = {
  "EU": ["FR", "DE", "IT", "ES"],
  "ASEAN": ["VN", "TH", "SG"]
};

<CountryPicker
  groups={groups}
  locale={selectedLocale}
  locales={locales}
  value={value}
  onChange={(value) => setSingleSelectValue(value)}
/>'
        />
      </Section>

      <Section title={t("countryPicker.groupingFavorites")}>
        <CountryPicker
          autoSortOptions={false}
          favorites={["US", "FR"]}
          groups={{
            Europe: ["FR", "DE", "IT", "ES"],
            "North America": ["US", "CA"],
          }}
          label={t("countryPicker.labels.single")}
          locale={locale}
          name="groupingFavorites"
          onChange={(value: (number | string)[] | number | string) =>
            setFavoriteGroupValue(value as string)
          }
          placeholder={t("countryPicker.placeholders.single")}
          value={favoriteGroupValue}
        />
        <CodeBlock
          exampleCode='
<CountryPicker
  autoSortOptions={false}
  favorites={["US", "FR"]}
  groups={{
    "North America": ["US", "CA"],
    Europe: ["FR", "DE", "IT", "ES"],
  }}
  label={t("countryPicker.labels.single")}
  locale={locale}
  name="countryPicker"
  placeholder={t("countryPicker.placeholders.single")}
  value={favoriteGroupValue}
  onChange={(value) => setSingleSelectValue(value)}
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
type Translation = Record<string, string>;

type Locales = Record<string, Translation>;

type Groups = Record<string, string[]>;

Example Locales: 
  { 
    en:{ "US": "USA" }, 
    fr: { "US": "États-Unis" } 
  }

Example Groups:
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
