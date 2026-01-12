import { i18n, useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, TDataTable, Country } from "@prefabs.tech/react-ui";
import { useNavigate } from "react-router-dom";

import englishData from "./en.json";
import { CodeBlock, Section } from "../../../../components/Demo";
import frenchData from "../FormWidgets/fr.json";
import nepaliData from "../FormWidgets/np.json";
import "../../../../assets/css/country.css";

export const CountryDisplayDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();
  const selectedLocale = i18n.language;

  const data = [
    {
      id: 1,
      prop: "className",
      type: "string",
      default: '""',
      description: t("countryDisplay.propertiesDescription.className"),
    },
    {
      id: 2,
      prop: "code",
      type: "string",
      default: "-",
      description: t("countryDisplay.propertiesDescription.code"),
    },
    {
      id: 3,
      prop: "fallbackLocale",
      type: "string",
      default: '"en"',
      description: t("countryDisplay.propertiesDescription.fallbackLocale"),
    },
    {
      id: 4,
      prop: "locales",
      type: "Record<string, Record<string, string>>",
      default: "{}",
      description: t("countryDisplay.propertiesDescription.i18n"),
    },
    {
      id: 5,
      prop: "locale",
      type: "string",
      default: "en",
      description: t("countryDisplay.propertiesDescription.locale"),
    },
    {
      id: 6,
      prop: "showFlag",
      type: "boolean",
      default: "true",
      description: t("countryDisplay.propertiesDescription.showFlag"),
    },
  ];

  return (
    <Page
      title={t("countryDisplay.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back", "Back")}
          variant="textOnly"
          onClick={() => navigate("..")}
        />
      }
    >
      <Section title={t("headers.usage")}>
        <p>{t("common.usage", { component: "Country" })}</p>
        <CodeBlock exampleCode='import { Country } from "@prefabs.tech/react-ui"' />
      </Section>

      <Section title={t("countryDisplay.basic")}>
        <Country code="US" />
        <CodeBlock exampleCode='<Country code="US" />' />
      </Section>

      <Section title={t("countryDisplay.customLocale")}>
        <Country
          code="NP"
          locale="np"
          locales={{
            np: nepaliData,
          }}
        />
        <CodeBlock
          exampleCode='import nepaliData from "./np.json";

const locales = {
  np: nepaliData,
};
const selectedLocale = "np";

<Country 
  code="NP" 
  locales={locales} 
  locale={selectedLocale} 
/>'
        />
      </Section>

      <Section title={t("countryDisplay.locale")}>
        <Country
          code="EG"
          locales={{ fr: frenchData, en: englishData }}
          locale={selectedLocale}
        />
        <CodeBlock
          exampleCode='import frenchData from "./fr.json";
import englishData from "./en.json";

locales = { fr: frenchData, en: englishData }
selectedLocale = i18n.language

<Country 
  code="EG" 
  i18n={locales} 
  locale={selectedLocale} 
/>'
        />
      </Section>

      <Section title={t("countryDisplay.fallback")}>
        <Country
          code="GB"
          fallbackLocale="np"
          locales={{ np: nepaliData, en: englishData }}
          locale={selectedLocale}
        />
        <CodeBlock
          exampleCode='import englishData from "./en.json";
import nepaliData from "./np.json";

const locales = {
  en: englishData,
  np: nepaliData,
};
selectedLocale = i18n.language;
fallbackLocale = np;

<Country 
  code="GB" 
  fallbackLocale={fallbackLocale} 
  locales={locales} 
  locale={selectedLocale} 
/>'
        />
      </Section>

      <Section title={t("countryDisplay.notFound")}>
        <div className="country-wrapper">
          <span>Country</span>
          <Country code="WW" />
        </div>
        <CodeBlock exampleCode='<Country code="WW" />' />
      </Section>

      <Section title={t("countryDisplay.showFlag")}>
        <Country code="CA" showFlag={false} />
        <CodeBlock exampleCode='<Country code="CA" showFlag={false} />' />
      </Section>

      <Section
        title={t("headers.propertiesValue", {
          value: "Country",
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
      <Section title={t("countryDisplay.typeDefinitions")}>
        <CodeBlock
          exampleCode={`type Locales = Record<string, Record<string, string>>;

interface CountryDisplayProperties {
  code: string;
  className?: string;
  fallbackLocale?: string;  
  locales?: Locales;         
  locale?: string;          
  showFlag?: boolean;
}

Example locales:
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
