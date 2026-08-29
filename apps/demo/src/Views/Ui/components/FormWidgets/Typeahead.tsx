import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, Typeahead, TDataTable } from "@prefabs.tech/react-ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Section } from "../../../../components/Demo";

type CustomSuggestionType = {
  label: string;
  value: string;
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
    label: "A fragrant flower often associated with romance",
    value: "Roslabel",
  },
  { label: "A bright, cup-shaped flower popular in spring", value: "Tulip" },
  { label: "A simple, white flower with a yellow center", value: "Daisy" },
  {
    label: "A tall plant with a large, yellow flower head",
    value: "Sunflower",
  },
  { label: "An elegant flower often used in bouquets", value: "Lily" },
  { label: "An exotic flower with a unique shape", value: "Orchid" },
  { label: "A vibrant, orange or yellow flower", value: "Marigold" },
  { label: "A fragrant flower known for its calming scent", value: "Lavender" },
  { label: "A lush, full flower often used in weddings", value: "Peony" },
  { label: "A hardy flower with a variety of colors", value: "Chrysanthemum" },
  { label: "A bright, yellow flower that blooms in spring", value: "Daffodil" },
  {
    label: "A large, cluster-like flower that changes color",
    value: "Hydrangea",
  },
];

export const TypeaheadDemo = () => {
  const [t] = useTranslation("ui");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [customSuggestions, setCustomSuggestions] = useState<
    Array<CustomSuggestionType>
  >([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDataFetch = (value: any) => {
    setIsLoading(true);
    fetch(`https://api.escuelajs.co/api/v1/products/?title=${value}`)
      .then(async (response) => {
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setOptions(data.map((item: any) => item.title));
        setIsLoading(false);
      })
      .catch((err) => console.log("err", err)); // eslint-disable-line no-console
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleServerChange = (value: any) => {
    console.log("selected server value:", value); // eslint-disable-line no-console
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDataFilter = (value: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let newSuggestions: any = [];

    if (value.length > 0) {
      newSuggestions = items.filter((_value) =>
        _value.toLowerCase().startsWith(value.toLowerCase()),
      );
      setSuggestions(newSuggestions);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const propertiesData = [
    {
      default: '""',
      description: t("typeahead.propertiesDescription.className"),
      id: 1,
      prop: "className",
      type: "string",
    },
    {
      default: "[]",
      description: t("typeahead.propertiesDescription.data"),
      id: 2,
      prop: "data",
      type: "T[]",
    },
    {
      default: "300",
      description: t("typeahead.propertiesDescription.debounceTime"),
      id: 3,
      prop: "debounceTime",
      type: "number",
    },
    {
      default: "false",
      description: t("typeahead.propertiesDescription.disabled"),
      id: 4,
      prop: "disabled",
      type: "boolean",
    },
    {
      default: "-",
      description: t("typeahead.propertiesDescription.emptyMessage"),
      id: 5,
      prop: "emptyMessage",
      type: "string",
    },
    {
      default: "-",
      description: t("typeahead.propertiesDescription.errorMessage"),
      id: 6,
      prop: "errorMessage",
      type: "string",
    },
    {
      default: "true",
      description: t("typeahead.propertiesDescription.forceSelect"),
      id: 7,
      prop: "forceSelect",
      type: "boolean",
    },
    {
      default: "false",
      description: t("typeahead.propertiesDescription.hasError"),
      id: 8,
      prop: "hasError",
      type: "boolean",
    },
    {
      default: "-",
      description: t("typeahead.propertiesDescription.helperText"),
      id: 9,
      prop: "helperText",
      type: "string",
    },
    {
      default: "-",
      description: t("typeahead.propertiesDescription.label"),
      id: 10,
      prop: "label",
      type: "string | React.ReactNode",
    },
    {
      default: "false",
      description: t("typeahead.propertiesDescription.loading"),
      id: 11,
      prop: "loading",
      type: "boolean",
    },
    {
      default: "-",
      description: t("typeahead.propertiesDescription.name"),
      id: 12,
      prop: "name",
      type: "string",
    },
    {
      default: "-",
      description: t("typeahead.propertiesDescription.onChange"),
      id: 13,
      prop: "onChange",
      type: "(value?: T) => void",
    },
    {
      default: "-",
      description: t("typeahead.propertiesDescription.onSearch"),
      id: 14,
      prop: "onSearch",
      type: "(value: string | number | readonly string[]) => void",
    },
    {
      default: "-",
      description: t("typeahead.propertiesDescription.placeholder"),
      id: 15,
      prop: "placeholder",
      type: "string",
    },
    {
      default: "-",
      description: t("typeahead.propertiesDescription.renderSuggestion"),
      id: 16,
      prop: "renderSuggestion",
      type: "(suggestion: T) => React.ReactNode",
    },
    {
      default: "-",
      description: t("typeahead.propertiesDescription.suggestionLabel"),
      id: 17,
      prop: "suggestionLabel",
      type: "keyof T",
    },
    {
      default: '"text"',
      description: t("typeahead.propertiesDescription.type"),
      id: 18,
      prop: "type",
      type: "string",
    },
    {
      default: '""',
      description: t("typeahead.propertiesDescription.value"),
      id: 19,
      prop: "value",
      type: "string | number | readonly string[]",
    },
  ];

  return (
    <Page
      title={t("typeahead.title")}
      toolbar={
        <Button
          iconLeft={<i className="pi pi-chevron-left"></i>}
          label={t("buttons.back")}
          onClick={() => navigate("..")}
          variant="textOnly"
        />
      }
    >
      <Section>
        <Typeahead
          data={suggestions}
          label={t("typeahead.label.client")}
          onSearch={handleDataFilter}
          placeholder={t("typeahead.placeholder")}
        />
      </Section>
      <Section>
        <Typeahead
          data={options}
          debounceTime={500}
          label={t("typeahead.label.server")}
          loading={isLoading}
          onChange={handleServerChange}
          onSearch={handleDataFetch}
          placeholder={t("typeahead.placeholder")}
        />
      </Section>
      <Section>
        <Typeahead
          errorMessage="Required field"
          hasError={true}
          label={t("typeahead.label.invalid")}
          placeholder={t("typeahead.placeholder")}
        />
      </Section>
      <Section>
        <Typeahead
          data={items}
          disabled={true}
          label={t("typeahead.label.disabled")}
          placeholder={t("typeahead.placeholder")}
        />
      </Section>
      <Section>
        <Typeahead
          data={customSuggestions}
          label={t("typeahead.label.customSuggestion")}
          onSearch={handleCustomSuggestionDataFilter}
          placeholder={t("typeahead.placeholder")}
          renderSuggestion={renderSuggestion}
        />
      </Section>
      <Section>
        <Typeahead
          data={options}
          emptyMessage={t("typeahead.message.emptyMessage")}
          label={t("typeahead.label.emptyMessage")}
          loading={isLoading}
          onChange={handleServerChange}
          onSearch={handleDataFetch}
          placeholder={t("typeahead.placeholder")}
        />
      </Section>
      <Section
        title={t("headers.propertiesValue", {
          value: "Typeahead",
        })}
      >
        <TDataTable
          columns={[
            {
              accessorKey: "prop",
              header: "Properties",
            },
            {
              accessorKey: "type",
              header: "Type",
            },
            {
              accessorKey: "default",
              header: "Default",
            },
            {
              accessorKey: "description",
              header: "Description",
            },
          ]}
          data={propertiesData}
          paginated={false}
          persistState={false}
        />
      </Section>
    </Page>
  );
};
