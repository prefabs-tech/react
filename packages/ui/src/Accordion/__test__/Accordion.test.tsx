import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { SubPane } from "../../components/SubPane";
import Accordion from "../Accordion";

const accordionValues = {
  activeIcon: "pi pi-chevron-up",
  inactiveIcon: "pi pi-chevron-down",
  accordionId1: "test-accordion-1",
  accordionId2: "test-accordion-2",
};

const paneValues = {
  pane1: {
    icon: "pi pi-home",
    content: "Pane 1 content",
    title: "Topic 1",
  },
  pane2: {
    icon: "pi pi-list",
    content: "Pane 2 content",
    title: "Topic 2",
  },
};

test("no subpane is active when defaultActiveKey prop is not passed", async () => {
  render(
    <Accordion
      activeIcon={accordionValues.activeIcon}
      inactiveIcon={accordionValues.inactiveIcon}
    >
      <SubPane title={paneValues.pane1.title} icon={paneValues.pane1.icon}>
        <p>{paneValues.pane1.content}</p>
      </SubPane>
      <SubPane title={paneValues.pane2.title} icon={paneValues.pane2.icon}>
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
      defaultActiveIndex={1}
      activeIcon={accordionValues.activeIcon}
      inactiveIcon={accordionValues.inactiveIcon}
    >
      <SubPane title={paneValues.pane1.title} icon={paneValues.pane1.icon}>
        <p>{paneValues.pane1.content}</p>
      </SubPane>
      <SubPane title={paneValues.pane2.title} icon={paneValues.pane2.icon}>
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
