interface AppConfig {
  apiBaseUrl: string;
  appName?: string;
  appPort: string;
  appTitle: string;
  appVersion: string;
  authBasePath?: string;
  copyright?: {
    holder: string;
    url?: string;
  };
  features: AppFeatures;
  toastNotification?: {
    position: ToastNotificationPosition;
  };
  websiteDomain: string;
}

interface AppFeatures {
  [feature: string]: boolean;
  showVersion: boolean;
}

type ToastNotificationPosition =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "top-right";

export type { AppConfig, AppFeatures };
