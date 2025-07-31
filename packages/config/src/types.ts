interface AppConfig {
  authBasePath?: string;
  apiBaseUrl: string;
  appName?: string;
  appPort: string;
  appTitle: string;
  appVersion: string;
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
  showVersion: boolean;
  [feature: string]: boolean;
}

type ToastNotificationPosition =
  | "bottom-center"
  | "bottom-left"
  | "bottom-right"
  | "top-center"
  | "top-left"
  | "top-right";

export type { AppConfig, AppFeatures };
