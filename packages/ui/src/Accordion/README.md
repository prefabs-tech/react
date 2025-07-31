# Accordion component

## Installation

### npm

```
npm install @prefabs.tech/react-ui
```

### yarn

```
yarn add @prefabs.tech/react-ui
```

### pnpm

```
pnpm add @prefabs.tech/react-ui
```

## Usage

```
import React from "react";

import { Accordion, SubPane } from "@prefabs.tech/react-ui";


const Page: React.FC<Properties> = ({ children }) => {
  return (
    <Accordion
      activeIcon="chevron-down.jpg"
      inactiveIcon="chevron-up.jpg"
    >
      <SubPane icon="icon1.jpg" title="Topic 1">
        Pane 1 content
      </SubPane>
      <SubPane icon="icon2.jpg" title="Topic 2">
        Pane 2content
      </SubPane>
    </Accordion>
  );
};

export default Page
```

## Props

### Accordion

| Prop               | Type                       | Description                                      | Default    | Required |
| ------------------ | -------------------------- | ------------------------------------------------ | ---------- | -------- |
| activeIcon         | `string`                   | The toggler icon for expanded state              | None       | No       |
| canSelfCollapse    | `boolean`                  | If set to true, panes can collapse themselves    | false      | No       |
| defaultActiveIndex | `number`                   | Index of pane that should be expanded initially  | None       | No       |
| direction          | `horizontal` \| `vertical` | The direction in which the accordion is laid out | `vertical` | No       |
| inactiveIcon       | `string`                   | The toggler icon for collapsed state             | None       | No       |

### SubPane

| Prop  | Type     | Description                                     | Default | Required |
| ----- | -------- | ----------------------------------------------- | ------- | -------- |
| icon  | `string` | The icon to display in the subpane's title area | None    | No       |
| title | `string` | The text to display in the subpane's title area | None    | Yes      |
