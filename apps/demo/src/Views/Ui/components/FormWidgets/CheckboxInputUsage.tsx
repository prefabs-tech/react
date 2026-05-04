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
      checked={checked}
      inputLabel="Accept terms and conditions"
      name="single-checkbox"
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
      checked={checked}
      inputLabel={
        <span>
          Accept <b>terms and conditions</b>
        </span>
      }
      name="custom-single-checkbox"
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
    { label: "Bike", value: 1 },
    { label: "Car", value: 2 },
    { label: "Truck", value: 3 },
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
      direction="horizontal"
      label="Choose vehicle options"
      name="multi-checkbox"
      onChange={(newValues) => setSelectedValues(newValues as number[])}
      options={options}
      value={selectedValues}
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
    { label: "Bike", value: 1 },
    { label: "Car", value: 2 },
    { label: "Truck", value: 3 },
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
      direction="horizontal"
      label="Choose vehicle options"
      name="custom-multi-checkbox"
      onChange={(newValues) => setSelectedValues(newValues as number[])}
      options={options}
      renderOptionsLabel={renderOptionsLabel}
      value={selectedValues}
    />
  );
};

const DisabledDemo = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const options = [
    { label: "Bike", value: 1 },
    { label: "Car", value: 2 },
    { label: "Truck", value: 3 },
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
      disabled
      helperText="These checkboxes are disabled."
      label="Disabled options"
      name="disabled-checkbox"
      options={options}
      value={[2]}
    />
  );
};

export {
  CustomLabelMultiCheckboxDemo,
  CustomLabelSingleCheckboxDemo,
  DisabledDemo,
  MultiCheckboxDemo,
  SingleCheckboxDemo,
};
