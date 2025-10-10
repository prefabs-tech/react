import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import React, { act } from "react";
import { expect, test, vi } from "vitest";

import { ChangePasswordForm } from "../ChangePasswordForm";

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

test("validation error message is displayed when input field is empty", async () => {
  const handleSubmit = vi.fn();
  const { user } = setup(<ChangePasswordForm handleSubmit={handleSubmit} />);

  const submitButton = screen.getByText("changePassword.form.actions.submit");

  act(() => {
    user.click(submitButton);
  });

  await waitFor(() => {
    expect(
      screen.getByText("changePassword.messages.validation.currentPassword"),
    ).toBeDefined();
  });
  await waitFor(() => {
    expect(
      screen.getByText("changePassword.messages.validation.newPassword"),
    ).toBeDefined();
  });
  await waitFor(() => {
    expect(
      screen.getByText("changePassword.messages.validation.confirmPassword"),
    ).toBeDefined();
  });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});

test("validation error message is displayed for unmatched confirm password", async () => {
  const handleSubmit = vi.fn();
  const { user } = setup(<ChangePasswordForm handleSubmit={handleSubmit} />);

  const currentPassword = screen.getByLabelText(
    "changePassword.form.currentPassword.label",
  );
  const newPassword = screen.getByLabelText(
    "changePassword.form.newPassword.label",
  );
  const confirmPassword = screen.getByLabelText(
    "changePassword.form.confirmPassword.label",
  );
  const submitButton = screen.getByText("changePassword.form.actions.submit");

  await act(async () => {
    await user.type(currentPassword, "Test@123");
    await user.type(newPassword, "Test@12345");
    await user.type(confirmPassword, "Test@12");
  });

  user.click(submitButton);

  await waitFor(() => {
    expect(
      screen.getByText("changePassword.messages.validation.mustMatch"),
    ).toBeDefined();
  });

  act(() => {
    user.click(submitButton);
  });

  expect(handleSubmit).toHaveBeenCalledTimes(0);
});

test("form is successfully submitted", async () => {
  const handleSubmit = vi.fn();
  const { user } = setup(<ChangePasswordForm handleSubmit={handleSubmit} />);

  const currentPassword = screen.getByLabelText(
    "changePassword.form.currentPassword.label",
  );
  const newPassword = screen.getByLabelText(
    "changePassword.form.newPassword.label",
  );
  const confirmPassword = screen.getByLabelText(
    "changePassword.form.confirmPassword.label",
  );
  const submitButton = screen.getByText("changePassword.form.actions.submit");

  await act(async () => {
    await user.type(currentPassword, "Test@123");
    await user.type(newPassword, "Test@12345");
    await user.type(confirmPassword, "Test@12345");

    await user.click(submitButton);
  });

  await waitFor(() => {
    expect(screen.queryAllByRole("alert").length).toBe(0);
  });

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });
});
