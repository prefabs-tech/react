import {
  forwardRef,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
} from "react";

import { useDebouncedValue } from "../../utils";
import { IInputProperties, Input } from "../Input";

export interface DebouncedInputProperties extends IInputProperties {
  onInputChange: (value: string | number | readonly string[]) => void;
  debounceTime?: number;
}

export const DebouncedInput = forwardRef<
  HTMLInputElement,
  DebouncedInputProperties
>(
  (
    {
      onInputChange,
      debounceTime = 500,
      type = "text",
      className = "",
      defaultValue = "",
      ...inputProperties
    },
    reference,
  ) => {
    const [inputValue, setInputValue] = useState(defaultValue);

    const isMounted = useRef(false);

    const debouncedValue = useDebouncedValue<
      string | number | readonly string[]
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
        onChange={handleInputChange}
        type={type}
        value={inputValue}
        ref={reference}
        name="debounced-input"
        {...inputProperties}
      />
    );
  },
);
