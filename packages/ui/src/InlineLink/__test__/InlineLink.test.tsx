import { render, screen } from "@testing-library/react";
import { describe } from "node:test";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { expect, test } from "vitest";

import InlineLink from "..";

describe("Inline link component", () => {
  test("should render the label correctly", () => {
    render(
      <MemoryRouter>
        <InlineLink label="Dashboard" to="/dashboard" />
      </MemoryRouter>,
    );

    const linkElement = screen.getByText("Dashboard");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", "/dashboard");
  });

  test("should render a Link when 'external' is false", () => {
    render(
      <MemoryRouter>
        <InlineLink label="Dashboard" to="/dashboard" />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("internal-link")).toBeInTheDocument();
  });

  test("should render anchor (<a>) when 'external' is true", () => {
    render(<InlineLink external={true} label="Dashboard" to="/dashboard" />);

    expect(screen.getByTestId("external-link")).toBeInTheDocument();
  });

  test("should apply custom class", () => {
    render(
      <MemoryRouter>
        <InlineLink
          className="custom-class"
          label="Dashboard"
          to="/dashboard"
        />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("internal-link")).toHaveClass("custom-class");
  });

  test("should apply 'target' prop correctly for external links", () => {
    render(
      <InlineLink
        external
        label="Dashboard"
        target="_blank"
        to="https://www.prefabs-tech.com/"
      />,
    );

    expect(screen.getByTestId("external-link")).toHaveAttribute(
      "target",
      "_blank",
    );
  });

  test("should apply 'underlined' class if underlined prop is true", () => {
    render(
      <MemoryRouter>
        <InlineLink label="Dashboard" to="/dashboard" underlined />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("internal-link")).toHaveClass("underlined");
  });

  test("should not apply 'underlined' class if underlined prop is false", () => {
    render(
      <MemoryRouter>
        <InlineLink label="Dashboard" to="/dashboard" />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("internal-link")).not.toHaveClass("underlined");
  });
});
