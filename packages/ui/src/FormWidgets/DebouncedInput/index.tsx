import {
  type ChangeEvent,
  forwardRef,
  useEffect,
  useRef,
  useState,
} from "react";

import { useDebouncedValue } from "../../utils";
import { IInputProperties, Input } from "../Input";

export interface DebouncedInputProperties extends IInputProperties {
  debounceTime?: number;
  onInputChange: (value: number | readonly string[] | string) => void;
}

export const DebouncedInput = forwardRef<
  HTMLInputElement,
  DebouncedInputProperties
>(
  (
    {
      className = "",
      debounceTime = 500,
      defaultValue = "",
      onInputChange,
      type = "text",
      ...inputProperties
    },
    reference,
  ) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    const isMounted = useRef(false);

    const debouncedValue = useDebouncedValue<
      number | readonly string[] | string
    >(inputValue, debounceTime);

    useEffect(() => {
      setInputValue(defaultValue);
    }, [defaultValue]);

    useEffect(() => {
      if (isMounted.current) {
        onInputChange(debouncedValue);
      } else {
        isMounted.current = true;
      }
    }, [debouncedValue]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    };

    return (
      <Input
        className={`debounced-input ${className}`}
        name="debounced-input"
        onChange={handleInputChange}
        ref={reference}
        type={type}
        value={inputValue}
        {...inputProperties}
      />
    );
  },
);
