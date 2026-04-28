import {
  CheckboxInput,
  CurrencyPicker,
  DateInput,
  Email,
  FormActions,
  NumberInput,
  Password,
  RadioInput,
  Select,
  TextInput,
  Typeahead,
  useFormContext,
} from "@prefabs.tech/react-form";
import { Textarea } from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { useEffect, useState } from "react";

import { FormInputModes } from "./FormInputModes";

type Properties = {
  checkFilledState: (data: boolean) => void;
};

export const FormInputFields = ({ checkFilledState }: Properties) => {
  const [t] = useTranslation("form");
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [options, setOptions] = useState<any>([]);
  const {
    formState: { errors, submitCount }, // eslint-disable-line @typescript-eslint/no-unused-vars
    getFieldState,
    register,
    watch,
  } = useFormContext();

  const [filled, valid, invalid] = watch(["filled", "valid", "invalid"]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDataFetch = (value: any) => {
    setIsLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products/?title=${value}`)
      .then(async (response) => {
        const data = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setOptions(data.map((item: any) => item));
        setIsLoading(false);
      })
      .catch((err) => console.log("err", err)); // eslint-disable-line no-console
  };

  useEffect(() => {
    checkFilledState(filled);
  }, [filled, checkFilledState]);

  return (
    <>
      <FormInputModes filled={filled} />
      <Email
        label={t("formInput.label.email")}
        name="email"
        placeholder={t("formInput.placeHolder.email")}
        showInvalidState={invalid}
        showValidState={valid}
        submitCount={submitCount}
      />
      <TextInput
        label={t("formInput.label.text")}
        name="name"
        placeholder={t("formInput.placeHolder.text")}
        showInvalidState={invalid}
        showValidState={valid}
        submitCount={submitCount}
      />
      <Password
        getFieldState={getFieldState}
        label={t("formInput.label.password")}
        name="password"
        register={register}
        showInvalidState={invalid}
        showValidState={valid}
        submitCount={submitCount}
      />
      <NumberInput
        label={t("formInput.label.number")}
        name="number"
        placeholder={t("formInput.placeHolder.number")}
        showInvalidState={invalid}
        showValidState={valid}
        submitCount={submitCount}
      />
      <Textarea
        label={t("formInput.label.text")}
        name="text"
        placeholder={t("formInput.placeHolder.text")}
        showInvalidState={invalid}
        showValidState={valid}
        submitCount={submitCount}
      />
      <Select
        label={t("formInput.label.select")}
        multiple={true}
        name="select"
        options={[
          { label: "FR", value: "FR" },
          { label: "DE", value: "DE" },
          { label: "BE", value: "BE" },
          { label: "FE", value: "FE" },
          { label: "RE", value: "RE" },
        ]}
        placeholder={t("formInput.placeHolder.select")}
        showInvalidState={invalid}
        showValidState={valid}
        submitCount={submitCount}
      />
      <CurrencyPicker
        label={t("formInput.label.currencyPicker")}
        name="currencyPicker"
        options={[
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
        ]}
        placeholder={t("formInput.placeHolder.currencyPicker")}
        showInvalidState={invalid}
        showValidState={valid}
        submitCount={submitCount}
      />
      <Email
        defaultValue="monorepo@gmail.com"
        disabled={true}
        label={t("formInput.label.disabled")}
        name="disabled"
      />
      <Email
        defaultValue="monorepo@gmail.com"
        label={t("formInput.label.readOnly")}
        name="readOnly"
        readOnly={true}
      />
      <DateInput
        getFieldState={getFieldState}
        label={t("formInput.label.dateInput")}
        max={new Date()}
        min="2025-04-01"
        name="date"
        register={register}
        showInvalidState={invalid}
        showValidState={valid}
        submitCount={submitCount}
      />
      <Typeahead
        data={options}
        debounceTime={500}
        label={t("formInput.label.typeahead")}
        loading={isLoading}
        name="typeahead"
        onSearch={handleDataFetch}
        placeholder={t("formInput.placeHolder.typeahead")}
        showInvalidState={invalid}
        showValidState={valid}
        submitCount={submitCount}
        suggestionLabel="title"
      />
      <RadioInput
        label={t("formInput.label.radioInput")}
        name="radioInput"
        options={[
          { label: "One", value: "value 1" },
          { label: "Two", value: "value 2" },
          { label: "Three", value: "value 3" },
        ]}
      />
      <CheckboxInput
        direction={"horizontal"}
        label={t("formInput.label.checkboxInput")}
        name="checkboxInput"
        options={[
          { label: "One", value: "value 1" },
          { label: "Two", value: "value 2" },
          { label: "Three", value: "value 3" },
        ]}
      />
      <CheckboxInput
        inputLabel={
          <span>
            <b>{t("formInput.label.terms")}</b>
            <br />
            {t("formInput.label.termsInfo")}
          </span>
        }
        name="terms"
      />
      <FormActions
        actions={[
          {
            id: "cancel",
            label: t("formInput.action.cancel"),
            onClick: (event) => {
              event.preventDefault();
            },
          },
          {
            id: "submit",
            label: t("formInput.action.submit"),
          },
        ]}
        alignment="left"
      />
    </>
  );
};
