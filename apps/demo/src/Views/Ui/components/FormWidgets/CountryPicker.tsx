import { CountryPicker } from "@prefabs.tech/react-ui";

export const CountryPickerDemo = () => {
  return (
    <>
      <CountryPicker
        name="country"
        locale="fr"
        value="NP"
        onChange={() => {}}
      />
    </>
  );
};
