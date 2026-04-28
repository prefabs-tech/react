import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { SubPane } from "../../components/SubPane";
import Accordion from "../Accordion";

const accordionValues = {
  accordionId1: "test-accordion-1",
  accordionId2: "test-accordion-2",
  activeIcon: "pi pi-chevron-up",
  inactiveIcon: "pi pi-chevron-down",
};

const paneValues = {
  pane1: {
    content: "Pane 1 content",
    icon: "pi pi-home",
    title: "Topic 1",
  },
  pane2: {
    content: "Pane 2 content",
    icon: "pi pi-list",
    title: "Topic 2",
  },
};

test("no subpane is active when defaultActiveKey prop is not passed", async () => {
  render(
    <Accordion
      activeIcon={accordionValues.activeIcon}
      inactiveIcon={accordionValues.inactiveIcon}
    >
      <SubPane icon={paneValues.pane1.icon} title={paneValues.pane1.title}>
        <p>{paneValues.pane1.content}</p>
      </SubPane>
      <SubPane icon={paneValues.pane2.icon} title={paneValues.pane2.title}>
        <p>{paneValues.pane2.content}</p>
      </SubPane>
    </Accordion>,
  );

  const subpanes = screen.getAllByRole("listitem");
  const firstSubpane = subpanes[0];
  const lastSubpane = subpanes[1];

  expect(firstSubpane.classList.contains("active")).toBe(false);
  expect(lastSubpane.classList.contains("active")).toBe(false);
});

test("correct subpane is active", async () => {
  render(
    <Accordion
      activeIcon={accordionValues.activeIcon}
      defaultActiveIndex={1}
      inactiveIcon={accordionValues.inactiveIcon}
    >
      <SubPane icon={paneValues.pane1.icon} title={paneValues.pane1.title}>
        <p>{paneValues.pane1.content}</p>
      </SubPane>
      <SubPane icon={paneValues.pane2.icon} title={paneValues.pane2.title}>
        <p>{paneValues.pane2.content}</p>
      </SubPane>
    </Accordion>,
  );

  const subpanes = screen.getAllByRole("listitem");
  const firstSubpane = subpanes[0];
  const lastSubpane = subpanes[1];

  expect(firstSubpane.classList.contains("active")).toBe(false);
  expect(lastSubpane.classList.contains("active")).toBe(true);

  fireEvent.click(screen.getByText(paneValues.pane1.title));

  expect(firstSubpane.classList.contains("active")).toBe(true);
  expect(lastSubpane.classList.contains("active")).toBe(false);
});
