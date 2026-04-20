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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  helperText?: string;
  label?: string | React.ReactNode;
  name: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AdditionalFormSchema = import("zod").ZodObject<any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AdditionalDefaultValues = Record<string, any>;

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
