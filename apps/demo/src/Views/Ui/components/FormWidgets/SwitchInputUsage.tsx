import { SwitchInput } from "@prefabs.tech/react-ui";
import { useState } from "react";

const Basic = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  const [value, setValue] = useState(false);

  if (isString) {
    return `<div className="container">
      <SwitchInput
        label={"Check here"}
        onChange={(event) => setValue(event.target.checked)}
      />
    </div>`;
  }

  return (
    <div className="container">
      <SwitchInput
        label={"Check here"}
        onChange={(event) => setValue(event.target.checked)}
      />
      <span> value: {`${value}`}</span>
    </div>
  );
};

const Disabled = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<SwitchInput disabled={true} />`;
  }

  return <SwitchInput disabled={true} />;
};

const Invalid = ({
  isString = false,
}: {
  isString?: boolean;
}): JSX.Element | string => {
  if (isString) {
    return `<SwitchInput hasError={true} errorMessage="Invalid" />`;
  }

  return <SwitchInput hasError={true} errorMessage="Invalid" />;
};

const ControlledSnippet = () => `const App = () => {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            switch: false,
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>React Hook Form with Switch Input</h1>
            <Controller
                name="switch"
                control={control}
                render={({ field }) => (
                    <SwitchInput
                        {...field}
                        checked={field.value}
                        label="Toggle Switch"
                        hasError={false} // Set to true if there's an error
                        errorMessage="This field is required."
                    />
                )}
            />
            <button type="submit">Submit</button>
        </form>
    );
};`;

export { Basic, Disabled, Invalid, ControlledSnippet };
