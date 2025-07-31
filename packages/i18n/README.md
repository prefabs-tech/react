# Prefabs React I18n

Adds internationalization to a react app.

## Requirements

* `@prefabs.tech/react-config: 0.1.0`

## Installation

```bash
pnpm install @prefabs.tech/react-config @prefabs.tech/react-i18n
```

## Usage

### Setup i18n

In `src/main.tsx`:

```ts
import i18n from "@prefabs.tech/react-i18n";
import i18n from "@prefabs.tech/react-i18n";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import config from "./config";


i18n(config.i18n);

...
```

### Resources

Create your resources under `src/locales/{locale}`.

For each locale, your resource should look like this:

```
{
  "locales": {
    "en": "English",
    "fr": "Français",
    "th": "ไทย"
  }
}
```

### Configuration

The package supports the same configuration options as the `react-i18next` package.

The configuration options must be defined under the `i18n` attribute of your app config (`AppConfig`).

```
# src/config.ts

const config: AppConfig = {
  ...
  i18n: {
    fallbackLng: "en",
    resources: {
      ...
    },
  },
  ...
};
```
