# TabbedPanel component

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

import { SubPane, TabbedPanel } from "@prefabs.tech/react-ui";


const Page: React.FC<Properties> = ({ children }) => {
  return (
    <TabbedPanel>
      <SubPane
        icon="icon1.jpg"
        title="Topic 1">
        Pane 1 content
      </SubPane>
      <SubPane
        icon="icon2.jpg"
        title="Topic 2">
        Pane 2content
      </SubPane>
    </TabbedPanel>
  );
};

export default Page
```

## Props

### Accordion

| Prop     | Type                                   | Description                                           | Default | Required |
| -------- | -------------------------------------- | ----------------------------------------------------- | ------- | -------- |
| position | `top` \| `left` \| `bottom` \| `right` | The position of the tabs relative to the tabbed pane. | `top`   | No       |

### SubPane

| Prop  | Type     | Description                                     | Default | Required |
| ----- | -------- | ----------------------------------------------- | ------- | -------- |
| icon  | `string` | The icon to display in the subpane's title area | None    | No       |
| title | `string` | The text to display in the subpan'es title area | None    | Yes      |
