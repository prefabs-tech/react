interface PrefabsTechReactLayoutConfig {
  homeRoute?: "/" | string;
  logo?: string;
  logoAlt?: string;
  logoRoute?: string;
  localeSwitcher?: { showBadge: boolean };
  mainMenu?: {
    name: string;
    route: string;
  }[];
}

export type { PrefabsTechReactLayoutConfig };
