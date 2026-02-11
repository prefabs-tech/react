import { render } from "@testing-library/react";
import { expect, test } from "vitest";

import ErrorBoundary from "../index";

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
  useRouteError: () => ({ statusText: 404, message: "Not Found" }),
}));

test("Component matches snapshot", async () => {
  const { container } = render(<ErrorBoundary />);

  expect(container).toMatchSnapshot();
});
