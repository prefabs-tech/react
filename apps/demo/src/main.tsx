import { ConfigProvider } from "@prefabs.tech/react-config";
import i18n from "@prefabs.tech/react-i18n";
import { configureTooltip } from "@prefabs.tech/react-ui";
import { UserWrapper } from "@prefabs.tech/react-user";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import config, { userConfig } from "./config";

// react-toastify
import "react-toastify/dist/ReactToastify.css";

// PrimeReact CSS
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

import "@prefabs.tech/react-form/dist/PrefabsTechReactForm.css";
import "@prefabs.tech/react-i18n/dist/PrefabsTechReactI18n.css";
import "@prefabs.tech/react-layout/dist/PrefabsTechReactLayout.css";
import "@prefabs.tech/react-ui/dist/PrefabsTechReactUI.css";
import "@prefabs.tech/react-user/dist/PrefabsTechReactUser.css";

import "./assets/css/index.css";

i18n(config.i18n);

// configure tooltip globally
configureTooltip({
  offset: 10,
  delay: 400,
  position: "right",
  mouseTrack: false,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider appConfig={config}>
    <React.Suspense>
      <UserWrapper config={userConfig}>
        <App />
      </UserWrapper>
    </React.Suspense>
  </ConfigProvider>,
);
