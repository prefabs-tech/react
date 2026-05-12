import {
  FieldValues,
  UseFormClearErrors,
  useFormContext,
  UseFormGetFieldState,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
} from "react-hook-form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AdditionalDefaultValues = Record<string, any>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AdditionalFormSchema = Zod.ZodObject<any>;

export type FormSubmitOptions<TFieldValues extends FieldValues = FieldValues> =
  {
    clearErrors?: UseFormClearErrors<TFieldValues>;
    reset?: UseFormReset<TFieldValues>;
    resetField?: UseFormResetField<TFieldValues>;
    setError?: UseFormSetError<TFieldValues>;
  };

export type RenderAdditionalFormFields = (
  formContext: typeof useFormContext,
) => React.ReactNode;

interface AdditionalFormFields {
  defaultValues: AdditionalDefaultValues;
  renderFields: RenderAdditionalFormFields;
  schema: AdditionalFormSchema;
}

interface CustomInputProperties {
  disabled?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  helperText?: string;
  label?: React.ReactNode | string;
  name: string;
  placeholder?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

interface EmailErrorMessages {
  invalid?: string;
  required?: string;
}

interface PasswordErrorMessages {
  required?: string;
  weak?: string;
}

export type {
  AdditionalFormFields,
  CustomInputProperties,
  EmailErrorMessages,
  PasswordErrorMessages,
  UseFormRegister,
};

export type { IsEmailOptions, StrongPasswordOptions } from "./validator";
