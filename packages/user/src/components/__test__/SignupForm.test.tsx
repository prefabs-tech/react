import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { act } from "react";
import { expect, test, vi } from "vitest";

import ConfigProvider from "@/context/ConfigProvider";
import { UserConfig } from "@/types";

import { SignupForm } from "../Signup";

const config = {
  supportedRoles: ["USER"],
  socialLoginProviders: ["google"],
  features: {
    confirmPassword: true,
  },
};

const setup = (component: React.ReactElement) => {
  return {
    user: userEvent.setup(),
    ...render(
      <ConfigProvider config={config as UserConfig}>
        {component}
      </ConfigProvider>,
    ),
  };
};

test("validation error messages are displayed", async () => {
  const handleSubmit = vi.fn();
  setup(<SignupForm handleSubmit={handleSubmit} />);

  expect(screen.getByLabelText("signup.form.email.label")).toBeDefined();
  expect(screen.getByLabelText("signup.form.password.label")).toBeDefined();
  expect(screen.getByText("signup.form.actions.submit")).toBeDefined();

  fireEvent.click(screen.getByText("signup.form.actions.submit"));

  await waitFor(() => {
    expect(screen.getByText("validation.messages.email")).toBeDefined();
  });

  await waitFor(() => {
    expect(
      screen.getByText("signup.messages.validation.password"),
    ).toBeDefined();
  });

  await waitFor(() => {
    expect(
      screen.getByText("signup.messages.validation.confirmPassword"),
    ).toBeDefined();
  });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});

test("confirm password must match the password", async () => {
  const email = "test@test.com";
  const password = "Test@12345";
  const handleSubmit = vi.fn();

  const { user } = setup(<SignupForm handleSubmit={handleSubmit} />);

  const emailInput = screen.getByLabelText("signup.form.email.label");
  const passwordInput = screen.getByLabelText("signup.form.password.label");
  const confirmPasswordInput = screen.getByLabelText(
    "signup.form.confirmPassword.label",
  );
  const submitButton = screen.getByText("signup.form.actions.submit");

  expect(emailInput).toBeDefined();
  expect(passwordInput).toBeDefined();
  expect(submitButton).toBeDefined();

  await act(async () => {
    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.type(confirmPasswordInput, "Test@123456");

    await user.tab();
  });

  user.click(submitButton);

  await waitFor(() => {
    expect(
      screen.getByText("signup.messages.validation.mustMatch"),
    ).toBeDefined();
  });

  await act(async () => {
    await user.type(confirmPasswordInput, "Test@12345");
  });

  await waitFor(() => {
    expect(
      screen.queryByText(
        "signup.messages.validation.confirmPasswordExtraValidationMessage",
      ),
    ).toBeNull();
  });
});

test("validation error is displayed when an uppercase character is not included in password field.", async () => {
  const email = "test@test.com";
  const handleSubmit = vi.fn();

  const { user } = setup(<SignupForm handleSubmit={handleSubmit} />);

  const emailInput = screen.getByLabelText("signup.form.email.label");
  const passwordInput = screen.getByLabelText("signup.form.password.label");
  const submitButton = screen.getByText("signup.form.actions.submit");

  expect(emailInput).toBeDefined();
  expect(passwordInput).toBeDefined();
  expect(submitButton).toBeDefined();

  await act(async () => {
    await user.type(emailInput, email);
    await user.type(passwordInput, "test123456");
  });

  user.click(submitButton);

  await waitFor(() => {
    expect(
      screen.getByText("signup.messages.validation.validationMessage"),
    ).toBeDefined();
  });
});

test("form is successfully submitted", async () => {
  const email = "test@test.com";
  const password = "Test@12345";
  const handleSubmit = vi.fn();

  const { user } = setup(<SignupForm handleSubmit={handleSubmit} />);

  const emailInput = screen.getByLabelText("signup.form.email.label");
  const passwordInput = screen.getByLabelText("signup.form.password.label");
  const confirmPasswordInput = screen.getByLabelText(
    "signup.form.confirmPassword.label",
  );
  const submitButton = screen.getByText("signup.form.actions.submit");

  expect(emailInput).toBeDefined();
  expect(passwordInput).toBeDefined();
  expect(submitButton).toBeDefined();
  expect(confirmPasswordInput).toBeDefined();

  await act(async () => {
    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.type(confirmPasswordInput, password);
  });

  user.click(submitButton);

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
