import { Trans, useTranslation } from "@prefabs.tech/react-i18n";
import { CurrencyPicker, Page, Button } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { currencies } from "./data";
import { CodeBlock, Section } from "../../../../components/Demo";

export const CurrencyPickerDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [singleSelectCurrencyValue, setSingleSelectCurrencyValue] =
    useState<string>("");
  const [multiSelectCurrencyValue, setMultiSelectCurrencyValue] = useState<
    string[]
  >([]);
  const [
    extensiveOptionsCurrencyPickerValue,
    setExtensiveOptionsCurrencyPickerValue,
  ] = useState<string>("");

  const options = [
    {
      code: "AUD",
      label: "Australian Dollar",
      symbol: "$",
      value: "AUD",
    },
    { code: "USD", label: "US Dollar", symbol: "$", value: "USD" },
    { code: "GBP", label: "British Pound", symbol: "£", value: "GBP" },
    { code: "EUR", label: "Euro", symbol: "€", value: "EUR" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "JPY" },
    {
      code: "ZAR",
      label: "South African Rand",
      value: "ZAR",
    },
    {
      code: "NPR",
      label: "Nepalese Rupee",
      value: "NPR",
    },
  ];

  return (
    <Page
      title={t("currencyPicker.title")}
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
        <p>{t("common.usage", { component: "CurrencyPicker" })}</p>
        <CodeBlock exampleCode='import { CurrencyPicker } from "@prefabs.tech/react-ui"' />
      </Section>

      <Section title={t("currencyPicker.usage.basic")}>
        <CurrencyPicker
          label={t("currencyPicker.label")}
          name="currencyPicker"
          options={options}
          value={singleSelectCurrencyValue}
          onChange={(value: string) => setSingleSelectCurrencyValue(value)}
          placeholder={t("currencyPicker.placeholder")}
        />
        <CodeBlock
          exampleCode='
const [singleSelectCurrencyValue, setSingleSelectCurrencyValue] = useState<string>("");
        
<CurrencyPicker
  label={t("currencyPicker.label")}
  name="currencyPicker"
  options={[
    { code: "AUD", label: "Australian Dollar", symbol: "$", value: "AUD" },
    { code: "USD", label: "US Dollar", symbol: "$", value: "USD" },
    { code: "GBP", label: "British Pound", symbol: "£", value: "GBP" },
    { code: "EUR", label: "Euro", symbol: "€", value: "EUR" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "JPY" },
    { code: "ZAR", label: "South African Rand", value: "ZAR" },
    { code: "NPR", label: "Nepalese Rupee", value: "NPR" },
  ]}
  value={singleSelectValue}
  onChange={(value: string) => setSingleSelectCurrencyValue(value)}
  placeholder={t("currencyPicker.placeholder")}
/>'
        />
        <p>
          <Trans
            i18nKey={"ui:select.autoSortOptionsInfo"}
            components={{ code: <code /> }}
          ></Trans>
        </p>
      </Section>
      <Section title={t("currencyPicker.usage.multiple")}>
        <CurrencyPicker
          label={t("currencyPicker.label")}
          name="currencyPicker"
          options={options}
          multiple={true}
          value={multiSelectCurrencyValue}
          onChange={(value: string[]) => setMultiSelectCurrencyValue(value)}
          placeholder={t("currencyPicker.multiSelectPlaceholder")}
        />
        <CodeBlock
          exampleCode='
const [multiSelectCurrencyValue, setMultiSelectCurrencyValue] = useState<string[]>([]);
      
<CurrencyPicker
  label={t("currencyPicker.label")}
  name="currencyPicker"
  options={[
    { code: "AUD", label: "Australian Dollar", symbol: "$", value: "AUD" },
    { code: "USD", label: "US Dollar", symbol: "$", value: "USD" },
    { code: "GBP", label: "British Pound", symbol: "£", value: "GBP" },
    { code: "EUR", label: "Euro", symbol: "€", value: "EUR" },
    { code: "JPY", label: "Japanese Yen", symbol: "¥", value: "JPY" },
    { code: "ZAR", label: "South African Rand", value: "ZAR" },
    { code: "NPR", label: "Nepalese Rupee", value: "NPR" },
  ]}
  multiple={true}
  value={multiSelectCurrencyValue}
  onChange={(value: string[]) => setMultiSelectCurrencyValue(value)}
  placeholder={t("currencyPicker.multiSelectPlaceholder")}
  />'
        />
      </Section>
      <Section title={t("currencyPicker.usage.extensiveOptions")}>
        <CurrencyPicker
          label={t("currencyPicker.label")}
          name="currencyPicker"
          options={currencies}
          value={extensiveOptionsCurrencyPickerValue}
          onChange={(value: string) =>
            setExtensiveOptionsCurrencyPickerValue(value)
          }
          placeholder={t("currencyPicker.placeholder")}
        />
        <CodeBlock
          exampleCode='
import { currencies } from "./data";

const [extensiveOptionsCurrencyPickerValue, setExtensiveOptionsCurrencyPickerValue] = useState<string>("");
      
<CurrencyPicker
  label={t("select.label")}
  name="currencyPicker"
  options={currencies}
  value={extensiveOptionsCurrencyPickerValue}
  onChange={(value: string) => setExtensiveOptionsCurrencyPickerValue(value)}
  placeholder={t("currencyPicker.placeholder")}
  searchPlaceholder={t("currencyPicker.searchPlaceholder")}
  />'
        />
      </Section>
    </Page>
  );
};
