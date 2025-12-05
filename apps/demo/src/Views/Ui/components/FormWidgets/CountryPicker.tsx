import { CountryPicker } from "@prefabs.tech/react-ui";

export const CountryPickerDemo = () => {
  return (
    <>
      <CountryPicker
        name="country"
        value="US"
        onChange={() => console.log("hello")}
      />
    </>
  );
};
