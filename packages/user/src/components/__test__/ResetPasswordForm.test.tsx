import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { act } from "react";
import { expect, test, vi } from "vitest";

import { ResetPasswordForm } from "../ResetPasswordForm";

import ConfigProvider from "@/context/ConfigProvider";
import { UserConfig } from "@/types";

const config = {
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
  const { user } = setup(<ResetPasswordForm handleSubmit={handleSubmit} />);
  const submitButton = screen.getByText("resetPassword.form.actions.submit");

  expect(
    screen.getByLabelText("resetPassword.form.newPassword.label"),
  ).toBeDefined();

  expect(
    screen.getByLabelText("resetPassword.form.confirmPassword.label"),
  ).toBeDefined();

  await act(() => {
    user.click(submitButton);
  });

  await waitFor(() => {
    expect(
      screen.getByText("resetPassword.messages.validation.newPassword"),
    ).toBeDefined();
  });

  await waitFor(() => {
    expect(
      screen.getByText("resetPassword.messages.validation.confirmPassword"),
    ).toBeDefined();
  });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});

test("validation error message when two password is not matched is displayed", async () => {
  const handleSubmit = vi.fn();
  const { user } = setup(<ResetPasswordForm handleSubmit={handleSubmit} />);
  const passwordInput = screen.getByLabelText(
    "resetPassword.form.newPassword.label",
  );
  const confirmPasswordInput = screen.getByLabelText(
    "resetPassword.form.confirmPassword.label",
  );
  const submitButton = screen.getByText("resetPassword.form.actions.submit");

  expect(
    screen.getByLabelText("resetPassword.form.newPassword.label"),
  ).toBeDefined();

  expect(
    screen.getByLabelText("resetPassword.form.confirmPassword.label"),
  ).toBeDefined();

  await act(async () => {
    await user.type(passwordInput, "Test@12345");
    await user.type(confirmPasswordInput, "Test@12");

    await user.click(submitButton);
  });

  await waitFor(() => {
    expect(
      screen.getByText("resetPassword.messages.validation.mustMatch"),
    ).toBeDefined();
  });

  await waitFor(() => {
    expect(
      screen.queryByText("resetPassword.messages.validation.confirmPassword"),
    ).toBeNull();
  });

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(0);
  });
});

test("form is successfully submitted", async () => {
  const handleSubmit = vi.fn();
  const { user } = setup(<ResetPasswordForm handleSubmit={handleSubmit} />);
  const passwordInput = screen.getByLabelText(
    "resetPassword.form.newPassword.label",
  );
  const confirmPasswordInput = screen.getByLabelText(
    "resetPassword.form.confirmPassword.label",
  );
  const submitButton = screen.getByText("resetPassword.form.actions.submit");

  expect(
    screen.getByLabelText("resetPassword.form.newPassword.label"),
  ).toBeDefined();

  expect(
    screen.getByLabelText("resetPassword.form.confirmPassword.label"),
  ).toBeDefined();

  await act(async () => {
    await user.type(passwordInput, "Test@12345");
    await user.type(confirmPasswordInput, "Test@12345");

    await user.click(submitButton);
  });

  await waitFor(() => {
    expect(
      screen.queryByText("resetPassword.messages.validation.newPassword"),
    ).toBeNull();
  });

  await waitFor(() => {
    expect(
      screen.queryByText("resetPassword.messages.validation.confirmPassword"),
    ).toBeNull();
  });

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
