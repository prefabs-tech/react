import {
  FieldValues,
  UseFormClearErrors,
  UseFormGetFieldState,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  useFormContext,
} from "react-hook-form";

interface EmailErrorMessages {
  invalid?: string;
  required?: string;
}

interface PasswordErrorMessages {
  required?: string;
  weak?: string;
}

interface CustomInputProperties {
  disabled?: boolean;
  getFieldState?: UseFormGetFieldState<Record<string, unknown>>;
  helperText?: string;
  label?: string | React.ReactNode;
  name: string;
  placeholder?: string;
  register?: UseFormRegister<Record<string, unknown>>;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
}

export type AdditionalFormSchema = Zod.ZodObject<Zod.ZodRawShape>;

export type AdditionalDefaultValues = Record<string, unknown>;

export type RenderAdditionalFormFields = (
  formContext: typeof useFormContext,
) => React.ReactNode;

interface AdditionalFormFields {
  defaultValues: AdditionalDefaultValues;
  schema: AdditionalFormSchema;
  renderFields: RenderAdditionalFormFields;
}

export type FormSubmitOptions<TFieldValues extends FieldValues = FieldValues> =
  {
    clearErrors?: UseFormClearErrors<TFieldValues>;
    reset?: UseFormReset<TFieldValues>;
    resetField?: UseFormResetField<TFieldValues>;
    setError?: UseFormSetError<TFieldValues>;
  };

export type {
  AdditionalFormFields,
  CustomInputProperties,
  EmailErrorMessages,
  PasswordErrorMessages,
  UseFormRegister,
};

export type { IsEmailOptions, StrongPasswordOptions } from "./validator";
