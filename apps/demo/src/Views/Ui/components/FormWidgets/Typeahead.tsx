import { useTranslation } from "@prefabs.tech/react-i18n";
import { Button, Page, Typeahead, TDataTable } from "@prefabs.tech/react-ui";
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
