import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { expect, test, vi } from "vitest";

import { LoginForm } from "../Login";

test("validation error messages are displayed", async () => {
  const handleSubmit = vi.fn();
  render(<LoginForm handleSubmit={handleSubmit} />);

  expect(screen.getByLabelText("login.form.email.label")).toBeDefined();
  expect(screen.getByLabelText("login.form.password.label")).toBeDefined();
  expect(screen.getByText("login.form.actions.submit")).toBeDefined();

  fireEvent.click(screen.getByText("login.form.actions.submit"));

  await waitFor(() => {
    expect(handleSubmit).toHaveBeenCalledTimes(0);

    expect(screen.getByText("validation.messages.email")).toBeDefined();
    expect(
      screen.getByText("login.messages.validation.password"),
    ).toBeDefined();
  });
});

test("form is successfully submitted", async () => {
  const handleSubmit = vi.fn();

  render(<LoginForm handleSubmit={handleSubmit} />);

  expect(screen.getByLabelText("login.form.email.label")).toBeDefined();
  expect(screen.getByLabelText("login.form.password.label")).toBeDefined();
  expect(screen.getByText("login.form.actions.submit")).toBeDefined();

  fireEvent.change(screen.getByLabelText("login.form.email.label"), {
    target: { value: "test@test.com" },
  });

  fireEvent.change(screen.getByLabelText("login.form.password.label"), {
    target: { value: "Test@12345" },
  });

  fireEvent.click(screen.getByText("login.form.actions.submit"));

  await waitFor(async () => {
    await expect(handleSubmit).toBeCalledTimes(1);
  });

  // await expect(handleSubmit).toHaveBeenCalledWith(value);
});
