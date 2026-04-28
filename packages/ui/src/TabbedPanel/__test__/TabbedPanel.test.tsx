import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { SubPane } from "../../components/SubPane";
import TabbedPanel from "../TabbedPanel";

const values = {
  bodyOne: "Pane 1 content",
  bodyTwo: "Pane 2 content",
  iconOne: "icon1.jpg",
  iconTwo: "icon2.jpg",
  titleOne: "Topic 1",
  titleTwo: "Topic 2",
};

test("tabs are rendered", async () => {
  render(
    <TabbedPanel>
      <SubPane icon={values.iconOne} title={values.titleOne}>
        <p>{values.bodyOne}</p>
      </SubPane>
      <SubPane icon={values.iconTwo} title={values.titleTwo}>
        <p>{values.bodyTwo}</p>
      </SubPane>
    </TabbedPanel>,
  );

  expect(screen.getByText(values.titleOne)).toBeDefined();
  expect(screen.getByText(values.titleTwo)).toBeDefined();
});

test("correct tab is rendered", async () => {
  render(
    <TabbedPanel>
      <SubPane icon={values.iconOne} title={values.titleOne}>
        <p>{values.bodyOne}</p>
      </SubPane>
      <SubPane icon={values.iconTwo} title={values.titleTwo}>
        <p>{values.bodyTwo}</p>
      </SubPane>
    </TabbedPanel>,
  );

  fireEvent.click(screen.getByText(values.titleOne));
  expect(screen.getByText(values.bodyOne)).toBeDefined();

  fireEvent.click(screen.getByText(values.titleTwo));
  expect(screen.getByText(values.bodyTwo)).toBeDefined();
});
