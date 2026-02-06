import { render } from "@testing-library/react";
import React from "react";
import { expect, test } from "vitest";

import { ForgotPasswordForm } from "../ForgotPasswordForm";

test("Component matches snapshot", () => {
  const { container } = render(<ForgotPasswordForm handleSubmit={() => {}} />);

  expect(container).toMatchSnapshot();
});
