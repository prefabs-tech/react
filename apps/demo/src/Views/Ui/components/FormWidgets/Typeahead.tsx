import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, Typeahead } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../../components/Demo";

type CustomSuggestionType = {
  value: string;
  label: string;
};

const items: string[] = [
  "red",
  "blue",
  "yellow",
  "gray",
  "black",
  "purple",
  "pink",
  "blacker",
  "pinnacle",
  "gravers",
];

const suggestionItems = [
  {
    value: "Roslabel",
    label: "A fragrant flower often associated with romance",
  },
  { value: "Tulip", label: "A bright, cup-shaped flower popular in spring" },
  { value: "Daisy", label: "A simple, white flower with a yellow center" },
  {
    value: "Sunflower",
    label: "A tall plant with a large, yellow flower head",
  },
  { value: "Lily", label: "An elegant flower often used in bouquets" },
  { value: "Orchid", label: "An exotic flower with a unique shape" },
  { value: "Marigold", label: "A vibrant, orange or yellow flower" },
  { value: "Lavender", label: "A fragrant flower known for its calming scent" },
  { value: "Peony", label: "A lush, full flower often used in weddings" },
  { value: "Chrysanthemum", label: "A hardy flower with a variety of colors" },
  { value: "Daffodil", label: "A bright, yellow flower that blooms in spring" },
  {
    value: "Hydrangea",
    label: "A large, cluster-like flower that changes color",
  },
];

export const TypeaheadDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any>([]);
  const [suggestions, setSuggestions] = useState([]);
  const [customSuggestions, setCustomSuggestions] = useState<
    Array<CustomSuggestionType>
  >([]);

  const handleDataFetch = (value: any) => {
    setIsLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products/?title=${value}`)
      .then(async (response) => {
        const data = await response.json();
        setOptions(data.map((item: any) => item.title));
        setIsLoading(false);
      })
      .catch((err) => console.log("err", err)); // eslint-disable-line no-console
  };

  const handleServerChange = (value: any) => {
    console.log("selected server value:", value); // eslint-disable-line no-console
  };

  const handleDataFilter = (value: any) => {
    let newSuggestions: any = [];

    if (value.length > 0) {
      newSuggestions = items.filter((_value) =>
        _value.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(newSuggestions);
    }
  };

  const handleCustomSuggestionDataFilter = (value: any) => {
    let newSuggestions = [];

    if (value && value.length) {
      newSuggestions = suggestionItems.filter((_value) =>
        _value.value.toLowerCase().includes(value.toLowerCase()),
      );
      setCustomSuggestions(newSuggestions);
    }
  };

  const renderSuggestion = (suggestion: CustomSuggestionType) => {
    return (
      <>
        <div>{suggestion.value}</div>
        <div>{suggestion.label}</div>
      </>
    );
  };

  return (
    <Page
      title={t("typeahead.title")}
      toolbar={
        <Button
          label={t("buttons.back")}
          variant="textOnly"
          iconLeft={<i className="pi pi-chevron-left"></i>}
          onClick={() => navigate("..")}
        />
      }
    >
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.client")}
          data={suggestions}
          onSearch={handleDataFilter}
        />
      </Section>
      <Section>
        <Typeahead
          label={t("typeahead.label.server")}
          placeholder={t("typeahead.placeholder")}
          data={options}
          loading={isLoading}
          onSearch={handleDataFetch}
          onChange={handleServerChange}
          debounceTime={500}
        />
      </Section>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.invalid")}
          hasError={true}
          errorMessage="Required field"
        />
      </Section>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.disabled")}
          data={items}
          disabled={true}
        />
      </Section>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.customSuggestion")}
          data={customSuggestions}
          onSearch={handleCustomSuggestionDataFilter}
          renderSuggestion={renderSuggestion}
        />
      </Section>
      <Section>
        <Typeahead
          placeholder={t("typeahead.placeholder")}
          label={t("typeahead.label.emptyMessage")}
          data={options}
          loading={isLoading}
          onSearch={handleDataFetch}
          onChange={handleServerChange}
          emptyMessage={t("typeahead.message.emptyMessage")}
        />
      </Section>
    </Page>
  );
};
