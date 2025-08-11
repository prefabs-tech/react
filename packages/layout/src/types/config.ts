interface PrefabsTechReactLayoutConfig {
  homeRoute?: "/" | string;
  localeSwitcher?: { showBadge: boolean };
  logo?: string;
  logoAlt?: string;
  logoRoute?: string;
  mainMenu?: {
    name: string;
    route: string;
  }[];
}

export type { PrefabsTechReactLayoutConfig };
