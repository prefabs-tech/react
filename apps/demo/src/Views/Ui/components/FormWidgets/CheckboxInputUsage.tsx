import { CheckboxInput } from "@prefabs.tech/react-ui";
import { useState } from "react";

const SingleCheckboxDemo = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const [checked, setChecked] = useState(false);

  if (isString) {
    return `
    const [checked, setChecked] = useState(false);

    <CheckboxInput
      name="single-checkbox"
      inputLabel="Accept terms and conditions"
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked as boolean)}
    />`;
  }

  return (
    <CheckboxInput
      name="single-checkbox"
      inputLabel="Accept terms and conditions"
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked as boolean)}
    />
  );
};

const CustomLabelSingleCheckboxDemo = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const [checked, setChecked] = useState(false);

  if (isString) {
    return `
    const [checked, setChecked] = useState(false);
    
    <CheckboxInput
      name="single-checkbox"
      inputLabel={
        <span>
          Accept <b>terms and conditions</b>
        </span>
      }
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked as boolean)}
    />`;
  }

  return (
    <CheckboxInput
      name="custom-single-checkbox"
      inputLabel={
        <span>
          Accept <b>terms and conditions</b>
        </span>
      }
      checked={checked}
      onChange={(newChecked) => setChecked(newChecked as boolean)}
    />
  );
};

const MultiCheckboxDemo = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const options = [
    { value: 1, label: "Bike" },
    { value: 2, label: "Car" },
    { value: 3, label: "Truck" },
  ];

  if (isString) {
    return `
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const options = [
    { value: 1, label: "Bike" },
    { value: 2, label: "Car" },
    { value: 3, label: "Truck" },
  ];

  return (
    <CheckboxInput
      name="multi-checkbox"
      label="Choose vehicle options"
      direction="horizontal"
      options={options}
      value={selectedValues}
      onChange={(newValues) => setSelectedValues(newValues as number[])}
    />);`;
  }

  return (
    <CheckboxInput
      name="multi-checkbox"
      label="Choose vehicle options"
      direction="horizontal"
      options={options}
      value={selectedValues}
      onChange={(newValues) => setSelectedValues(newValues as number[])}
    />
  );
};

const CustomLabelMultiCheckboxDemo = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const options = [
    { value: 1, label: "Bike" },
    { value: 2, label: "Car" },
    { value: 3, label: "Truck" },
  ];

  const renderOptionsLabel = (option: (typeof options)[0]) => {
    return (
      <span>
        <i>
          <b>{option.label}</b>
        </i>
      </span>
    );
  };

  if (isString) {
    return `
  const [selectedValues, setSelectedValues] = useState<number[]>([]);

  const options = [
    { value: 1, label: "Bike" },
    { value: 2, label: "Car" },
    { value: 3, label: "Truck" },
  ];

  const renderOptionsLabel = (option: (typeof options)[0]) => {
    return (
      <span>
        <i>
          <b>{option.label}</b>
        </i>
      </span>
    );
  };

  return (
    <CheckboxInput
      name="multi-checkbox"
      label="Choose vehicle options"
      direction="horizontal"
      renderOptionsLabel={renderOptionsLabel}
      options={options}
      value={selectedValues}
      onChange={(newValues) => setSelectedValues(newValues as number[])}
    />);`;
  }

  return (
    <CheckboxInput
      name="custom-multi-checkbox"
      label="Choose vehicle options"
      direction="horizontal"
      renderOptionsLabel={renderOptionsLabel}
      options={options}
      value={selectedValues}
      onChange={(newValues) => setSelectedValues(newValues as number[])}
    />
  );
};

const DisabledDemo = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const options = [
    { value: 1, label: "Bike" },
    { value: 2, label: "Car" },
    { value: 3, label: "Truck" },
  ];

  if (isString) {
    return `
  const options = [
    { value: 1, label: "Bike" },
    { value: 2, label: "Car" },
    { value: 3, label: "Truck" },
  ];

  return (
    <CheckboxInput
      name="disabled-checkbox"
      label="Disabled options"
      options={options}
      value={[2]}
      disabled
      helperText="These checkboxes are disabled."
    />
  );`;
  }

  return (
    <CheckboxInput
      name="disabled-checkbox"
      label="Disabled options"
      options={options}
      value={[2]}
      disabled
      helperText="These checkboxes are disabled."
    />
  );
};

export {
  CustomLabelSingleCheckboxDemo,
  CustomLabelMultiCheckboxDemo,
  SingleCheckboxDemo,
  MultiCheckboxDemo,
  DisabledDemo,
};
