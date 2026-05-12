import React, { useEffect, useMemo, useRef, useState } from "react";

import Divider from "@/Divider";
import LoadingIcon from "@/LoadingIcon";

import { PopupMenu, PopupMenuProperties } from "../../Popup";
import { Tooltip, TooltipProperties } from "../../Tooltip";
import { Checkbox } from "../Checkbox";
import { DebouncedInput } from "../DebouncedInput";

export type GroupedOption<T> = {
  label: string;
  options: Option<T>[];
};

export type ISelectProperties<T> = {
  autoSelectSingleOption?: boolean;
  autoSortOptions?: boolean;
  className?: string;
  customSearchFn?: (searchInput: string) => Option<T>[];
  disabled?: boolean;
  disableGroupSelect?: boolean;
  disableSearch?: boolean;
  enableTooltip?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  helperText?: string;
  hideIfSingleOption?: boolean;
  label?: React.ReactNode | string;
  labelKey?: string;
  loading?: boolean;
  matchMenuTriggerWidth?: boolean;
  menuOptions?: MenuOptions;
  multiple?: boolean;
  name: string;
  noOptionsMessage?: string;
  options: GroupedOption<T>[] | Option<T>[];
  placeholder?: string;
  renderOption?: (option: GroupedOption<T> | Option<T>) => React.ReactNode;
  renderValue?: (
    value?: T | T[],
    options?: GroupedOption<T>[] | Option<T>[],
  ) => React.ReactNode;
  selectAllLabel?: string;
  serverSearchFn?: (searchInput: string) => void;
  serverSearchHelperText?: string;
  showRemoveSelection?: boolean;
  tooltipOptions?: TooltipOptions;
  valueKey?: string;
} & (
  | {
      multiple: true;
      onChange: (newValue: T[]) => void;
      value: T[];
    }
  | {
      multiple?: false;
      onChange: (newValue: T) => void;
      value: T;
    }
);

export type Option<T> = {
  [key: string]: unknown;
  disabled?: boolean;
  label?: string;
  value?: T;
};

type MenuOptions = Partial<Omit<PopupMenuProperties, "referenceElement">>;

type TooltipOptions = Omit<
  TooltipProperties,
  "children" | "className" | "elementRef"
>;

