import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import Page from "../index";

const pageData = {
  subtitle: "This is the subtitle",
  title: "This is the title",
};

test("Component matches snapshot", () => {
  const { container } = render(
    <Page subtitle={pageData.subtitle} title={pageData.title}>
      <p>This is the content</p>
    </Page>,
  );
  expect(container).toMatchSnapshot();
});
