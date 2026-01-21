import { parse } from "@prefabs.tech/react-config";

import en from "./locales/en";
import fr from "./locales/fr";

import type { AppConfig, AppFeatures } from "@prefabs.tech/react-config";

const config: AppConfig = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  appName: import.meta.env.VITE_APP_NAME as string,
  appPort: parse(import.meta.env.VITE_APP_PORT, "20083") as string,
  appTitle: import.meta.env.VITE_APP_TITLE as string,
  appVersion: `${import.meta.env.VITE_APP_VERSION}+${
    import.meta.env.VITE_APP_BUILD
  }` as string,
  copyright: {
    holder: import.meta.env.VITE_APP_COPYRIGHT_HOLDER as string,
    url: import.meta.env.VITE_APP_COPYRIGHT_HOLDER_URL as string,
  },
  features: {
    showVersion: parse(
      import.meta.env.VITE_FEATURES_SHOW_VERSION as string,
      true,
    ) as boolean,
  } as AppFeatures,
  i18n: {
    appendNamespaceToCIMode: true,
    debug: true,
    defaultNS: "app",
    fallbackLng: "en",
    resources: {
      en: en,
      fr: fr,
    },
    supportedLngs: ["en", "en-GB", "en-US", "fr"],
  },
  layout: {
    localeSwitcher: {
      showBadge: true,
    },
    logo: `${(import.meta.env.VITE_APP_BASE_PATH || "").replace(/\/$/, "")}/logo.png`,
    mainMenu: [
      {
        name: "header.menu.ui",
        route: "/ui",
      },
      {
        name: "header.menu.user",
        route: "/user",
      },
      {
        name: "header.menu.form",
        route: "/form",
      },
      {
        name: "header.menu.layout",
        route: "/layout",
      },
      {
        name: "header.menu.i18n",
        route: "/i18n",
      },
    ],
  },
  websiteDomain: (window.location.protocol +
    "//" +
    window.location.host) as string,
};

const feature = (name: keyof AppFeatures): boolean => {
  return config.features[name];
};

// Dummy config to demo user package components
export const userConfig = {
  apiBaseUrl: config.websiteDomain,
  appDomain: config.websiteDomain,
  supertokens: {
    appName: "Demo - Prefabs Tech React",
    apiDomain: config.websiteDomain,
  },
  supportedRoles: [],
};

export default config;

export { config, feature };
