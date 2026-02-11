import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { LoginForm } from "../Login";

test("Component matches snapshot", () => {
  const { container } = render(<LoginForm handleSubmit={() => {}} />);

  expect(container).toMatchSnapshot();
});
