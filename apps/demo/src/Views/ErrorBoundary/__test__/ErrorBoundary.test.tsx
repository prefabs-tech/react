import { render, screen, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

import ErrorBoundary from "../index";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useRouteError: () => ({ statusText: 404, message: "Not Found" }),
}));

test("show error when loader throws error", async () => {
  render(<ErrorBoundary />);

  await waitFor(() => {
    expect(screen.getByText("errorBoundary.title")).toBeDefined();
  });

  await waitFor(() => {
    expect(screen.getByText("errorBoundary.subtitle")).toBeDefined();
  });

  await waitFor(() => {
    expect(screen.getByText("404")).toBeDefined();
  });
});
