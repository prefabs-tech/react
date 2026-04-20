import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, expect, test } from "vitest";

import Message from "..";

describe("Message", () => {
  test("should render the message text correctly", () => {
    render(<Message message="Message" />);

    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  test("should render <i> element when icon is passed as string", () => {
    render(<Message message="Message" icon="icon" />);

    expect(screen.getByTestId("icon").querySelector("i")).toBeInTheDocument();
  });

  test("should render icon passed as ReactNode correctly", () => {
    render(<Message message="Message" icon={<span>!</span>} />);

    expect(screen.getByText("!")).toBeInTheDocument();
  });

  test("should render both icon and message correctly", () => {
    render(<Message message="Message" icon={<span>!</span>} />);

    expect(screen.getByText("Message")).toBeInTheDocument();
    expect(screen.getByText("!")).toBeInTheDocument();
  });
});
