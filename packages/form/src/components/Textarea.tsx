import {
  ITextareaProperties,
  Textarea as BasicTextarea,
} from "@prefabs.tech/react-ui";
import {
  Controller,
  UseFormGetFieldState,
  UseFormRegister,
  useFormContext,
} from "react-hook-form";

interface ITextarea extends ITextareaProperties {
  defaultValue?: string;
  label?: string | React.ReactNode;
  name: string;
  placeholder?: string;
  showValidState?: boolean;
  showInvalidState?: boolean;
  submitCount?: number;
  /** @deprecated */
  getFieldState?: UseFormGetFieldState<Record<string, unknown>>;
  /** @deprecated */
  register?: UseFormRegister<Record<string, unknown>>;
}

export const Textarea: React.FC<ITextarea> = ({
  defaultValue = "",
  label = "",
  placeholder = "",
  name,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
  ...others
}) => {
  const { control, getFieldState } = useFormContext();

  const { error, invalid } = getFieldState(name);

  const checkInvalidState = () => {
    if (showInvalidState && invalid) {
      return true;
    }

    if (showValidState && !invalid) {
      return false;
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
      render={({ field }) => (
        <BasicTextarea
          name={field.name}
          label={label}
          placeholder={placeholder}
          value={field.value}
          errorMessage={error?.message}
          onChange={field.onChange}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          {...others}
        />
      )}
    />
  );
};
