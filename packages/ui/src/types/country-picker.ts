import { ISelectProperties } from "../FormWidgets";

export type CountryPickerLabels = {
  allCountries?: string;
  favorites?: string;
};
export type CountryPickerProperties<T> = Omit<
  ISelectProperties<T>,
  "options"
> & {
  exclude?: string[];
  fallbackLocale?: string;
  favorites?: string[];
  flags?: boolean;
  flagsPath?: (code: string) => string;
  flagsPosition?: "left" | "right" | "right-edge";
  flagsStyle?: "circle" | "rectangular" | "square";
  groups?: Groups;
  include?: string[];
  includeFavorites?: boolean;
  labels?: CountryPickerLabels;
  locale?: string;
  locales?: Locales;
};
export type Groups = Record<string, string[]>;

export type Locales = Record<string, Translation>;

export type Translation = Record<string, string>;
