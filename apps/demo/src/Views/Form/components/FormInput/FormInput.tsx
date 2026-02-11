import {
  Provider,
  emailSchema,
  passwordSchema,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

import { FormInputFields } from "./FormInputFields";
import { CodeBlock, Section } from "../../../../components/Demo";

export const FormInputDemo = () => {
  const { t, i18n } = useTranslation("form");
  const navigate = useNavigate();

  const [formData, setFormData] = useState("");
  const [filledInput, setFilledInput] = useState(false);

  const FormSchema = zod.object({
    email: emailSchema({
      invalid: t("formInput.message.invalid"),
      required: t("formInput.message.required"),
    }),
    name: zod.string().min(1, t("formInput.message.required")),
    password: passwordSchema(
      {
        required: t("formInput.message.required"),
        weak: "",
      },
      {
        minLength: 0,
      },
    ),
    number: zod
      .number({
        required_error: t("formInput.message.required"),
      })
      .nullable()
      .refine((data) => data !== null, {
        message: t("formInput.message.required"),
      }),
    text: zod.string().min(1, t("formInput.message.required")),
    select: zod
      .string()
      .array()
      .nonempty({ message: t("formInput.message.required") }),
    currencyPicker: zod
      .string()
      .nonempty({ message: t("formInput.message.required") }),
    typeahead: zod.string().min(1, t("formInput.message.required")),
    date: zod.string().date(),
    radioInput: zod.string(),
    checkboxInput: zod.string().array(),
    terms: zod.boolean().refine((value) => value === true, {
      message: t("formInput.message.required"),
    }),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (_formData: any) => {
    setFormData(JSON.stringify(_formData, null, 4));
  };

  const checkFilledState = (filled: boolean) => {
    setFilledInput(filled);
  };

  return (
    <Page
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <Provider
          validationSchema={FormSchema}
          onSubmit={handleSubmit}
          className={filledInput ? "filled" : ""}
          defaultValues={{
            filled: false,
            valid: false,
            invalid: false,
            typeahead: "string",
            radioInput: "value 1",
            select: ["FR"],
          }}
          validationTriggerKey={i18n.language}
        >
          <FormInputFields checkFilledState={checkFilledState} />
        </Provider>
        {formData && (
          <CodeBlock
            autoFocus
            title={t("formInput.submittedValue")}
            exampleCode={formData}
          />
        )}
      </Section>
    </Page>
  );
};
