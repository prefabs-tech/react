import { DropdownMenu, DropdownMenuProperties } from "@prefabs.tech/react-ui";
import { useTranslation } from "react-i18next";

import LocaleBadge from "./LocaleBadge";

import useConfig from "@/hooks/useConfig";

export type LocalSwitcherProperties = Omit<DropdownMenuProperties, "menu">;

const LocaleSwitcher = ({ ...menuOptions }: LocalSwitcherProperties) => {
  const { i18n, t } = useTranslation("locales");
  const { i18n: i18nConfig } = useConfig();

  const changeLocale = (newLocale: string) => {
    i18n.changeLanguage(newLocale);

    document.documentElement.lang = newLocale;
  };

  const locales =
    i18n.options.supportedLngs &&
    i18n.options.supportedLngs
      .filter((locale) => locale !== "cimode") // Filter out cimode from options. The mode shows key e.g. locale.english as value.
      .map((locale) => {
        return {
          onClick: () => changeLocale(locale),
          label: t(`locales.${locale}`),
          key: locale,
        };
      });

  if (!locales || !(locales.length > 1)) {
    return null;
  }

  return (
    <DropdownMenu
      className="dz-locale-switcher"
      highlightItem={i18n.language}
      label={t(`locales.${i18n.language}`)}
      menu={locales || []}
      renderOption={(item) => (
        <span className="menu-item">
          {i18nConfig.showBadge && <LocaleBadge locale={item.key} />}
          {item.label}
        </span>
      )}
      {...menuOptions}
    />
  );
};

export default LocaleSwitcher;
