import { useTranslation } from "@prefabs.tech/react-i18n";
import { CountryPicker, Page, Button } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { CodeBlock, Section } from "../../../../components/Demo";

export const CountryPickerDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [singleSelectValue, setSingleSelectValue] = useState<string>("");
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [customDataValue, setCustomDataValue] = useState<string>("");

  return (
    <Page
      title="Country Picker"
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

      <Section title="Basic (single select)">
        <CountryPicker
          label="Select Country"
          name="countryPickerSingle"
          locale="fr"
          value={singleSelectValue}
          onChange={(value: string) => setSingleSelectValue(value)}
          placeholder="Select a country..."
        />
        <CodeBlock
          exampleCode='
const [singleSelectValue, setSingleSelectValue] = useState<string>("");

<CountryPicker
  label="Select Country"
  name="countryPickerSingle"
  locale="fr"
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectValue(value)}
  placeholder="Select a country..."
/>'
        />
      </Section>

      <Section title="Multiple selection">
        <CountryPicker
          label="Select Countries"
          name="countryPickerMulti"
          locale="en"
          multiple={true}
          value={multiSelectValue}
          onChange={(value: string[]) => setMultiSelectValue(value)}
          placeholder="Select countries..."
        />
        <CodeBlock
          exampleCode='
const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);

<CountryPicker
  label="Select Countries"
  name="countryPickerMulti"
  locale="en"
  multiple={true}
  value={multiSelectValue}
  onChange={(value: string[]) => setMultiSelectValue(value)}
  placeholder="Select countries..."
/>'
        />
      </Section>
      <Section title="Custom data (overwrite & create)">
        <p>
          This example overwrites "France" (FR) with a custom label and adds a
          new entry for "Mars" (XX).
        </p>
        <CountryPicker
          label="Select Country (with Custom Data)"
          name="countryPickerCustom"
          locale="en"
          value={customDataValue}
          onChange={(value: string) => setCustomDataValue(value)}
          placeholder="Look for Mars or Custom France..."
          data={[
            {
              code: "FR",
              i18n: {
                en: "France (Custom Overwrite)",
                fr: "La France (Custom)",
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
  label="Select Country"
  locale="en"
  value={customDataValue}
  onChange={(value) => setCustomDataValue(value)}
  data={[
    { 
      code: "FR", 
      i18n: { en: "France (Custom Overwrite)" } 
    },
    { 
      code: "XX", 
      i18n: { en: "Mars Republic" } 
    }
  ]}
/>'
        />
      </Section>
    </Page>
  );
};
