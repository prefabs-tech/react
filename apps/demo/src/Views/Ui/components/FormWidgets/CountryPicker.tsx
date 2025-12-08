import { CountryPicker } from "@prefabs.tech/react-ui";
import { useState } from "react";

export const CountryPickerDemo = () => {
  const [selectedCountry, setSelectedCountry] = useState<string>("NP");
  return (
    <>
      <CountryPicker
        name="country"
        locale="fr"
        value={selectedCountry}
        onChange={(value: string) => {
          setSelectedCountry(value as string);
        }}
      />
    </>
  );
};
