import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { SubPane } from "../../components/SubPane";
import Accordion from "../Accordion";

test("Component matches snapshot", () => {
  const { container } = render(
    <Accordion activeIcon="arrow-down.jpg" inactiveIcon="arrow-up.jpg">
      <SubPane icon="pi pi-home" title="Topic 1">
        Pane 1 content
      </SubPane>
      <SubPane icon="pi pi-list" title="Topic 2">
        Pane 2 content
      </SubPane>
    </Accordion>,
  );
  expect(container).toMatchSnapshot();
});
