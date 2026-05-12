import React, {
  ChangeEvent,
  cloneElement,
  createElement,
  FocusEvent,
  HTMLAttributes,
  KeyboardEvent,
  useState,
} from "react";

import { Button } from "../Buttons";
import { Input } from "../FormWidgets";

interface IProperties extends Omit<HTMLAttributes<HTMLHeadElement>, "onClick"> {
  allowEdit?: boolean;
  className?: string;
  handleUpdate?: (title: string) => void;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  showToggler?: boolean;
  title: string;
  titleLevel?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  toggler?: JSX.Element;
}

export const EditableTitle = ({
  allowEdit = true,
  className = "",
  handleUpdate,
  onChange,
  placeholder,
  showToggler = true,
  title,
  titleLevel = "h1",
  toggler = (
    <Button
      iconLeft="pi pi-pencil"
      rounded
      severity="secondary"
      variant="textOnly"
    ></Button>
  ),
  ...others
}: IProperties) => {
  const [isEditModeOn, setEditModeOn] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState(title);

  const toggle = () => {
    setEditModeOn((previous) => !previous);
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setTitleValue(event.target.value);
    }

    if (handleUpdate) {
      handleUpdate(event.target.value);
    }

    setEditModeOn(false);
  };

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();

      event.currentTarget.blur();
    }
  };

  const renderTitle = () => {
    const titleElement = createElement(
      titleLevel,
      {
        ...others,
        onClick: showToggler ? undefined : toggle,
      },
      titleValue,
    );

    if (showToggler) {
      const togglerElement = cloneElement(toggler, {
        disabled: !allowEdit,
        onClick: allowEdit ? toggle : undefined,
      });

      return (
        <>
          {titleElement}
          {togglerElement}
        </>
      );
    }

    return titleElement;
  };

  return (
    <div
      className={`dz-editable-title ${className} ${isEditModeOn && "edit"}`.trimEnd()}
    >
      {isEditModeOn ? (
        <Input
          autoFocus
          defaultValue={onChange ? title : titleValue}
          name="title"
          onBlur={handleBlur}
          onChange={onChange}
          onKeyUp={handleKeyPress}
          placeholder={placeholder}
        />
      ) : (
        renderTitle()
      )}
    </div>
  );
};