export const Select = <T extends number | string>({
  autoSelectSingleOption = false,
  autoSortOptions = true,
  className = "",
  customSearchFn,
  disabled: selectFieldDisabled,
  disableGroupSelect,
  disableSearch = false,
  enableTooltip = true,
  errorMessage,
  hasError,
  helperText,
  hideIfSingleOption = false,
  label = "",
  labelKey,
  loading = false,
  matchMenuTriggerWidth = true,
  menuOptions,
  multiple,
  name,
  noOptionsMessage = "No options available",
  onChange,
  options,
  placeholder,
  renderOption,
  renderValue,
  selectAllLabel = "Select all",
  serverSearchFn,
  serverSearchHelperText = "Please type to search...",
  showRemoveSelection = true,
  tooltipOptions,
  value,
  valueKey,
}: ISelectProperties<T>) => {
  const [showOptions, setShowOptions] = useState(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [focused, setFocused] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState<null | number>(
    null,
  );
  const selectReference = useRef<HTMLDivElement>(null);
  const searchInputReference = useRef<HTMLInputElement>(null);
  const optionReference = useRef<Record<number, HTMLLIElement | null>>({});
  const [referenceElement, setReferenceElement] = useState<Element | null>(
    null,
  );

  const menuTooltipReference = useRef<HTMLSpanElement>(null);
  const selectTooltipReference = useRef<HTMLSpanElement>(null);

  const normalizedOptions = useMemo((): (Option<T> & {
    groupLabel?: string;
  })[] => {
    if (!options || !options.length) {
      return [];
    }

    const isGroupedOptionArray = (
      options: GroupedOption<T>[] | Option<T>[],
    ): options is GroupedOption<T>[] => {
      return (
        options.length > 0 &&
        Object.prototype.hasOwnProperty.call(options[0], "options")
      );
    };

    if (isGroupedOptionArray(options)) {
      return options.flatMap((group) =>
        group.options.map((option) => ({
          ...option,
          groupLabel: group.label,
          label: (labelKey ? option[labelKey] : option.label)?.toString(),
          value: valueKey ? (option[valueKey] as T) : (option.value as T),
        })),
      );
    } else {
      return options.map((option) => {
        return {
          ...option,
          groupLabel: undefined,
          label: (labelKey ? option[labelKey] : option.label)?.toString(),
          value: valueKey ? (option[valueKey] as T) : (option.value as T),
        };
      });
    }
  }, [options, labelKey, valueKey]);

  const sortedOptions = useMemo(() => {
    return !autoSortOptions
      ? normalizedOptions
      : [...normalizedOptions].sort((a, b) =>
          String(a.label).localeCompare(String(b.label)),
        );
  }, [normalizedOptions]);

  const filteredOptions = useMemo(() => {
    if (!searchInput || serverSearchFn) {
      return sortedOptions;
    }

    if (customSearchFn) {
      return customSearchFn(searchInput);
    }

    return sortedOptions.filter((option) =>
      String(option.label).toLowerCase().includes(searchInput.toLowerCase()),
    );
  }, [searchInput, sortedOptions]);

  useEffect(() => {
    if (serverSearchFn && searchInput) {
      serverSearchFn(searchInput);
    }
  }, [searchInput]);

  const activeOptions = useMemo(
    () => filteredOptions.filter((option) => !option.disabled),
    [filteredOptions],
  );

  const isAllSelected = useMemo(() => {
    return (
      multiple &&
      activeOptions.length > 0 &&
      activeOptions.every((option) => value.includes(option.value as T))
    );
  }, [activeOptions, value]);

  const isGroupSelected = (groupLabel: string) => {
    const groupItems = groupedOptions?.[groupLabel];

    const valuesInGroup = groupItems
      ?.filter((option) => !option.disabled)
      .map((option) => option.value) as T[];

    return (
      multiple &&
      valuesInGroup.length > 0 &&
      valuesInGroup.every((v) => value.includes(v))
    );
  };

  const toggleSelectAll = () => {
    if (!multiple) {
      return;
    }

    const selectedValue = isAllSelected
      ? []
      : activeOptions.map((option) => option.value);

    onChange(selectedValue as T[]);
    setTimeout(() => {
      searchInputReference.current?.focus();
    }, 0);
  };

  const toggleGroupSelection = (groupLabel: string) => {
    if (!multiple || !groupedOptions) {
      return;
    }

    const groupItems = groupedOptions[groupLabel];

    const enabledOptions = groupItems
      .map((option) => option)
      .filter((option) => !option.disabled);

    const valuesInGroup = enabledOptions.map((option) => option.value) as T[];

    const isGroupFullySelected = valuesInGroup.every((v) => value.includes(v));

    const newValue = isGroupFullySelected
      ? value.filter((v) => !valuesInGroup.includes(v))
      : [...value, ...valuesInGroup.filter((v) => !value.includes(v))];

    onChange(newValue);
  };

  const shouldAutoSelect = useMemo(() => {
    return (
      autoSelectSingleOption &&
      !multiple &&
      normalizedOptions.length === 1 &&
      !normalizedOptions[0].disabled
    );
  }, [normalizedOptions, multiple, autoSelectSingleOption]);

  const shouldHideSelect = useMemo(() => {
    return hideIfSingleOption && !multiple && normalizedOptions.length === 1;
  }, [normalizedOptions, multiple, hideIfSingleOption]);

  const disabled = shouldAutoSelect || selectFieldDisabled;

  const selectedOptions = useMemo(() => {
    if (multiple) {
      if (!value?.length) {
        return "";
      }

      return value
        .map(
          (value_) =>
            normalizedOptions.find((opt) => opt.value === value_)?.label,
        )
        .filter(Boolean)
        .join(", ");
    }

    return normalizedOptions.find((opt) => opt.value === value)?.label ?? "";
  }, [multiple, value, normalizedOptions]);

  useEffect(() => {
    if (shouldAutoSelect || shouldHideSelect) {
      handleSelectedOption(normalizedOptions[0].value as T);
    }
  }, [options]);

  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      const popupMenuContent = document.querySelector(".popup-menu");

      if (
        selectReference.current &&
        !selectReference.current.contains(event.target as HTMLElement) &&
        (!popupMenuContent ||
          !popupMenuContent.contains(event.target as HTMLElement))
      ) {
        setShowOptions(false);
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [selectReference]);

  useEffect(() => {
    if (
      focusedOptionIndex !== null &&
      optionReference.current[focusedOptionIndex]
    ) {
      optionReference.current[focusedOptionIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [focusedOptionIndex]);

  const nextIndex = (startIndex: number): number => {
    const total = filteredOptions.length;

    let index = (startIndex + 1) % total;
    while (filteredOptions[index]?.disabled && index !== startIndex) {
      index = (index + 1) % total;
    }

    return index;
  };

  const previousIndex = (startIndex: number): number => {
    const total = filteredOptions.length;

    let index = (startIndex - 1 + total) % total;
    while (filteredOptions[index]?.disabled && index !== startIndex) {
      index = (index - 1 + total) % total;
    }

    return index;
  };

  const handleSelectedOption = (option: T) => {
    if (multiple) {
      const newValue = value.includes(option)
        ? value.filter((_value) => _value !== option)
        : [...value, option];

      onChange(newValue);
      setSearchInput("");

      setTimeout(() => {
        searchInputReference.current?.focus();
      }, 0);
    } else {
      onChange(option);
    }
  };

  const handleRemoveOption = (
    option: T | T[] | undefined,
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    event.stopPropagation();

    if (multiple) {
      onChange([]);
    } else {
      onChange(null as any); // eslint-disable-line @typescript-eslint/no-explicit-any
    }

    setSearchInput("");
    setFocused(true);
    setTimeout(() => {
      searchInputReference.current?.focus();
    }, 0);
  };

  const handleRemoveOptionKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleRemoveOption(undefined, event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) {
      return;
    }

    const openDropdown = () => {
      setShowOptions(true);
      setFocused(true);

      setTimeout(() => {
        searchInputReference.current?.focus();
      }, 0);
    };

    const selectFocusedOption = () => {
      if (focusedOptionIndex !== null) {
        handleSelectedOption(filteredOptions[focusedOptionIndex].value as T);
        if (!multiple) {
          setShowOptions(false);
          searchInputReference.current?.blur();
          setFocused(false);
        }
      } else {
        setShowOptions(false);
      }

      setFocusedOptionIndex(null);
    };

    const focusFirstEnabledOption = () => {
      const index = filteredOptions.findIndex((opt) => !opt.disabled);

      if (index !== -1) {
        setFocusedOptionIndex(index);
      }
    };

    const focusLastEnabled = () => {
      for (let i = filteredOptions.length - 1; i >= 0; i--) {
        if (!filteredOptions[i].disabled) {
          setFocusedOptionIndex(i);
          break;
        }
      }
    };

    switch (event.key) {
      case " ":
      case "Enter":
        event.preventDefault();
        showOptions ? selectFocusedOption() : openDropdown();
        break;

      case "ArrowDown":
        event.preventDefault();
        setFocusedOptionIndex((previous) => nextIndex(previous as number));
        break;

      case "ArrowUp":
        event.preventDefault();
        setFocusedOptionIndex((previous) => previousIndex(previous as number));
        break;

      case "End":
      case "PageDown":
        event.preventDefault();
        focusLastEnabled();
        break;
      case "Escape":
        event.preventDefault();
        setShowOptions(false);
        setFocused(false);
        searchInputReference.current?.blur();
        break;

      case "Home":
      case "PageUp":
        event.preventDefault();
        focusFirstEnabledOption();
        break;
    }
  };

  const toggleOptionsMenu = () => {
    if (disabled) {
      return;
    }

    if (showOptions) {
      setShowOptions(false);
      setFocused(false);

      searchInputReference.current?.blur();
    } else {
      setSearchInput("");
      setShowOptions(true);
      setFocused(true);

      setTimeout(() => {
        searchInputReference.current?.focus();
      }, 0);
    }
  };

  const isGrouped = filteredOptions.some(
    (option) => option.groupLabel !== undefined,
  );

  const groupedOptions = useMemo(() => {
    if (!isGrouped) {
      return null;
    }

    return filteredOptions.reduce(
      (
        accumulator: Record<number | string | symbol, typeof filteredOptions>,
        item,
      ) => {
        const group = item.groupLabel as string;

        if (!accumulator[group]) {
          accumulator[group] = [];
        }

        accumulator[group].push(item);

        return accumulator;
      },
      {},
    );
  }, [filteredOptions]);

  const renderOptionItem = (
    option: Option<T> & { groupLabel?: string },
    index: number,
  ) => {
    const { disabled, label } = option;

    return (
      <li
        className={
          `${!multiple && value === option.value ? "selected" : ""}
          ${isGrouped ? "group-option" : ""}
          ${disabled ? "disabled" : ""}
          ${index === focusedOptionIndex ? "focused" : ""}
          `.trim() || undefined
        }
        key={index}
        onClick={() => {
          if (!disabled) {
            handleSelectedOption(option.value as T);
          }

          if (!multiple && !disabled) {
            setShowOptions(false);
          }
        }}
        ref={(element) => (optionReference.current[index] = element)}
        role="option"
      >
        {multiple ? (
          <Checkbox
            checked={value.includes(option.value as T)}
            disabled={disabled}
            name={label}
            onChange={() => handleSelectedOption(option.value as T)}
          />
        ) : null}
        <span>{renderOption ? renderOption(option) : label}</span>
      </li>
    );
  };

  const renderOptions = () => {
    const _options = renderValue
      ? renderValue(value, normalizedOptions)
      : selectedOptions;

    const hasSelectedOptions = selectedOptions.trim().length > 0;

    return (
      <>
        <div
          className={`selected-options-wrapper ${
            hasSelectedOptions ? "visible" : ""
          }`}
        >
          {enableTooltip && (
            <Tooltip elementRef={menuTooltipReference} {...tooltipOptions}>
              {selectedOptions}
            </Tooltip>
          )}
          <span className="selected-options" ref={menuTooltipReference}>
            {_options}
          </span>
          {hasSelectedOptions && <Divider />}
        </div>

        {loading ? (
          <div className="loading-container">
            <LoadingIcon />
          </div>
        ) : !filteredOptions?.length ? (
          <span className="no-options">
            {!searchInput && serverSearchFn
              ? serverSearchHelperText
              : noOptionsMessage}
          </span>
        ) : (
          <ul aria-multiselectable={multiple} role="listbox">
            {multiple && (
              <li onClick={toggleSelectAll} role="option">
                <Checkbox
                  checked={isAllSelected}
                  disabled={activeOptions.length === 0}
                  label={selectAllLabel}
                  onChange={() => {}}
                />
              </li>
            )}

            {isGrouped && groupedOptions
              ? Object.entries(groupedOptions).map(([groupLabel, options]) => (
                  <React.Fragment key={groupLabel}>
                    {groupLabel && multiple && !disableGroupSelect ? (
                      <li
                        className="multi-select-group-label"
                        onClick={() => toggleGroupSelection(groupLabel)}
                      >
                        <Checkbox
                          checked={isGroupSelected(groupLabel)}
                          disabled={options.every((option) => option.disabled)}
                          onChange={() => toggleGroupSelection(groupLabel)}
                        />
                        <span>{groupLabel}</span>
                      </li>
                    ) : (
                      <li className="group-label">{groupLabel}</li>
                    )}
                    {options.map((option, index) =>
                      renderOptionItem(option, index),
                    )}
                  </React.Fragment>
                ))
              : filteredOptions.map((option, index) =>
                  renderOptionItem(option, index),
                )}
          </ul>
        )}
      </>
    );
  };

  const renderSelect = () => {
    const renderSelectValue = () => {
      return (
        <>
          {enableTooltip && (
            <Tooltip elementRef={selectTooltipReference} {...tooltipOptions}>
              {selectedOptions}
            </Tooltip>
          )}

          {!renderValue && !selectedOptions?.length ? (
            <span className="placeholder">{placeholder}</span>
          ) : (
            <span className="selected-options" ref={selectTooltipReference}>
              {renderValue
                ? renderValue(value, normalizedOptions)
                : selectedOptions}
            </span>
          )}
        </>
      );
    };

    return (
      <div
        aria-invalid={hasError}
        className={`label-container ${disabled ? "disabled" : ""} ${
          focused ? "focused" : ""
        }`.trimEnd()}
        onClick={toggleOptionsMenu}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {!disableSearch && (!selectedOptions.length || showOptions) ? (
          <DebouncedInput
            defaultValue={searchInput}
            disabled={disabled}
            name={name}
            onInputChange={(debouncedValue) => {
              setSearchInput(debouncedValue as string);

              if (debouncedValue && !showOptions) {
                setShowOptions(true);
              }
            }}
            placeholder={placeholder}
            ref={searchInputReference}
            tabIndex={-1}
          />
        ) : (
          renderSelectValue()
        )}
        <span className="action-items">
          {!disabled && showRemoveSelection && selectedOptions && (
            <i
              className="pi pi-times"
              onClick={(event) => handleRemoveOption(undefined, event)}
              onKeyDown={(event) => handleRemoveOptionKeyDown(event)}
              tabIndex={0}
            ></i>
          )}

          <i
            className="pi pi-chevron-down"
            onClick={() => {
              if (!disabled) {
                setShowOptions(!showOptions);
                setFocused(true);
              }
            }}
          ></i>
        </span>
      </div>
    );
  };

  if (shouldHideSelect) {
    return null;
  }

  return (
    <div className={`field ${className}`.trimEnd()} ref={selectReference}>
      {label &&
        (!disableSearch && (!selectedOptions.length || showOptions) ? (
          <label htmlFor={name}>{label}</label>
        ) : (
          <span className="label">{label}</span>
        ))}

      <div className="select" ref={setReferenceElement}>
        {renderSelect()}
        {shouldAutoSelect
          ? null
          : showOptions && (
              <PopupMenu
                className={`select-menu ${menuOptions?.className}`.trim()}
                content={renderOptions()}
                matchReferenceWidth={matchMenuTriggerWidth}
                offset={0}
                referenceElement={referenceElement}
              />
            )}
      </div>

      {helperText && <span className="helper-text">{helperText}</span>}
      {errorMessage && <span className="error-message">{errorMessage}</span>}
    </div>
  );
};
