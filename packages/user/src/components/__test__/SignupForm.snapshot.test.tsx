import { render } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

import ConfigProvider from "@/context/ConfigProvider";
import { UserConfig } from "@/types";

import { SignupForm } from "../Signup";

const config = {
  socialLoginProviders: ["google"],
  supportedRoles: ["USER"],
};

test("Component matches snapshot", () => {
  const handleSubmit = vi.fn();

  const { container } = render(
    <ConfigProvider config={config as UserConfig}>
      <SignupForm handleSubmit={handleSubmit} />
    </ConfigProvider>,
  );

  expect(container).toMatchSnapshot();
});
