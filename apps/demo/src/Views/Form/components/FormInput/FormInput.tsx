import {
  emailSchema,
  passwordSchema,
  Provider,
} from "@prefabs.tech/react-form";
import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as zod from "zod";

import { CodeBlock, Section } from "../../../../components/Demo";
import { FormInputFields } from "./FormInputFields";

export const FormInputDemo = () => {
  const { i18n, t } = useTranslation("form");
  const navigate = useNavigate();

  const [formData, setFormData] = useState("");
  const [filledInput, setFilledInput] = useState(false);

  const FormSchema = zod.object({
    checkboxInput: zod.string().array(),
    currencyPicker: zod
      .string()
      .nonempty({ message: t("formInput.message.required") }),
    date: zod.string().date(),
    email: emailSchema({
      invalid: t("formInput.message.invalid"),
      required: t("formInput.message.required"),
    }),
    name: zod.string().min(1, t("formInput.message.required")),
    number: zod
      .number({
        error: t("formInput.message.required"),
      })
      .nullable()
      .refine((data) => data !== null, {
        message: t("formInput.message.required"),
      }),
    password: passwordSchema(
      {
        required: t("formInput.message.required"),
        weak: "",
      },
      {
        minLength: 0,
      },
    ),
    radioInput: zod.string(),
    select: zod
      .string()
      .array()
      .nonempty({ message: t("formInput.message.required") }),
    terms: zod.boolean().refine((value) => value === true, {
      message: t("formInput.message.required"),
    }),
    text: zod.string().min(1, t("formInput.message.required")),
    typeahead: zod.string().min(1, t("formInput.message.required")),
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
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section>
        <Provider
          className={filledInput ? "filled" : ""}
          defaultValues={{
            filled: false,
            invalid: false,
            radioInput: "value 1",
            select: ["FR"],
            typeahead: "string",
            valid: false,
          }}
          onSubmit={handleSubmit}
          validationSchema={FormSchema}
          validationTriggerKey={i18n.language}
        >
          <FormInputFields checkFilledState={checkFilledState} />
        </Provider>
        {formData && (
          <CodeBlock
            autoFocus
            exampleCode={formData}
            title={t("formInput.submittedValue")}
          />
        )}
      </Section>
    </Page>
  );
};
