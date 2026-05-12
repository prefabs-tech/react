import {
  Textarea as BasicTextarea,
  ITextareaProperties,
} from "@prefabs.tech/react-ui";
import {
  Controller,
  useFormContext,
  UseFormGetFieldState,
  UseFormRegister,
} from "react-hook-form";

interface ITextarea extends ITextareaProperties {
  defaultValue?: string;
  /** @deprecated */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldState?: UseFormGetFieldState<any>;
  label?: React.ReactNode | string;
  name: string;
  placeholder?: string;
  /** @deprecated */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

export const Textarea: React.FC<ITextarea> = ({
  defaultValue = "",
  label = "",
  name,
  placeholder = "",
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
      control={control}
      defaultValue={defaultValue}
      name={name}
      render={({ field }) => (
        <BasicTextarea
          errorMessage={error?.message}
          hasError={submitCount > 0 ? checkInvalidState() : undefined}
          label={label}
          name={field.name}
          onChange={field.onChange}
          placeholder={placeholder}
          value={field.value}
          {...others}
        />
      )}
    />
  );
};
