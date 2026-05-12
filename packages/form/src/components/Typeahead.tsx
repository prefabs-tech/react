import { Typeahead as BasicTypeahead } from "@prefabs.tech/react-ui";
import React, { InputHTMLAttributes } from "react";
import { Controller, useFormContext } from "react-hook-form";

interface IProperties<T>
  extends InputHTMLAttributes<HTMLInputElement>, SuggestionOption<T> {
  data: T[];
  debounceTime?: number;
  emptyMessage?: string;
  forceSelect?: boolean;
  helperText?: string;
  label?: React.ReactNode | string;
  loading?: boolean;
  name: string;
  onSearch?: (value: number | readonly string[] | string) => void;
  renderSuggestion?: (value?: T) => React.ReactNode;
  showInvalidState?: boolean;
  showValidState?: boolean;
  submitCount?: number;
}

type Suggestion = number | object | string;

interface SuggestionOption<T> {
  suggestionLabel?: T extends object ? keyof T : undefined;
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
  onSearch,
  placeholder,
  renderSuggestion,
  showInvalidState = true,
  showValidState = true,
  submitCount = 0,
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
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => {
        const handleSearch = (value: number | readonly string[] | string) => {
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
            className={className}
            data={data}
            debounceTime={debounceTime}
            disabled={disabled}
            emptyMessage={emptyMessage}
            errorMessage={error?.message}
            forceSelect={forceSelect}
            hasError={submitCount > 0 ? checkInvalidState() : undefined}
            helperText={helperText}
            label={label}
            loading={loading}
            name={name}
            onChange={field.onChange}
            onSearch={handleSearch}
            placeholder={placeholder}
            renderSuggestion={renderSuggestion}
            suggestionLabel={suggestionLabel}
            value={field.value}
          />
        );
      }}
    />
  );
};
