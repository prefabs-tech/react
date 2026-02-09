import { render } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

import { ChangePasswordForm } from "../ChangePasswordForm";

vi.mock("@/hooks", () => ({
  useConfig: () => ({
    features: {
      confirmPassword: true,
    },
  }),
}));

test("Component matches snapshot", () => {
  const { container } = render(<ChangePasswordForm handleSubmit={() => {}} />);

  expect(container).toMatchSnapshot();
});
