import { Typeahead as BasicTypeahead } from "@prefabs.tech/react-ui";
import React, { InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

type Suggestion = string | number | object;

interface SuggestionOption<T> {
  suggestionLabel?: T extends object ? keyof T : undefined;
}

interface IProperties<T>
  extends InputHTMLAttributes<HTMLInputElement>,
    SuggestionOption<T> {
  data: T[];
  debounceTime?: number;
  emptyMessage?: string;
  forceSelect?: boolean;
  helperText?: string;
  label?: string | React.ReactNode;
  loading?: boolean;
  name: string;
  submitCount?: number;
  showValidState?: boolean;
  showInvalidState?: boolean;
  onSearch?: (value: string | number | readonly string[]) => void;
  renderSuggestion?: (value?: T) => React.ReactNode;
}

export const Typeahead = <T extends Suggestion>({
  className,
  data,
  debounceTime,
  disabled,
  emptyMessage,
  forceSelect = true,
  helperText,
  label = "",
  loading,
  name,
  placeholder,
  submitCount = 0,
  showInvalidState = true,
  showValidState = true,
  onSearch,
  renderSuggestion,
  suggestionLabel,
}: IProperties<T>) => {
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
      defaultValue=""
      render={({ field }) => {
        const handleSearch = (value: string | number | readonly string[]) => {
          if (onSearch) {
            onSearch(value);
          }

          if (forceSelect) {
            return;
          }

          field.onChange(value);
        };

        return (
          <BasicTypeahead
            label={label}
            name={name}
            className={className}
            disabled={disabled}
            emptyMessage={emptyMessage}
            forceSelect={forceSelect}
            helperText={helperText}
            placeholder={placeholder}
            data={data}
            onChange={field.onChange}
            value={field.value}
            loading={loading}
            debounceTime={debounceTime}
            hasError={submitCount > 0 ? checkInvalidState() : undefined}
            errorMessage={error?.message}
            onSearch={handleSearch}
            renderSuggestion={renderSuggestion}
            suggestionLabel={suggestionLabel}
          />
        );
      }}
    />
  );
};
