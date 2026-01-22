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

  const customFlagsPath = (code: string) => {
    return `https://flagcdn.com/${code.toLowerCase().trim()}.svg`;
  };

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
      prop: "flagsPath",
      type: "(code: string) => string",
      default: "undefined",
      description: t("countryDisplay.propertiesDescription.flagsPath"),
    },
    {
      id: 5,
      prop: "flagsPosition",
      type: '"left" | "right" | "right-edge"',
      default: '"left"',
      description: t("countryDisplay.propertiesDescription.flagsPosition"),
    },
    {
      id: 6,
      prop: "flagsStyle",
      type: '"circle" | "rectangular" | "square"',
      default: '"rectangular"',
      description: t("countryDisplay.propertiesDescription.flagsStyle"),
    },
    {
      id: 7,
      prop: "locale",
      type: "string",
      default: "en",
      description: t("countryDisplay.propertiesDescription.locale"),
    },
    {
      id: 8,
      prop: "locales",
      type: "Record<string, Record<string, string>>",
      default: "{}",
      description: t("countryDisplay.propertiesDescription.i18n"),
    },
    {
      id: 9,
      prop: "renderOption",
      type: "(code: string, label: string) => ReactNode",
      default: "undefined",
      description: t("countryDisplay.propertiesDescription.renderOption"),
    },
    {
      id: 10,
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
  locale={selectedLocale} 
  locales={locales} 
/>'
        />
      </Section>

      <Section title={t("countryDisplay.locale")}>
        <Country
          code="EG"
          locale={selectedLocale}
          locales={{ fr: frenchData, en: englishData }}
        />
        <CodeBlock
          exampleCode='import frenchData from "./fr.json";
import englishData from "./en.json";

locales = { fr: frenchData, en: englishData }
selectedLocale = i18n.language

<Country 
  code="EG"
  locale={selectedLocale}
  locales={locales}
/>'
        />
      </Section>

      <Section title={t("countryDisplay.fallback")}>
        <Country
          code="GB"
          fallbackLocale="np"
          locale={selectedLocale}
          locales={{ np: nepaliData, en: englishData }}
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
  locale={selectedLocale} 
  locales={locales} 
/>'
        />
      </Section>

      <Section title={t("countryDisplay.showFlag")}>
        <Country code="CA" showFlag={false} />
        <CodeBlock exampleCode='<Country code="CA" showFlag={false} />' />
      </Section>

      <Section title={t("countryDisplay.flagsStyle")}>
        <h3>{t("countryDisplay.styles.rectangular")}</h3>
        <Country code="US" flagsStyle="rectangular" />
        <CodeBlock exampleCode='<Country code="US" />' />

        <h3>{t("countryDisplay.styles.square")}</h3>
        <Country code="US" flagsStyle="square" />
        <CodeBlock exampleCode='<Country code="US" flagsStyle="square" />' />

        <h3>{t("countryDisplay.styles.circle")}</h3>
        <Country code="US" flagsStyle="circle" />
        <CodeBlock exampleCode='<Country code="US" flagsStyle="circle" />' />
      </Section>

      <Section title={t("countryDisplay.flagsPosition")}>
        <h3>{t("countryDisplay.positions.left")}</h3>
        <Country code="BR" flagsPosition="left" />
        <CodeBlock exampleCode='<Country code="BR" />' />

        <h3>{t("countryDisplay.positions.right")}</h3>
        <Country code="BR" flagsPosition="right" />
        <CodeBlock exampleCode='<Country code="BR" flagsPosition="right" />' />

        <h3>{t("countryDisplay.positions.rightEdge")}</h3>
        <Country code="BR" flagsPosition="right-edge" />
        <CodeBlock exampleCode='<Country code="BR" flagsPosition="right-edge" />' />
      </Section>

      <Section title={t("countryDisplay.customFlagsPath", "Custom Flag Path")}>
        <Country code="CA" flagsPath={customFlagsPath} />
        <CodeBlock
          exampleCode={`const flagsPath = (code: string) => {
  return \`https://flagcdn.com/\${code.toLowerCase().trim()}.svg\`;
};

<Country 
  code="CA" 
  flagsPath={customFlagsPath} 
/>`}
        />
      </Section>

      <Section title={t("countryDisplay.renderOption")}>
        <Country
          code="JP"
          renderOption={(code, label) => (
            <div className="custom-render">
              <span
                className={`flag-icon flag-icon-${code.toLowerCase()} flag-icon-rounded`}
              />
              <span className="font-bold text-sm">{label}</span>
            </div>
          )}
        />

        <CodeBlock
          exampleCode={`@import "./country.css";

<Country
  code="JP"
  renderOption={(code, label) => (
    <div className="custom-render">
      <span className={\`flag-icon flag-icon-\${code.toLowerCase()} flag-icon-rounded\`}></span>
      <span>{label}</span>
    </div>
  )}
/>`}
        />
      </Section>

      <Section title={t("countryDisplay.notFound")}>
        <div className="country-wrapper">
          <span>Country</span>
          <Country code="WW" />
        </div>
        <CodeBlock exampleCode='<Country code="WW" />' />
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
  flagsPath?: (code: string) => string;
  flagsPosition?: "left" | "right" | "right-edge";
  flagsStyle?: "circle" | "rectangular" | "square";
  locale?: string;          
  locales?: I18nData;         
  showFlag?: boolean;
  renderOption?: (code: string, label: string) => React.ReactNode;
}
`}
        />
      </Section>
    </Page>
  );
};
